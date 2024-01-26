import { TextFieldProps } from "@mui/material";
import React, { Ref } from "react";
export interface TableHeaderInterface<T> {
  width?: string | number;
  input_type?: "number" | "text" | "price";

  is_server_side?: boolean;
  has_details_penel?: boolean;
  input_props?: TextFieldProps;
  header_style?: React.CSSProperties;
  row_style?: React.CSSProperties;
  Render?: React.FunctionComponent<{ renderData: T }>;
  title: string | undefined;
  table_key: string;
  align?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  sortable?: boolean;
  editable?: boolean;
}

// export interface RowDataType {
//   id: string | number;
// }
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

  default_sort?: keyof T;
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
  edit_row?: boolean;
  delete_modal_title?: React.ReactNode;
  modal_yes_title?: string;
  modal_no_title?: string;
  editDataHandler?: (data: T) => Promise<boolean>;
  newDataHandler?: (data: T) => Promise<boolean>;
  deleteDataHandler?: (data: T) => Promise<boolean>;
}
// export interface RowDataType  {
//   id:number|string

// };

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
  addNewRow?: (value?: boolean) => void;
  setRowToEditMode?: (value?: string | number) => void;
  newRowDataManager?: () => Promise<boolean>;
  editRowDataManager?: () => Promise<boolean>;
  changeDetailPanelState?: ({
    index,
    table_key,
  }: {
    index: number;
    table_key: string;
  }) => void;
}
