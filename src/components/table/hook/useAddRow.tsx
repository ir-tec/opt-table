import React, { useImperativeHandle } from "react";
import { useAddRowProps } from "../types";

function useAddRow<T>(props: useAddRowProps<T>) {
  // const [added_rows, set_added_row] = React.useState<T[]>([]);
  const [add_loading, set_add_loading] = React.useState<boolean>(false);

  const [show_error, set_show_error] = React.useState<{
    message: string;
    input_index: null | number;
  }>({
    message: "",
    input_index: null,
  });

  const openShowError = (index: number | null, message: string) => {
    set_show_error({ input_index: index, message });
  };
  const closeShowError = (index: number, message: string) => {
    set_show_error({ input_index: null, message: "" });
  };

  const [is_create_new_row, set_is_create_new_row] =
    React.useState<boolean>(false);
  const [newRow, addNewRow] = React.useState<T>({} as T);
  const addNewRowHandler = (data: { key: keyof T; value: any }) => {
    addNewRow((pre) => ({ ...pre, [data.key]: data.value }));
  };

  const clear_row_handler = () => {
    set_is_create_new_row(false);
    addNewRow({} as T);
  };
  // const refContext = useContext(sharedMethodContext);

  useImperativeHandle(
    props.ref,
    () => ({
      // ...refContext,
      addNewRow: (value) => { 
        
        if (value === undefined) { 
          
          /* @ts-ignore */
          props?.ref?.current?.setRowToEditMode(-1);
        }
        set_is_create_new_row((pre) => (value !== undefined ? value : !pre));
      },
    }),
    []
  );

  return {
    addNewRowHandler,
    is_create_new_row,
    set_is_create_new_row,
    // added_rows,
    clear_row_handler,
    newRow,
    add_loading,
    openShowError,
    closeShowError,
    show_error,
    set_add_loading,
  };
}

export default useAddRow;
