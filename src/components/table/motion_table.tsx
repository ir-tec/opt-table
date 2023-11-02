import { IconButton, ButtonBase } from "@mui/material";
import React from "react";
// import CustomPagination from "./table_pagination";
import { ExpandMore } from "@mui/icons-material";
import { OptTableInterface } from "./types";
import useTable from "./hook/useTable";
import CustomPagination from "./table_pagination";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/styles.css";
import sort_icon from "../../assets/img/sort-icon.svg";
export function MotionTable<T>(props: OptTableInterface<T>) {
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
  } = useTable(props);
  const { DetailsPanel } = props;
  let Detail = DetailsPanel?.find(
    (item, i) => item.table_key === current_row?.table_key
  );

  const Comp = Detail?.Component;
  return (
    <motion.div style={{ height: 400, overflow: "hidden" }}>
      <motion.div
        style={{
          height: "100%",

          direction: props.options?.direction,
          ...props.container_style,
          display: "flex", 
          flexDirection:"column",
          padding: 0,
        }}
      >
        {/* <HardEdgeCard> */}
        <motion.div
          style={{
            display: "flex",
            width: "100%",
            maxHeight: `calc(100% - ${props.has_pagination ? 72 : 0}px)`,
            fontFamily: "inherit",
            overflow: "auto",
            padding: 0,
            // flex:1
            position: "relative",
          }}
        >
       

          <div
            style={{
              maxHeight: "100%",
              fontFamily: "inherit",
              width: "100%",
              position: "relative",
            }}
          >
            <table
              className="table-fixed"
              style={{  }}
            >
              <thead style={{}}>
                <tr style={{}}>
                  {props?.table_head_list?.map((header, i) => {
                    return (
                      <motion.td
                        whileTap={{ scale: 0.98 }}
                        style={{
                          minWidth: header.width,
                          padding: 0,
                          fontFamily: "inherit",
                          boxShadow: `0px 1px 0px ${
                            // t.palette.mode === "light"
                            //   ?
                            "#E8E8EF"
                            // : t.palette.background.paper
                          }`,
                          textAlign: header.align || "center",
                          zIndex: props.table_zIndex,
                          ...header.header_style,
                        }}
                        // sortDirection={
                        //   orderBy === header.table_key ? order : "asc"
                        // }
                        onClick={(e: any) => {
                          if (header.sortable === false) return;

                          handleRequestSort(e, header.table_key as keyof T);
                        }}
                        key={i}
                      >
                        <button
                          style={{
                            width: "100%",
                            cursor: "pointer",
                            border: "none",
                            backgroundColor: "white",
                            color: "black",
                            padding: 8,
                            height: 36,
                            position: "relative",
                            display: "flex",
                            alignItems: "center",

                            flexDirection:
                              header.align === "right" ? "row-reverse" : "row",
                            justifyContent: header.align || "center",
                            fontFamily: "inherit",
                          }}
                          onClick={() => {
                            // setOrderBy(i.toString());
                            // setOrder(order === "asc" ? "desc" : "asc");
                          }}
                        >
                          <h3 style={{ fontFamily: "inherit" }}>
                            {header?.title}
                          </h3>
                          {header.sortable === true ||
                            (header.sortable === undefined && (
                              <motion.img
                                src={sort_icon}
                                alt=""
                                initial={{ scale: 0 }}
                                animate={{
                                  scale: orderBy === header.table_key ? 1 : 0,
                                  rotate: order === "asc" ? 0 : 180,
                                }}
                                style={{}}
                                width={20}
                                height={20}
                              />
                            ))}
                        </button>
                      </motion.td>
                    );
                  })}
                  {DetailsPanel?.some(
                    (item) => item.table_key === "action_cell"
                  ) && (
                    <td
                      style={{
                        fontFamily: "inherit",
                        boxShadow:
                          // (t: Theme) =>
                          `0px 1px 0px ${
                            // t.palette.mode === "light"
                            // ?
                            "#E8E8EF"
                            // : t.palette.background.paper
                          }`,
                        zIndex: props.table_zIndex,
                        // border: (t) => `1px solid ${t.palette.divider}`,
                        // backgroundImage:t=> `linear-gradient(0deg, ${t.palette.divider} 0%, transparent 100%)`
                      }}
                    >
                      عملیات
                    </td>
                  )}
                </tr>
              </thead>
              <tbody>
                {visibleRows?.map((row: any, i) => {
                  return (
                    <React.Fragment key={i}>
                      <tr style={{ fontFamily: "inherit" }}>
                        {props?.table_head_list?.map((table_row, index) => {
                          const { Render } = table_row;
                          return (
                            <td
                              style={{
                                textAlign: table_row.align,
                                fontFamily: "inherit",
                                minWidth: table_row.width,
                                boxShadow:
                                  // (t: Theme) =>
                                  `0px 1px 0px ${
                                    // t.palette.mode === "light"
                                    // ?
                                    "#E8E8EF"
                                    // : t.palette.background.paper
                                  }`,
                                padding: table_row.has_details_penel
                                  ? 0
                                  : "8px",
                                cursor: table_row.has_details_penel
                                  ? "pointer"
                                  : "auto",
                                ...table_row.row_style,
                              }}
                              key={index}
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
                                  {!!!Render && row?.[table_row?.table_key]}
                                </ButtonBase>
                              ) : (
                                <>
                                  {Render && <Render renderData={row} />}
                                  {!!!Render && row?.[table_row?.table_key]}
                                </>
                              )}
                            </td>
                          );
                        })}
                        {DetailsPanel?.some(
                          (item) => item.table_key === "action_cell"
                        ) && (
                          <td
                            onClick={(e: any) => {
                              set_current_row((pre) =>
                                pre?.index === i
                                  ? null
                                  : { index: i, table_key: "action_cell" }
                              );
                            }}
                            style={{
                              fontFamily: "inherit",
                              boxShadow:
                                //  (t: Theme) =>
                                `0px 1px 0px ${
                                  // t.palette.mode === "light"
                                  // ?
                                  "#E8E8EF"
                                  // : t.palette.background.paper
                                }`,
                            }}
                          >
                            <IconButton>
                              <ExpandMore
                                sx={{
                                  color:
                                    // (t: Theme) =>
                                    // t.palette.mode === "light"
                                    // ?
                                    "black",
                                  // : "white",
                                  transition: "0.2s",
                                  transform: `rotate(${
                                    i === current_row?.index ? 180 : 0
                                  }deg)`,
                                }}
                              />
                            </IconButton>
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td
                          colSpan={12}
                          style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              padding: 0,
                              margin: 0,
                              overflow: "hidden",
                            }}
                          >
                            <AnimatePresence mode="wait">
                              {!!Comp && current_row?.index === i && (
                                <motion.div
                                  key={current_row.table_key}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{
                                    opacity: 1,
                                    height: "fit-content",
                                  }}
                                  exit={{ opacity: 0, height: 0 }}
                                >
                                  <Comp
                                    is_open={current_row?.index === i}
                                    rowData={row}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
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
      </motion.div>
    </motion.div>
  );
}
