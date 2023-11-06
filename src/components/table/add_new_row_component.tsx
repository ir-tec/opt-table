import React from "react";
import CollapseAddRow from "./collapse_add_row";
import { TableCell, TableRow, TextField } from "@mui/material";
import { TableHeaderInterface } from "./types";
interface props<T> {
  add_loading: boolean;
  clear_row_handler: () => void;
  is_create_new_row: boolean;
  addNewRowJandler: (data: { key: keyof T; value: any }) => void;
  list_for_edit: TableHeaderInterface<T>[];
  newRow: T;
  onAccept: () => void;
}
const AddNewRowComponent = <T,>({
  add_loading,
  clear_row_handler,
  is_create_new_row,
  addNewRowJandler,
  list_for_edit,
  onAccept,
  newRow,
}: props<T>) => {
  return (
    <TableRow>
      <CollapseAddRow
        is_disabled={add_loading}
        loading={add_loading}
        onCancel={() => {
          clear_row_handler();
        }}
        onAccept={onAccept}
        is_open={is_create_new_row}
        Comp={
          <>
            {list_for_edit.map((table_row, index) => {
              let first_to_focus = list_for_edit.findIndex(
                (item) => item.editable === undefined
              );

              return (
                <TableCell
                  key={index}
                  align={table_row.align}
                  width={table_row.width}
                  style={{
                    padding: "8px 8px 8px",
                    minWidth: table_row.width,
                    ...table_row.row_style,
                  }}
                >
                  <TextField
                    fullWidth
                    disabled={add_loading || table_row.editable === false}
                    key={`${add_loading}`}
                    /* @ts-ignore */
                    value={newRow?.[table_row.table_key] || ""}
                    variant="outlined"
                    onChange={(e) => {
                      addNewRowJandler({
                        key: table_row.table_key as keyof T,
                        value: e.target.value,
                      });
                    }}
                    size="small"
                    label={table_row.title}
                    autoFocus={index === first_to_focus - 1}
                  />
                </TableCell>
              );
            })}
          </>
        }
      />
    </TableRow>
  );
};

export default AddNewRowComponent;
