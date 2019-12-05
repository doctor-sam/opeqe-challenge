import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function BackButton({ className, ...rest }: any) {
  return (
    <IconButton
      className={className}
      tabIndex={0}
      role="button"
      aria-disabled="false"
    >
      <ArrowBackIcon fontSize="inherit" />
    </IconButton>
  );
}
