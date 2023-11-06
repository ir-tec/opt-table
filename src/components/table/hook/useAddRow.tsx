import React, { useImperativeHandle } from "react";
import { useAddRowProps } from "../types";

function useAddRow<T>(props: useAddRowProps<T>) {
  const [added_rows, set_added_row] = React.useState<T[]>([]);
  const [add_loading, set_add_loading] = React.useState<boolean>(false);
  const [is_create_new_row, set_is_create_new_row] =
    React.useState<boolean>(false);
  const [newRow, addNewRow] = React.useState<T>({} as T);
  const addNewRowJandler = (data: { key: keyof T; value: any }) => {
    addNewRow((pre) => ({ ...pre, [data.key]: data.value }));
  };

  const clear_row_handler = () => {
    set_is_create_new_row(false);
    addNewRow({} as T);
  };

  useImperativeHandle(
    props.ref,
    () => ({
      addNewRow: () => {
        set_is_create_new_row((pre) => !pre);
      },
      newRowDataManager: () => {
        set_add_loading(true);
        if (props.options?.newDataHandler)
          return new Promise((res, rej) => {
            if (!!!props.options?.newDataHandler)
              return rej(`add newDataHandler method to props.options`);

            props?.options
              ?.newDataHandler(newRow as T)
              .then((result) => {
                set_added_row((pre) => [result, ...pre]);
                addNewRow({} as T);
                res(result);
              })
              .then(() => {
                set_is_create_new_row(false);
              })
              .then(() => {
                set_is_create_new_row(true);
              })
              .catch((err) => {
                rej(`${err}`);
              })
              .finally(() => {
                set_add_loading(false);
              });
          });
        return new Promise((res, rej) => {
          rej(`Provide the newDataHandler method on options property`);
        });
      },
    }),
    [newRow]
  );

  return {
    addNewRowJandler,
    is_create_new_row,
    set_is_create_new_row,
    added_rows,
    clear_row_handler,
    newRow,
    add_loading,
  };
}

export default useAddRow;
