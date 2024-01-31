
import React, { Ref } from "react";
import { OptTableInterface, OptTableRefProps } from "./types";

import {
  TableContextProvider,
} from "../../context/table_context";
import CustomTable from "./table_index";

function LocalTable<T>(
  props: OptTableInterface<T>,
  ref: Ref<OptTableRefProps>
) {
  const localRef = ref || React.useRef<OptTableRefProps | null>(null);


  return (
    <TableContextProvider ref={ref} table_props={props}>
      <CustomTable
        data={props.data}
        table_head_list={props.table_head_list}
        DetailsPanel={props.DetailsPanel}
        loading={props.loading}
        default_sort={props.default_sort}
        container_style={props.container_style}
        has_pagination={props.has_pagination}
        options={props.options}
        ref={localRef}
        table_zIndex={props.table_zIndex}
      />
    </TableContextProvider>
  );
}

export const OptTable = React.forwardRef(LocalTable);
