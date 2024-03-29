import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
  Typography,
} from "@mui/material";
import React, { Ref } from "react";
import useTable from "./hook/useTable";
import { OptTableInterface, OptTableRefProps } from "./types";
import TableLoading from "./table_loading";
import { AddNewRowComponent } from "./add_new_row_component";
import CustomPagination from "./table_pagination";
import OptTableRow from "./table_row";

const TableIndex = <T,>(
  props: OptTableInterface<T>,
  ref: Ref<OptTableRefProps>
) => {
  const {
    handleRequestSort,
    order,
    visibleRows,
    orderBy,
    total_data,

    pagination_props,
    set_pagination_props,
  } = useTable<T>({ props: { ...props, data: props.data }, ref: ref });
  const { DetailsPanel } = props;
  const addRowId = React.useId();

  return (
    <Grid
      style={{
        transition: "0.4s",
        height: "100%",
        fontFamily: "inherit",
        direction: props.options?.direction,
        ...props.container_style,
      }}
      container
    >
      {/* <HardEdgeCard> */}
      <Grid
        item
        container
        xs={12}
        style={{
          maxHeight: `calc(100% - ${props.has_pagination ? 72 : 0}px)`,
          transition: "0.4s",
          fontFamily: "inherit",
          // flex:1
        }}
      >
        <TableContainer style={{ maxHeight: "100%", fontFamily: "inherit" }}>
          <Table size="small" stickyHeader sx={{ fontFamily: "inherit" }}>
            <TableHead>
              <TableRow>
                {props?.table_head_list?.map((header, i) => {
                  return (
                    <TableCell
                      sx={{
                        padding: 0,
                        fontFamily: "inherit",
                        boxShadow: (t: Theme) =>
                          `0px 1px 0px ${
                            t.palette.mode === "light"
                              ? "#E8E8EF"
                              : t.palette.background.paper
                          }`,
                        zIndex: props.table_zIndex,
                      }}
                      style={{
                        minWidth: header.width,
                        ...header.header_style,
                      }}
                      align={header.align}
                      sortDirection={
                        orderBy === header.table_key ? order : "asc"
                      }
                      onClick={(e: any) => {
                        if (header.sortable === false) return;

                        handleRequestSort(e, header.table_key as keyof T);
                      }}
                      key={i}
                    >
                      <Button
                        fullWidth
                        sx={{
                          color: "black",
                          padding: 1,
                          position: "relative",
                          display: "flex",
                          flexDirection:
                            header.align === "right" ? "row-reverse" : "row",
                          justifyContent: header.align,
                          fontFamily: "inherit",
                        }}
                        onClick={() => {
                          // setOrderBy(i.toString());
                          // setOrder(order === "asc" ? "desc" : "asc");
                        }}
                      >
                        <Typography
                          style={{ fontFamily: "inherit" }}
                          variant="body1"
                        >
                          {header?.title}
                        </Typography>
                        {header.sortable === true ||
                          (header.sortable === undefined && (
                            <TableSortLabel
                              active={orderBy === header.table_key}
                              direction={
                                orderBy === header.table_key ? order : "desc"
                              }
                            ></TableSortLabel>
                          ))}
                      </Button>
                    </TableCell>
                  );
                })}
                {(DetailsPanel?.some(
                  (item) => item.table_key === "action_cell"
                ) ||
                  props.options?.edit_row) && (
                  <TableCell
                    sx={{
                      fontFamily: "inherit",
                      boxShadow: (t: Theme) =>
                        `0px 1px 0px ${
                          t.palette.mode === "light"
                            ? "#E8E8EF"
                            : t.palette.background.paper
                        }`,
                      zIndex: props.table_zIndex,
                      // border: (t) => `1px solid ${t.palette.divider}`,
                      // backgroundImage:t=> `linear-gradient(0deg, ${t.palette.divider} 0%, transparent 100%)`
                    }}
                  >
                    {props.options?.action_cell_title === undefined
                      ? "عملیات"
                      : props.options.action_cell_title}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody
              style={{
                fontFamily: "inherit",
                border: "unset",
              }}
            >
              <TableLoading loading={props.loading} />

              {/* --------------------------------------------------------------------------------------Add new row ui  */}
              <AddNewRowComponent
                ref={ref}
                key={addRowId}
                list_for_edit={props.table_head_list}
                options={props.options}
              />

              {visibleRows?.map((row: T, i) => {
                return (
                  <OptTableRow
                    DetailPanels={DetailsPanel}
                    has_edit_row={Boolean(props.options?.edit_row)}
                    options={props.options}
                    row_data={row}
                    table_head_list={props.table_head_list}
                    key={`${i * (i + 1)}`}
                    ref={ref}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {props.has_pagination && (
        <CustomPagination
          data={{
            count: total_data,
            onChangePage(event, page) {
              set_pagination_props((pre) => ({ ...pre, page: page }));
            },
            onChangeRowsPerPage(event) {
              set_pagination_props((pre) => ({
                ...pre,
                page: 0,
                perPage: Number(event.target.value),
              }));
            },
          }}
          search_data={{
            page: pagination_props.page,
            perPage: pagination_props.perPage,
            rowsPerPageOptions: pagination_props.rowsPerPageOptions,
            totalDocs: pagination_props.totalDocs,
            totalIncome: pagination_props.totalIncome,
          }}
        />
      )}
      {/* </HardEdgeCard> */}
    </Grid>
  );
};
const CustomTable = React.forwardRef(TableIndex);

export default CustomTable;
