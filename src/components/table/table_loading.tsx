import { LinearProgress, TableCell, TableRow } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
const TableLoading = ({loading}: { loading?: boolean }) => { 
  
  return (
    <TableRow >
      <TableCell style={{margin:0,padding:0}} colSpan={12}>
        <motion.div
          style={{ width: "100%",overflow:"hidden" }}
          initial={{ height: 0 }}
          animate={{ height: !!loading ? "fit-content" : 0 ,}}
        >
          <LinearProgress color="primary" />
        </motion.div>
      </TableCell>
    </TableRow>
  );
};

export default TableLoading;
