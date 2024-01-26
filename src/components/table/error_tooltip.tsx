import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React from "react";
export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.mode === "light" ? "#000" : "#fff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "16px 8px",

    backgroundColor: theme.palette.mode === "light" ? "#000" : "#fff",
    color: theme.palette.mode === "light" ? "#fff" : "#000",
    fontFamily: "inherit",
    fontSize: theme.typography.pxToRem(14),
  },
}));
