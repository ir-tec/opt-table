import React from "react";
import { useAddRowProps } from "../types";

const useEditRow = <T,>(props: useAddRowProps<T>) => {
  const [edit_loading, set_edit_loading] = React.useState<boolean>(false);
  const [open_modal, set_open_modal] = React.useState(false);
// console.log("asd");

  const [editedRow, setEditRow] = React.useState<T>({} as T);
  const editRowHandler = (data: { key: keyof T; value: any }) => {
    setEditRow((pre) => ({ ...pre, [data.key]: data.value }));
  };
  const [show_error, set_show_error] = React.useState<{
    message: string;
    input_index: null | number;
  }>({
    message: "",
    input_index: null,
  });

  // useImperativeHandle(
  //   props.ref,
  //   () => ({
  //     /* @ts-ignore */
  //     ...props.ref?.current,

  //   }),
  //   [editedRow]
  // );

  const openShowError = (index: number | null, message: string) => {
    set_show_error({ input_index: index, message });
  };
  const closeShowError = (index: number, message: string) => {
    set_show_error({ input_index: null, message: "" });
  };

  return {
    openShowError,
    closeShowError,
    show_error,
    edit_loading,
    set_edit_loading,
    editedRow,
    editRowHandler,
    setEditRow,
    open_modal,
    set_open_modal,
  };
};

export default useEditRow;
