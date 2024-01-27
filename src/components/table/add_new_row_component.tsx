import React, { Ref } from "react";
import CollapseAddRow from "./collapse_add_row";
import { TableCell, TableRow, TextField } from "@mui/material";
import { OptTableRefProps, TableHeaderInterface, options } from "./types";
import useAddRow from "./hook/useAddRow";
import { BootstrapTooltip } from "./error_tooltip";
interface props<T> {
  list_for_edit: TableHeaderInterface<T>[];
  options?: options<T>;
}
const LocalAddNewRowComponent = <T,>(
  { list_for_edit, options }: props<T>,
  ref: Ref<OptTableRefProps>
) => {
  const {
    addNewRowHandler,
    is_create_new_row,
    clear_row_handler,
    newRow,
    add_loading,
    openShowError,
    show_error,
    set_add_loading,
  } = useAddRow({
    ref: ref,
    options: options,
  });

  return (
    <TableRow>
      <CollapseAddRow
        is_disabled={add_loading}
        loading={add_loading}
        onCancel={() => {
          clear_row_handler();
        }}
        onAccept={() => {
          set_add_loading(true);
          /* @ts-ignore */
          ref?.current
            ?.newRowDataManager(newRow)
            ?.then((res: any) => {
              if (res === true) {

                clear_row_handler();
              }
            })
            .catch((err: any) => {})
            .finally(() => {
              set_add_loading(false);
            });
        }}
        is_open={is_create_new_row}
        Comp={
          <TableRow style={{}}>
            {list_for_edit
              .filter((item) => item.editable)
              .map((table_row, index) => {
                let first_to_focus = list_for_edit.findIndex(
                  (item) => item.editable === true
                );

                return (
                  <TableCell
                    key={index}
                    align={table_row.align}
                    width={table_row.width}
                    style={{
                      padding: "8px 8px 8px",
                      minWidth: table_row.width,
                      // flex:1,
                      fontFamily: "inherit",
                      position: "relative",
                      ...table_row.row_style,
                    }}
                  >
                    <BootstrapTooltip
                      style={{ fontFamily: "inherit" }}
                      title={show_error.message}
                      open={show_error.input_index === index}
                    >
                      <TextField
                        fullWidth
                        // type={table_row.input_type}
                        disabled={add_loading || table_row.editable === false}
                        key={`${add_loading}`}
                        value={
                          table_row.input_type === "price" &&
                          /* @ts-ignore */
                          !!newRow?.[table_row.table_key]
                            ? Number(
                                /* @ts-ignore */
                                parseInt(newRow?.[table_row.table_key])
                              ).toLocaleString()
                            : /* @ts-ignore */
                              newRow?.[table_row.table_key] || ""
                        }
                        variant="standard"
                        onChange={(e) => {
                          let value;
                          switch (table_row.input_type) {
                            case "price":
                              value =
                                parseInt(e.target.value.split(",").join("")) ||
                                "";
                              break;
                            case "number":
                              value = parseInt(e.target.value);
                            default:
                              value = e.target.value;
                              break;
                          }

                          addNewRowHandler({
                            key: table_row.table_key as keyof T,
                            value,
                          });
                        }}
                        size="small"
                        InputProps={{ style: { fontFamily: "inherit" } }}
                        label={table_row.title}
                        autoFocus={index === first_to_focus}
                        onKeyPress={(e) => {
                          check_input_type(
                            e,
                            openShowError,
                            index,
                            /* @ts-ignore */
                            table_row.input_type
                          );
                          e.stopPropagation();
                        }}
                        {...table_row.input_props}
                      />
                    </BootstrapTooltip>
                  </TableCell>
                );
              })}
          </TableRow>
        }
      />
    </TableRow>
  );
};

// export default AddNewRowComponent;
export const AddNewRowComponent = React.forwardRef(LocalAddNewRowComponent);

export const check_input_type = (
  event: React.KeyboardEvent<HTMLDivElement>,
  openShowError: (index: number | null, message: string) => void,
  index: number,
  input_type?: "number" | "text" | "price"
) => {
  const numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
  if (input_type === undefined) return true;
  if (input_type === "number" || input_type === "price") {
    let check_is_number = numbers.indexOf(event.which);

    if (check_is_number > -1) {
      openShowError(null, "مقادیر عددی مجاز است");
      return true;
    }

    openShowError(index, "مقادیر عددی مجاز است");
    return event.preventDefault();
  }
  return true;
};
