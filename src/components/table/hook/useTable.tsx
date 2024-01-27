import React, { Ref, useImperativeHandle } from "react";
import {
  CustomPaginationProps,
  OptTableInterface,
  OptTableRefProps,
} from "../types";
import { getComparator, stableSort } from "../table_utils";
type useTAbleProps<T> = {
  props: OptTableInterface<T>;
  ref: Ref<OptTableRefProps>;
};
function useTable<T>({ props, ref }: useTAbleProps<T>) {
  const [order, setOrder] = React.useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T | undefined>(
    props.default_sort
  );

  const [is_edited, set_is_edited] = React.useState<number | string | null>(
    null
  );
  const set_row_to_edit = (id: string | number) => {
    if (is_edited === id) return set_is_edited(null);
    set_is_edited(id);
    /* @ts-ignore */
    ref?.current?.addNewRow(false);
  };
  const [current_row, set_current_row] = React.useState<{
    index: number | string;
    table_key: string;
  } | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      /* @ts-ignore */
      ...ref?.current,
      changeDetailPanelState: ({
        index,
        table_key,
      }: {
        index: number;
        table_key: string;
      }) => {
        if (index === current_row?.index && table_key === current_row.table_key)
          return set_current_row({ index: -1, table_key: "" });

        return set_current_row({ index, table_key });
      },
      setRowToEditMode: (value: string | number) => {
        set_is_edited(value);
      },
      editRowDataManager: (data: T) => {
        if (props.options?.editDataHandler)
          return new Promise(async (res, rej) => {
            if (!!!props.options?.editDataHandler)
              return rej(`add EditDataHandler method to props.options`);

            let { editDataHandler } = props.options;

            editDataHandler(data)
              .then((result) => {
                
                res(result); 
                
              })
              .catch((err) => {
                res(false);
              })
              .finally(() => {});
          });
        return new Promise((res, rej) => {
          rej(`Provide the editDataHandler method on options property`);
        });
      },
      newRowDataManager: (data: T) => {
        if (props.options?.newDataHandler)
          return new Promise(async (res, rej) => {
            if (!!!props.options?.newDataHandler)
              return rej(`add newDataHandler method to props.options`);

            let { newDataHandler } = props?.options;

            newDataHandler(data)
              .then((result) => {
                // addNewRow((pre) => ({} as T));
                res(result);
              })
              .catch((err) => {
                res(err);
              })
              .finally(() => {
                // set_add_loading(false);
              });
          });
        return new Promise((res, rej) => {
          rej(`Provide the newDataHandler method on options property`);
        });
      },
    }),
    []
  );
  const [pagination_props, set_pagination_props] =
    React.useState<CustomPaginationProps>({
      page: 0,
      totalDocs: 0,
      totalIncome: 0,
      perPage: 10,
      rowsPerPageOptions: [10, 25, 30],
    });
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    set_current_row(null);
    set_is_edited(-1);
    // startTransition(() => {
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    // });
  };
  const visibleRows: T[] = React.useMemo(() => {
    if (Array.isArray(props.data))
      return stableSort<T>(
        props.data,
        getComparator<T>(order, orderBy || ("" as keyof T))
      );
    return [];
  }, [
    order,
    orderBy,
    props.data,
    pagination_props.perPage,
    pagination_props.page,
  ]);

  let paginatedRow = paginate(
    visibleRows,
    pagination_props.page,
    pagination_props.perPage
  )?.filter((item, i) => i <= pagination_props.perPage);
  function paginate<T>(data: T[], currentPage: number, pageSize: number): T[] {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.slice(startIndex, endIndex);
  }

  return {
    order,
    current_row,
    handleRequestSort,
    visibleRows: props.has_pagination ? paginatedRow : visibleRows,
    orderBy,
    set_current_row,
    pagination_props,
    set_pagination_props,
    total_data: props.data?.length,
    is_edited,
    set_row_to_edit,
  };
}

export default useTable;
