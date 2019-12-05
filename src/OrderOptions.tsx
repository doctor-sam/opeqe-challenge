import React, { useEffect, useState, useRef } from "react";
import { Link } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  headerBar: {
    padding: `10px ${theme.spacing(2)}px`,
    position: "sticky",
    top: 80,
    backgroundColor: "#fff",
    zIndex: 1,
    height: 70,
    boxShadow: "1px 0 10px -5px #a5a5a5",
    display: "flex",
    alignItems: "center"
  },
  option: {
    width: 180,
    textAlign: "center",
    color: "#a5a5a5"
  },
  optionMode: {
    color: theme.palette.secondary.main,
    textAlign: "center"
  },
  optionSub: {
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
}));

const useTypeSelectStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "relative"
  },
  button: {
    display: "inline-block",
    cursor: "pointer"
  },
  divider: {
    margin: "0 10px",
    fontSize: 13,
    color: theme.palette.grey[800]
  },
  marker: {
    position: "absolute",
    bottom: "-5px",
    width: 0,
    height: 2,
    backgroundColor: theme.palette.primary.main,
    transition: "transform .4s, width .2s"
  }
}));

export function TypeSelect({ value, itemProps, onChange, ...rest }: any) {
  const classes = useTypeSelectStyles();
  const [markerStyle, setMarkerStyle] = useState<any>({});
  const delivery = useRef<any>();
  const pickup = useRef<any>();

  useEffect(() => {
    let target: any = {};
    if (value === "delivery") {
      target = delivery;
    }
    if (value === "pickup") {
      target = pickup;
    }
    if (target.current) {
      setMarkerStyle({
        transform: target.current.offsetLeft,
        width: target.current.offsetWidth
      });
    } else {
      setMarkerStyle({});
    }
  }, [delivery, pickup, value]);

  function handleClick(type: string) {
    if (onChange) {
      onChange(type);
    }
  }

  return (
    <div className={classes.container} {...rest}>
      <div
        className={classes.marker}
        style={{
          transform: `translateX(${markerStyle.transform}px)`,
          width: `${markerStyle.width || 0}px`
        }}
      />
      <div
        className={classes.button}
        onClick={() => handleClick("delivery")}
        ref={delivery}
        {...itemProps}
      >
        Delivery
      </div>
      <span className={classes.divider}>or</span>
      <div
        className={classes.button}
        onClick={() => handleClick("pickup")}
        ref={pickup}
        {...itemProps}
      >
        Pickup
      </div>
    </div>
  );
}

export default function OrderOptions({ orderType, onChange }: any) {
  const classes = useStyles();
  return (
    <>
      <Link variant="body1" className={classes.option} href="/order-options">
        <div className={classes.optionMode}>ASAP Pickup</div>
        <div className={classes.optionSub}>395 Santa Monica Pier</div>
      </Link>
      <TypeSelect value={orderType} onChange={onChange} />
    </>
  );
}

export function HeaderOrderOptions({ children }: any) {
  const classes = useStyles();
  return <div className={classes.headerBar}>{children}</div>;
}
