import {
  ButtonBase,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Theme,
} from "@mui/material";
import React, { Ref, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DetailPanelProps,
  OptTableRefProps,
  TableHeaderInterface,
  options,
} from "./types";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";
import CollapseRowWrapper from "./collapse_detail_panel";
import CollapseAddRow from "./collapse_add_row";
import { BootstrapTooltip } from "./error_tooltip";
import { check_input_type } from "./add_new_row_component";
import useEditRow from "./hook/useEditRow";
import DeleteMenuModal from "../delete_modal";

interface propsType<T> {
  table_head_list: TableHeaderInterface<T>[];

  is_edited?: string | number | null;
  index: number;
  has_edit_row: boolean;
  current_row: {
    index: number | string;
    table_key: string;
  } | null;
  Comp:
    | React.FunctionComponent<{
        is_open: boolean;
        rowData: T | undefined;
      }>
    | undefined;
  set_current_row: React.Dispatch<
    React.SetStateAction<{
      index: number | string;
      table_key: string;
    } | null>
  >;
  options?: options<T>;
  set_row_to_edit: (id: string | number) => void;
  row_data: T;
  DetailPanels: DetailPanelProps<T>[] | undefined;
}

const OptTableRow = <T,>(props: propsType<T>, ref: Ref<OptTableRefProps>) => {
  let {
    table_head_list,
    index,
    is_edited,
    row_data,
    has_edit_row,
    set_current_row,
    set_row_to_edit,
    current_row,
    DetailPanels,
    options,
    Comp,
  } = props;

  const {
    openShowError,
    show_error,
    editedRow,
    editRowHandler,
    setEditRow,
    set_edit_loading,
    edit_loading,
    open_modal,
    set_open_modal,
  } = useEditRow({ ref: ref, options });
  /* @ts-ignore */
  let render_index = is_edited === row_data.id;

  return (
    <React.Fragment>
      {/* ----------------------------------------------- edit Part */}
      <TableRow>
        <CollapseAddRow
          onCancel={() => set_row_to_edit(-1)}
          onAccept={() => {
            set_edit_loading(true);
            /* @ts-ignore */
            ref?.current
              ?.editRowDataManager(editedRow)
              ?.then((res: any) => {
                if (res === true) {
                  set_row_to_edit(-1);
                }
              })
              ?.catch((err: any) => {})
              .finally(() => {
                set_edit_loading(false);
              });
          }}
          loading={edit_loading}
          is_disabled={edit_loading}
          Comp={
            <TableRow>
              {table_head_list
                .filter((item) => item.editable === true)
                .map((table_row, index) => {
                  let first_to_focus = table_head_list.findIndex(
                    (item) => item.editable === true
                  );

                  return (
                    <TableCell
                      key={index}
                      align={table_row.align}
                      width={table_row.width}
                      style={{
                        padding: "8px 8px 8px",
                        minWidth: table_row.width,
                        // flex:1,
                        fontFamily: "inherit",
                        position: "relative",
                        ...table_row.row_style,
                      }}
                    >
                      <BootstrapTooltip
                        style={{ fontFamily: "inherit" }}
                        title={show_error.message}
                        open={show_error.input_index === index}
                      >
                        <TextField
                          fullWidth
                          type={table_row.input_type}
                          disabled={
                            edit_loading || table_row.editable === false
                          }
                          // key={`${edit_loading}`}
                          value={
                            table_row.input_type === "price" &&
                            /* @ts-ignore */
                            !!editedRow?.[table_row.table_key]
                              ? Number(
                                  /* @ts-ignore */
                                  parseInt(editedRow?.[table_row.table_key])
                                ).toLocaleString()
                              : /* @ts-ignore */
                                editedRow?.[table_row.table_key] || ""
                          }
                          variant="standard"
                          onChange={(e) => {
                            let value;
                            switch (table_row.input_type) {
                              case "price":
                                value =
                                  parseInt(
                                    e.target.value.split(",").join("")
                                  ) || "";
                                break;
                              case "number":
                                value = parseInt(e.target.value);
                              default:
                                value = e.target.value;
                                break;
                            }

                            editRowHandler({
                              /* @ts-ignore */
                              key: table_row.table_key as keyof T,
                              value,
                            });
                          }}
                          size="small"
                          InputProps={{ style: { fontFamily: "inherit" } }}
                          label={table_row.title}
                          autoFocus={index === first_to_focus}
                          onKeyPress={(e) => {
                            check_input_type(
                              e,
                              openShowError,
                              index,
                              /* @ts-ignore */
                              table_row.input_type
                            );
                            e.stopPropagation();
                          }}
                          {...table_row.input_props}
                        />
                      </BootstrapTooltip>
                    </TableCell>
                  );
                })}
            </TableRow>
          } /* @ts-ignore */
          is_open={row_data.id === is_edited}
        />
      </TableRow>
      {/* ----------------------------------------------- row Part */}

      <AnimatePresence mode="wait">
        {!render_index && (
          <motion.tr
            style={{
              fontFamily: "inherit",
              overflowX: "hidden",
              width: "100%",
            }}
            initial={{ opacity: 0 }}
            key={`${render_index}`}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
          >
            {table_head_list?.map((table_row, i) => {
              const { Render } = table_row;
              return (
                <TableCell
                  sx={{
                    fontFamily: "inherit",
                    boxShadow: (t: Theme) =>
                      `0px 0.2px 0px ${
                        t.palette.mode === "light"
                          ? "#E8E8EF"
                          : t.palette.background.paper
                      }`,
                  }}
                  key={i}
                  align={table_row.align}
                  width={table_row.width}
                  style={{
                    padding: table_row.has_details_penel ? 0 : "8px",
                    cursor: table_row.has_details_penel ? "pointer" : "auto",
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
                        fontFamily: "inherit",
                        justifyContent: table_row.align,
                        minWidth: table_row.width,
                        ...table_row.row_style,
                      }}
                      onClick={() => {
                        if (table_row.has_details_penel) {
                          set_row_to_edit(-1);
                          set_current_row((pre) =>
                            /* @ts-ignore */
                            pre?.index === row_data.id &&
                            pre?.table_key === table_row.table_key
                              ? { index: -1, table_key: "" }
                              : {
                                  /* @ts-ignore */
                                  index: row_data.id,
                                  table_key: table_row.table_key,
                                }
                          );
                        }
                      }}
                    >
                      {Render && <Render renderData={row_data} />}
                      {/* @ts-ignore */}
                      {!!!Render && row_data?.[table_row?.table_key]}
                    </ButtonBase>
                  ) : (
                    <>
                      {Render && <Render renderData={row_data} />}
                      {/* @ts-ignore */}
                      {!!!Render && row_data?.[table_row?.table_key]}
                    </>
                  )}
                </TableCell>
              );
            })}
            {(DetailPanels?.some((item) => item.table_key === "action_cell") ||
              has_edit_row) && (
              <TableCell
                sx={{
                  minWidth: 120,
                  fontFamily: "inherit",
                  boxShadow: (t: Theme) =>
                    `0px 0.2px 0px ${
                      t.palette.mode === "light"
                        ? "#E8E8EF"
                        : t.palette.background.paper
                    }`,
                }}
              >
                {has_edit_row && (
                  <>
                    <IconButton
                      onClick={() => {
                        set_current_row({ index: -1, table_key: "" });
                        setEditRow(row_data);
                        /* @ts-ignore */
                        set_row_to_edit(row_data.id);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setEditRow(row_data);
                        set_open_modal(true);
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <DeleteMenuModal 
                    options={options}
                      title_component={options?.delete_modal_title}
                      onYesClick={() => {
                        /*@ts-ignore*/
                        options
                          ?.deleteDataHandler(row_data)
                          .then((res: any) => {
                            set_open_modal(false);
                          })
                          .catch((err: any) => {});
                      }}
                      props={{
                        open: open_modal,
                        onClose: () => {
                          set_open_modal(false);
                        },
                      }}
                    />
                  </>
                )}

                {/* -------------------------------------------------- arrow for action cell */}
                {DetailPanels?.some(
                  (item) => item.table_key === "action_cell"
                ) && (
                  <IconButton
                    onClick={(e: any) => {
                      set_current_row((pre) =>
                        /* @ts-ignore */
                        pre?.index === row_data.id
                          ? null
                          : /* @ts-ignore */
                            { index: row_data.id, table_key: "action_cell" }
                      );
                    }}
                  >
                    <ExpandMore
                      sx={{
                        color: (t: Theme) =>
                          t.palette.mode === "light" ? "black" : "white",
                        transition: "0.2s",
                        transform: `rotate(${
                          index === current_row?.index ? 180 : 0
                        }deg)`,
                      }}
                    />
                  </IconButton>
                )}
              </TableCell>
            )}
          </motion.tr>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------- Details panels */}
      <TableRow>
        <CollapseRowWrapper
          /* @ts-ignore */
          is_open={current_row?.index === row_data.id}
          motion_key={current_row?.table_key}
          Comp={
            Comp && (
              <Comp
                /* @ts-ignore */
                is_open={current_row?.index === row_data.id}
                rowData={row_data}
              />
            )
          }
        />
      </TableRow>
    </React.Fragment>
  );
};
const ForwardedRowWithRef = React.forwardRef(OptTableRow);
const MemorizedRow = memo(ForwardedRowWithRef) as typeof ForwardedRowWithRef;
// export default ;
export default MemorizedRow;
