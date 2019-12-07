import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomeHeader from "./assets/HomeHeader.jpg";
import Slider from "./Slider";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: "fixed",
    top: 80,
    left: 0,
    width: "100%",
    height: 430,
    zIndex: 0
  },
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    padding: `0 ${theme.spacing(2)}px`
  },
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    objectFit: "cover",
    width: "100%",
    height: "100%"
  }
}));

export default function HeaderPromotion() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.banner} src={HomeHeader} alt="home promotions" />
      <div className={classes.container}>
        <Slider
          buttonsProps={{ color: "primary" }}
          autoInterval={4000}
          items={[1, 2, 3, 4]}
        />
      </div>
    </div>
  );
}
