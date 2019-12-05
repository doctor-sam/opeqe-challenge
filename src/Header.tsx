import React, { useEffect, useState } from "react";
import { Container, Box, Link, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import BasketButton from "./BasketButton";
import BackButton from "./BackButton";
import Logo from "./Logo";

const useStyles = makeStyles((theme: any) => ({
  root: ({ hasScrolled }: any) => ({
    position: "fixed",
    top: 0,
    zIndex: 99,
    width: "100%",
    left: 0,
    textAlign: "center",
    transition: "background-color .4s",
    backgroundColor: hasScrolled ? "rgb(207, 207, 207)" : "rgb(239, 239, 239)"
  }),
  container: {
    height: 80
  },
  cartButton: {
    fontSize: 30
  },
  hide: {
    visibility: "hidden"
  },
  iconButton: ({ hasScrolled }: any) => ({
    color: hasScrolled ? "rgb(105, 105, 105)" : "rgb(2, 103, 100)"
  }),
  roundButton: {
    height: 30,
    padding: "0 10px",
    margin: "0 5px",
    fontSize: 12,
    fontWeight: 400
  },
  signUpButton: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline-flex"
    }
  },
  link: {
    margin: "0 10px",
    color: "rgb(105, 105, 105)",
    padding: "2px 0",
    display: "none",
    transition: "border-color 0.4s",
    borderBottom: "1px solid transparent",
    [theme.breakpoints.up("sm")]: {
      display: "inline-block"
    },
    "&:hover": {
      borderColor: "rgb(105, 105, 105)"
    },
    "&.active": {
      borderBottom: "1px solid rgb(105, 105, 105)"
    },
    "&.fixed": {
      display: "inline-block"
    }
  },
  logo: {
    width: 100,
    verticalAlign: "middle",
    display: "inline-block",
    textAlign: "center"
  }
}));

export default function Header({ showGoBack }: any) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const classes = useStyles({ hasScrolled });
  const topOffsetLimit = 100;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > topOffsetLimit) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    });
  }, []);

  return (
    <header className={classes.root}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className={classes.container}
        >
          <Box>
            <BackButton className={clsx(classes.iconButton, !showGoBack && classes.hide)} />
            <Logo to="/" className={classes.logo} />
          </Box>
          <Box>
            <Link variant="body1" className={classes.link} href="/reservation">
              Reservation
            </Link>
            <Link variant="body1" className={classes.link} href="/orders">
              Orders
            </Link>
            <Button
              href="/login"
              className={classes.roundButton}
              variant="outlined"
              color="primary"
              size="small"
            >
              Log In
            </Button>
            <Button
              href="/login"
              className={clsx(classes.signUpButton, classes.roundButton)}
              variant="outlined"
              color="secondary"
            >
              Sign Up
            </Button>
            <BasketButton
              className={clsx(classes.cartButton, classes.iconButton)}
              cartBadge={3}
            />
          </Box>
        </Box>
      </Container>
    </header>
  );
}
