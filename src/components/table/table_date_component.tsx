import { Grid, Typography } from "@mui/material";
import { utils } from "../../utils/date_utils";
import React from "react";

interface DateComponentInterface {
  date: string;
}

const TableDateComponent = (props: DateComponentInterface) => {
  return (
    <>
      {props.date && (
        <Grid container direction="column" alignItems="center">
          <Typography variant="body2">
            {utils.get_string_day(new Date(props.date))} -{" "}
            {utils.today(new Date(props.date))}
          </Typography>
          <Typography variant="body2">
            {utils.get_time(new Date(props.date))}
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default TableDateComponent;
