import React from "react";
import { OptTable, OptTableInterface, OptTableRefProps } from "../components";
import TestDetailsPanel from "../components/table/test_details_panel";
import TestDetailsPanels from "../components/table/test_2_details_panel";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

export const Table = <T,>({ data = args.data }: OptTableInterface<T>) => {
  const ref = React.useRef<OptTableRefProps<T> | null>(null);
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
        options={{
          newDataHandler: (result) =>
            new Promise((res, rej) => {
              setTimeout(() => {
                res({ id: 51, ...result });
              }, 2000);
            }),
        }}
      />
    </div>
  );
};
let args: OptTableInterface<any> = {
  default_sort: "name",
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
    { test: 2, name: "Amin", id: 1 },
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
