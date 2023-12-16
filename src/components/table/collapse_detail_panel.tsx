import { Box, TableCell } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
interface props<T> {
  Comp: any;
  is_open: boolean;

  motion_key: any;
}

function CollapseRowWrapper<T>({ Comp, is_open, motion_key }: props<T>) {
  return (
    <TableCell
      colSpan={12}
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        width: "100%",
        padding: 0,
      }}
    >
      <Box
        style={{
          width: "100%",
          padding: 0,
          margin: 0,
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          {!!Comp && is_open && (
            <motion.div
              key={motion_key}
              initial={{ height: 0, opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                height: "fit-content", 
                // padding:"16px 8px"
              }} 
              exit={{ opacity: 0, height: 0, y: 24,padding:0 }}
            >
              {Comp}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </TableCell>
  );
}

export default CollapseRowWrapper;
