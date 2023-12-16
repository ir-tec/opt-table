import { Ref } from "react";
export interface TableHeaderInterface<T> {
  width?: string | number;
  is_server_side?: boolean;
  has_details_penel?: boolean;
  header_style?: React.CSSProperties;
  row_style?: React.CSSProperties;
  Render?: React.FunctionComponent<{ renderData: T }>;
  title: string | undefined;
  table_key: string;
  align?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  sortable?: boolean;
  editable?: boolean;
}

export interface OptTableInterface<T> {
  /**
   * An array used as table header
   */
  table_head_list: TableHeaderInterface<T>[];
  options?: options<T>;
  loading?: boolean;
  has_pagination?: boolean;
  container_style?: React.CSSProperties;
  table_zIndex?: number;
  data: T[];
  default_sort: keyof T;
  DetailsPanel?: DetailPanelProps<T>[];
}
export interface DetailPanelProps<T> {
  table_key: string;
  Component: React.FunctionComponent<{
    is_open: boolean;
    rowData: T | undefined;
  }>;
}
export interface options<T> {
  action_cell_title?: string;
  direction?: "rtl" | "ltr";
  newDataHandler?: (data: T) => Promise<boolean>;
}
export type RowDataType<T> = T | {};

export interface CustomPaginationProps {
  totalIncome: number;
  page: number;
  totalDocs: number;
  perPage: number;
  rowsPerPageOptions: number[];
}

export interface useAddRowProps<T> {
  options?: options<T>;
  ref: Ref<OptTableRefProps>;
}

export interface OptTableRefProps {
  addNewRow: () => void;
  newRowDataManager?: () => Promise<boolean>;
}
