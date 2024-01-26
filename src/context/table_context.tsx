import React, { createContext } from "react";
import { OptTableRefProps } from "../components";

export const sharedMethodContext = createContext<OptTableRefProps>({
  addNewRow() {},
  changeDetailPanelState({ index, table_key }) {},
});

export const SharedMethodProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const methods: OptTableRefProps = {
    addNewRow() {},
    changeDetailPanelState({ index, table_key }) {},
  };

  return (
    <sharedMethodContext.Provider value={methods}>
      {children}
    </sharedMethodContext.Provider>
  );
};
