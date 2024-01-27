import React from "react";
import { OptTable, OptTableInterface, OptTableRefProps } from "../components";
import TestDetailsPanel from "../components/table/test_details_panel";
import TestDetailsPanels from "../components/table/test_2_details_panel";
import { IconButton } from "@mui/material";
import { Add, ChangeCircle } from "@mui/icons-material";

export const Table = <T,>({ data = args.data }: OptTableInterface<T>) => {
  const ref = React.useRef<OptTableRefProps>(null);
  let [rows, set_rows] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (Array.isArray(args.data)) {
      set_rows(fakedata);
    }
  }, []);
  const [loading, set_lodaing] = React.useState(false);

  const loadder = (val: boolean) => {
    set_lodaing(val);
  };
  return (
    <div style={{ width: "100%", height: 500 }}>
      <IconButton
        onClick={() => {
          ref?.current?.addNewRow?.();
        }}
      >
        <Add />
      </IconButton>
      <IconButton
        onClick={() => {
          ref?.current?.changeDetailPanelState?.({
            index: 1,
            table_key: "name",
          });
        }}
      >
        <ChangeCircle />
      </IconButton>
      <OptTable
        data={rows}
        DetailsPanel={args.DetailsPanel}
        table_head_list={args.table_head_list}
        default_sort={"test" as never}
        ref={ref}
        loading={loading}
        options={{
          action_cell_title: "", modal_no_title:"asdas",
          edit_row: true,
          delete_modal_title: <h3>آیا از حذف مطمعمن هستید ؟</h3>,
          deleteDataHandler: (data) => {
            return fake({ set_loading: loadder })
              .then((res) => {
                set_rows((pre) => pre.filter((item) => item.id !== data.id));
                return true;
              })
              .catch((e) => {
                throw new Error(`${e}`);
              });
          },
          newDataHandler: (result) => {

            return fake({ set_loading: loadder });
          },
          editDataHandler: (result) => {
            return fake({ set_loading: loadder });
          },
        }}
      />
    </div>
  );
};
let args: OptTableInterface<any> = {
  data: [],
  default_sort: "test",
  // options: {
  //   edit_row: true,
  //   editDataHandler: async (data) => {
  //     try {
  //       await fake({ set_loading: loadder });
  //     } catch (error) {}
  //   },
  // },
  DetailsPanel: [
    { table_key: "action_cell", Component: TestDetailsPanel },
    { table_key: "name", Component: TestDetailsPanels },
    // ,{table_key:"action_cell",Component:TestDetailsPanels}
  ],
  table_head_list: [
    // {
    //   title: "id",
    //   table_key: "id",
    //   align: "left",
    //   editable: false,
    // },
    {
      title: "test",
      table_key: "test",
      has_details_penel: true,
      input_type: "price",
      align: "left",
      editable: true,
    },
    {
      title: "Name",
      table_key: "name",
      has_details_penel: true,
      align: "center",
      editable: true,
    },
  ],
};
let fakedata = [
  { test: 1, name: new Date().getUTCMilliseconds(), id: 1 },
  { test: 1, name: "Amin", id: 2 },
  { test: 3, name: "Amin", id: 3 },
  { test: 5, name: "Amin", id: 4 },
  { test: 2, name: "Amin", id: 5 },
  { test: 1, name: "Amin", id: 6 },
  { test: 1, name: "Amin", id: 7 },
  { test: 1, name: "Amin", id: 8 },
  { test: 1, name: "Amin", id: 9 },
  { test: 1, name: "Amin", id: 10 },
  { test: 1, name: "Amin", id: 11 },
  { test: 1, name: "Amin", id: 12 },
  { test: 1, name: "Amin", id: 13 },
  { test: 1, name: "Amin", id: 14 },
  { test: 1, name: "Amin", id: 15 },
  { test: 1, name: "Amin", id: 16 },
  { test: 1, name: "Amin", id: 17 },
  { test: 1, name: "Amin", id: 18 },
  { test: 1, name: "Amin", id: 19 },
  { test: 1, name: "Amin", id: 20 },
  { test: 1, name: "Amin", id: 21 },
  { test: 1, name: "Amin", id: 22 },
  { test: 1, name: "Amin", id: 23 },
  { test: 1, name: "Amin", id: 24 },
  { test: 1, name: "Amin", id: "25" },
  { test: 1, name: "Amin", id: "26" },
  { test: 1, name: "Amin", id: 27 },
];
const fake = async ({
  set_loading,
}: {
  set_loading: (val: boolean) => void;
}) => {
  try {
    set_loading(true);
    // const t = await fetch("http://localhost:4000/category/get_category_list");
    await new Promise<void>((res, rej) => {
      setTimeout(() => {
        res();
      }, 2000);
    });

    // if (t.status !== 200) throw new Error(`Not done`);
    return true;
    // throw new Error("asasd")
  } catch (error) { 
    
    throw new Error(`${error}`);
  } finally {
    set_loading(false);
  }
};
