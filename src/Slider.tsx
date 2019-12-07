import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import RadioButton from "./RadioButton";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  container: {},
  animation: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    transition: "opacity 1s, transform 1s",
    willChange: "opacity, transform",
    "&-enter": {
      opacity: 0
    },
    "&-enter-active": {
      opacity: 1
    },
    "&-exit": {
      opacity: 1
    },
    "&-exit-active": {
      opacity: 0
    }
  },
  buttons: {
    position: "absolute",
    bottom: 4,
    left: 0,
    display: "block",
    textAlign: "center",
    width: "100%",
    zIndex: 1
  }
});

export default function Slider({
  className,
  items = [],
  autoInterval,
  buttonsProps}: any) {
  const classes = useStyles();
  const TRANSITION_DURATION = 1000;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    function next() {
      setCurrentSlide((currentSlide + 1) % items.length);
    }

    if (autoInterval) {
      const timer = setTimeout(next, autoInterval);
      return () => clearInterval(timer);
    }
  }, [currentSlide, autoInterval, items]);

  function handleClick(index: number) {
    setCurrentSlide(index);
  }

  const filteredItems = items.slice(0, 6);
  if (!items.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      {filteredItems[currentSlide] && (
        <TransitionGroup className={classes.container}>
          <CSSTransition
            key={currentSlide}
            timeout={TRANSITION_DURATION}
            classNames={classes.animation}
          >
            <div className={classes.animation}>
              {filteredItems[currentSlide]}
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
      <div className={classes.buttons}>
        {filteredItems.map((item: any, index: number) => (
          <RadioButton
            key={index}
            checked={index === currentSlide}
            onClick={() => handleClick(index)}
            {...buttonsProps}
          />
        ))}
      </div>
    </div>
  );
}
