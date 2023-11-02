import React from "react";
import { CustomPaginationProps, OptTableInterface } from "../types";
import { getComparator, stableSort } from "../table_utils";

function useTable<T>(props: OptTableInterface<T>) {
  const [order, setOrder] = React.useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>(props.default_sort);
  const [current_row, set_current_row] = React.useState<{
    index: number;
    table_key: string;
  } | null>(null);

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
    // startTransition(() => {
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    // });
  };
  const visibleRows: T[] = React.useMemo(() => {
    return stableSort<T>(props.data, getComparator<T>(order, orderBy));
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
  ).filter((item, i) => i <= pagination_props.perPage);
  function paginate<T>(data: T[], currentPage: number, pageSize: number): T[] {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
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
    total_data: props.data.length,
  };
}

export default useTable;
