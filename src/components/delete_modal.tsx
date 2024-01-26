import {
  Button,
  ButtonGroup,
  Dialog,
  DialogProps,
  Grid,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { options } from "./table/types";

const DeleteMenuModal = <T,>({
  props,
  title_component,
  onYesClick,
  options,
}: {
  title_component: React.ReactNode;
  props: DialogProps;
  options?: options<T>;

  onYesClick: () => void;
}) => {
  return (
    <Dialog {...props} TransitionComponent={UpTransition}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          {title_component}
        </Grid>
        <Grid item xs={12} container justifyContent={"flex-end"} marginTop={2}>
          <ButtonGroup variant="text">
            <Button onClick={(e) => props?.onClose?.(e, "escapeKeyDown")}>
              {options?.modal_no_title || "خیر"}
            </Button>
            <Button onClick={() => onYesClick()}>
              {options?.modal_yes_title || "بله"}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default DeleteMenuModal;

export const UpTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
