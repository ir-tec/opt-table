import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";
import React from "react";
import { CustomPaginationProps } from "./types";
import { motion } from "framer-motion";
const CustomPagination = ({
  data,
  search_data,
}: {
  data: {
    count: number;
    onChangeRowsPerPage: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
  };
  search_data: CustomPaginationProps;
}) => {
  let start = search_data.perPage * search_data.page;
  const checkLast = () => {
    return data.count - start < search_data.perPage;
  };

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        backgroundColor: "white",
        alignSelf: "flex-end",
        fontFamily: "inherit",
        direction: "rtl",
        // position: "absolute",
        width: "100%",
        height: "hit-content",
        maxHeight: 72, 
        padding:"0px 8px"
      }}
    >
      <div style={{ fontFamily: "inherit" }}>
        <h5 style={{ fontFamily: "inherit" }}>
          نمایش {search_data.page * search_data.perPage} الی{" "}
          {!checkLast()
            ? search_data.perPage + search_data.page * search_data.perPage
            : data.count}
          {"  "}
          از {data.count} رکورد
        </h5>
      </div>

      <div
        style={{
          maxWidth: "fit-content",
          fontFamily: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h5 style={{ fontFamily: "inherit" }}>نمایش</h5>
        <TextField
          select
          value={search_data.perPage}
          variant="outlined"
          size="small"
          SelectProps={{ IconComponent: ExpandMore }}
          onChange={(e) => {
            // Store.dispatch(searchPerPageChange(e.target.value));
            data.onChangeRowsPerPage(e);
          }}
          style={{ margin: "0 10px" }}
        >
          {search_data.rowsPerPageOptions.map((item: number, i: number) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <Typography style={{ fontFamily: "inherit" }} variant="subtitle2">
          ردیف
        </Typography>
      </div>
      <Grid
        item
        container
        justifyContent="flex-end"
        style={{ maxWidth: "fit-content" }}
      >
        <Pagination
          style={{ direction: "ltr", fontFamily: "inherit" }}
          size="large"
          siblingCount={0}
          count={Math.ceil(data.count / search_data.perPage)}
          showFirstButton
          showLastButton
          variant="outlined"
          page={search_data.page + 1}
          color="primary"
          onChange={(e, page) => {
            data.onChangePage(e, page - 1);
            // Store.dispatch(searchPage(page - 1));
          }}
        />
      </Grid>
    </motion.div>
  );
};

export default CustomPagination;
