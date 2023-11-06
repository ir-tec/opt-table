import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Theme,
  ButtonBase,
} from "@mui/material";
import React, { Ref } from "react";
import { ExpandMore } from "@mui/icons-material";
import { OptTableInterface, OptTableRefProps } from "./types";
import useTable from "./hook/useTable";
import CustomPagination from "./table_pagination";
import { AnimatePresence, motion } from "framer-motion";
import useAddRow from "./hook/useAddRow";
import CollapseDetailPanel from "./collapse_detail_panel";
import AddNewRowComponent from "./add_new_row_component";

function LocalTable<T>(
  props: OptTableInterface<T>,
  ref: Ref<OptTableRefProps<T> | null>
) {
  const localRef = React.useRef<OptTableRefProps<T> | null>(null);
  const {
    addNewRowJandler,
    is_create_new_row,
    clear_row_handler,
    newRow,
    added_rows,
    add_loading,
  } = useAddRow({
    data: props.data,
    ref: ref || localRef,
    options: props.options,
  });
  const {
    current_row,
    handleRequestSort,
    order,
    visibleRows,
    orderBy,
    total_data,
    set_current_row,
    pagination_props,
    set_pagination_props,
  } = useTable({ ...props, data: props.data });
  const { DetailsPanel } = props;
  let Detail = DetailsPanel?.find(
    (item, i) => item.table_key === current_row?.table_key
  );
  const Comp = Detail?.Component;
  const addRowId = React.useId();
  return (
    <Grid
      style={{
        transition: "0.4s",
        height: "100%",
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
          <Table size="small" stickyHeader sx={{}}>
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
                {DetailsPanel?.some(
                  (item) => item.table_key === "action_cell"
                ) && (
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
                    {props.options?.action_cell_title || "عملیات"}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {/* --------------------------------------------------------------------------------------Add new row ui  */}
                <AddNewRowComponent
                  key={addRowId}
                  onAccept={() => {
                    /* @ts-ignore */
                    ref?.current?.newRowDataManager();
                  }}
                  addNewRowJandler={addNewRowJandler}
                  add_loading={add_loading}
                  clear_row_handler={clear_row_handler}
                  is_create_new_row={is_create_new_row}
                  list_for_edit={props.table_head_list}
                  newRow={newRow}
                />

                {[...added_rows, ...visibleRows]?.map((row: T, i) => {
                  return (
                    <React.Fragment key={i}>
                      <motion.tr
                        style={{ fontFamily: "inherit" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0 }}
                      >
                        {props?.table_head_list?.map((table_row, index) => {
                          const { Render } = table_row;
                          return (
                            <TableCell
                              sx={{
                                fontFamily: "inherit",
                                boxShadow: (t: Theme) =>
                                  `0px 1px 0px ${
                                    t.palette.mode === "light"
                                      ? "#E8E8EF"
                                      : t.palette.background.paper
                                  }`,
                              }}
                              key={index}
                              align={table_row.align}
                              width={table_row.width}
                              style={{
                                padding: table_row.has_details_penel
                                  ? 0
                                  : "8px",
                                cursor: table_row.has_details_penel
                                  ? "pointer"
                                  : "auto",
                                minWidth: table_row.width,
                                ...table_row.row_style,
                              }}
                            >
                              {table_row.has_details_penel ? (
                                <ButtonBase
                                  style={{
                                    padding: 8,
                                    width: "100%",
                                    height: "100%",
                                    cursor: table_row.has_details_penel
                                      ? "pointer"
                                      : "auto",
                                    display: "flex",
                                    justifyContent: table_row.align,
                                    minWidth: table_row.width,
                                    ...table_row.row_style,
                                  }}
                                  onClick={() => {
                                    if (table_row.has_details_penel) {
                                      set_current_row((pre) =>
                                        pre?.index === i &&
                                        pre.table_key === table_row.table_key
                                          ? { index: -1, table_key: "" }
                                          : {
                                              index: i,
                                              table_key: table_row.table_key,
                                            }
                                      );
                                    }
                                  }}
                                >
                                  {Render && <Render renderData={row} />}
                                  {/* @ts-ignore */}
                                  {!!!Render && row?.[table_row?.table_key]}
                                </ButtonBase>
                              ) : (
                                <>
                                  {Render && <Render renderData={row} />}
                                  {/* @ts-ignore */}
                                  {!!!Render && row?.[table_row?.table_key]}
                                </>
                              )}
                            </TableCell>
                          );
                        })}
                        {DetailsPanel?.some(
                          (item) => item.table_key === "action_cell"
                        ) && (
                          <TableCell
                            onClick={(e: any) => {
                              set_current_row((pre) =>
                                pre?.index === i
                                  ? null
                                  : { index: i, table_key: "action_cell" }
                              );
                            }}
                            sx={{
                              fontFamily: "inherit",
                              boxShadow: (t: Theme) =>
                                `0px 1px 0px ${
                                  t.palette.mode === "light"
                                    ? "#E8E8EF"
                                    : t.palette.background.paper
                                }`,
                            }}
                          >
                            <IconButton>
                              <ExpandMore
                                sx={{
                                  color: (t: Theme) =>
                                    t.palette.mode === "light"
                                      ? "black"
                                      : "white",
                                  transition: "0.2s",
                                  transform: `rotate(${
                                    i === current_row?.index ? 180 : 0
                                  }deg)`,
                                }}
                              />
                            </IconButton>
                          </TableCell>
                        )}
                      </motion.tr>
                      <TableRow>
                        <CollapseDetailPanel
                          is_open={current_row?.index === i}
                          motion_key={current_row?.table_key}
                          Comp={
                            Comp && (
                              <Comp
                                is_open={current_row?.index === i}
                                rowData={row}
                              />
                            )
                          }
                        />
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </AnimatePresence>
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
}

export const OptTable = React.forwardRef(LocalTable);
