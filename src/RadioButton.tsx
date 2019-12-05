import React from "react";
import { Radio } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {}
});

export default function({ className, color, ...rest }: any) {
  const classes = useStyles();

  return <Radio className={clsx(classes.root, className)} color={color} {...rest} />;
}
