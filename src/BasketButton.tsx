import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { makeStyles, Badge } from "@material-ui/core";

const useStyles = makeStyles({
  badge: {
    top: '90%',
    backgroundColor: '#026764',
    color: '#fff',
  }
});

export default function BasketButton({ className, cartBadge, ...rest }: any) {
  const classes = useStyles();

  return (
    <IconButton
      className={className}
      tabIndex={0}
      role="button"
      aria-disabled="false"
    >
      <Badge badgeContent={cartBadge} classes={{badge: classes.badge}}>
        <ShoppingBasketIcon fontSize="inherit" />
      </Badge>
    </IconButton>
  );
}
