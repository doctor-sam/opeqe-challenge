import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomeHeader from "./assets/HomeHeader.jpg";
import Slider from "./Slider";

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
  },
  promotion: {},
  promotionTitle: {
    fontSize: 30,
    fontWeight: 700
  },
  promotionDescription: {
    fontSize: 18,
  }
}));

function Promotion({ title, description }: any) {
  const classes = useStyles();
  return (
    <div className={classes.promotion}>
      <div className={classes.promotionTitle}>{title}</div>
      <div className={classes.promotionDescription}>{description}</div>
    </div>
  );
}

export default function HeaderPromotion() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.banner} src={HomeHeader} alt="home promotions" />
      <div className={classes.container}>
        <Slider
          buttonsProps={{ color: "primary" }}
          autoInterval={4000}
          items={[
            <Promotion
              title="Happy Hour"
              description="Get $8 Off When You Order Two or more Quarter Dark and Leg"
            />,
            <Promotion
              title="code FREEDINE"
              description="Enjoy $10 Off When you order two or more of Blueberry Pancake Breakfast"
            />
          ]}
        />
      </div>
    </div>
  );
}
