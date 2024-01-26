import { Check, Close } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,

} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useId } from "react";
interface props {
  Comp: React.ReactNode;
  is_open: boolean;
  onCancel: () => void;
  onAccept: () => void;
  loading: boolean;
  is_disabled: boolean;
}
const CollapseAddRow = ({
  Comp,
  is_open,
  onAccept,
  onCancel,
  loading,
  is_disabled,
}: props) => {
  const id = useId();
  const add_button_id = useId();
  const loading_button_id = useId();

  return (
    <TableCell
      key={id}
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          {is_open && (
            <motion.div
              key={`${is_open}`}
              initial={{ height: 0, opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                height: "fit-content",
                position: "relative",
              }}
              exit={{ opacity: 0, height: 0, y: 24 }}
            >
              <TableContainer style={{ padding: 0 }}>
                <Table size="small" style={{ padding: 0 }} stickyHeader>
                  <TableBody style={{ padding: 0, }}>{Comp}</TableBody>
                </Table>
              </TableContainer>
              <motion.div
                style={{
                  width: "fit-content",
                  display: "flex",
                  alignItems: "center",

                  padding: "0px 0px",
                }}
              >
                <IconButton
                  onClick={onAccept}
                  disabled={is_disabled}
                  style={{ position: "relative", width: 50, height: 50 }}
                >
                  <AnimatePresence mode="sync">
                    {!loading ? (
                      <motion.div
                        key={add_button_id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        style={{ position: "absolute" }}
                      >
                        <Check
                          color="success"
                          style={{ fontSize: 24, position: "relative", top: 2 }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={loading_button_id}
                        style={{ position: "absolute" }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <CircularProgress
                          style={{ width: 24, height: 24 }}
                          color="info"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </IconButton>
                <IconButton onClick={onCancel}>
                  <Close color="error" style={{ fontSize: 24 }} />
                </IconButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </TableCell>
  );
};

export default CollapseAddRow;
