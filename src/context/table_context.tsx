import React, { Ref, createContext } from "react";
import { OptTableInterface, OptTableRefProps } from "../components";

type ContextProps = {
  is_edited: null | number | string;
  set_is_edited?: React.Dispatch<React.SetStateAction<string | number | null>>;

  set_row_to_edit?: (id: string | number) => void;
  set_current_row?: React.Dispatch<
    React.SetStateAction<{
      index: number | string;
      table_key: string;
    } | null>
  >;
  current_row?: {
    index: number | string;
    table_key: string;
  } | null;
};

export const tableContext = createContext<ContextProps>({ is_edited: null });
type Props<T> = {
  children: React.ReactNode;
  table_props?: OptTableInterface<T>;
};
const ContextProvider = <T,>(
  context_props: Props<T>,
  ref: Ref<OptTableRefProps>
) => {
  const [is_edited, set_is_edited] = React.useState<number | string | null>(
    null
  );
  const [current_row, set_current_row] = React.useState<{
    index: number | string;
    table_key: string;
  } | null>(null);

  const set_row_to_edit = (id: string | number) => {
    if (is_edited === id) return set_is_edited(null);
    set_is_edited(id);
    /* @ts-ignore */
    ref?.current?.addNewRow(false);
  };
  return (
    <tableContext.Provider
      value={{
        is_edited,
        set_is_edited,
        set_row_to_edit,
        set_current_row,
        current_row,
      }}
    >
      {context_props.children}
    </tableContext.Provider>
  );
};
export const TableContextProvider = React.forwardRef(ContextProvider);
