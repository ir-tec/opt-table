import React from "react";
import { OptTable, OptTableInterface, OptTableRefProps } from "../components";
import TestDetailsPanel from "../components/table/test_details_panel";
import TestDetailsPanels from "../components/table/test_2_details_panel";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

export const Table = <T,>({ data = args.data }: OptTableInterface<T>) => {
  const ref = React.useRef<OptTableRefProps>(null);

  const [loading, set_lodaing] = React.useState(false);

  const loadder = (val: boolean) => {
    set_lodaing(val);
  };
  return (
    <div style={{ width: "100%", height: 500 }}>
      <IconButton
        onClick={() => {
          ref.current?.addNewRow();
        }}
      >
        <Add />
      </IconButton>
      <OptTable
        data={data}
        DetailsPanel={args.DetailsPanel}
        table_head_list={args.table_head_list}
        default_sort={"test" as never}
        ref={ref}
        loading={loading}
        options={{
          newDataHandler: (result) => fake({ set_loading: loadder }),
        }}
      />
    </div>
  );
};
let args: OptTableInterface<any> = {
  default_sort: "test",
  DetailsPanel: [
    { table_key: "test", Component: TestDetailsPanel },
    { table_key: "name", Component: TestDetailsPanels },
    // ,{table_key:"action_cell",Component:TestDetailsPanels}
  ],
  table_head_list: [
    {
      title: "id",
      table_key: "id",
      align: "left",
      editable: false,
    },
    {
      title: "test",
      table_key: "test",
      has_details_penel: true,
      align: "left",
      editable: true,
    },
    {
      title: "Name",
      table_key: "name",
      has_details_penel: true,
      align: "center",
    },
  ],
  data: [
    { test: 2, name: new Date().getUTCMilliseconds(), id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 3, name: "Amin", id: 1 },
    { test: 5, name: "Amin", id: 1 },
    { test: 2, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
    { test: 1, name: "Amin", id: 1 },
  ],
};
const fake = async ({
  set_loading,
}: {
  set_loading: (val: boolean) => void;
}) => {
  try {
    set_loading(true);
    const t = await fetch("http://localhost:4000/category/get_category_list");
    // await new Promise<void>((res, rej) => {
    //   setTimeout(() => {
    //     res();
    //   }, 2000);
    // });
    
    if (t.status === 200) return true;
    return true;
    // throw new Error("asasd")
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    set_loading(false);
  }
};
