import React, { useState, useEffect } from "react";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import { CssBaseline, useMediaQuery } from "@material-ui/core";
import Header from "./Header";
import HeaderPromotion from "./HeaderPromotion";
import { makeStyles } from "@material-ui/styles";
import OrderOptions, { HeaderOrderOptions } from "./OrderOptions";
import Carousel from "./Carousel";
import items from "./assets/store.json";
import Trebuchet from "./assets/trebuchet.woff";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const trebuchet = {
  fontFamily: "Trebuchet",
  src: `
    url(${Trebuchet}) format('woff')
  `
};

const COLORS = {
  UltraLightGray: "rgba(245, 245, 245, 1.0)",
  MediumLightGray: "rgba(215, 215, 215, 1.0)",
  LightGray: "rgba(188, 188, 188, 1.0)",
  MediumGray: "rgba(165, 165, 165, 1.0)",
  DimGray: "rgba(105, 105, 105, 1.0)",
  DarkGray: "rgba(70, 70, 70, 1.0)",
  UltraDarkGray: "rgba(40, 40, 40, 1.0)",
  DarkOrange: "rgba(247, 159, 31, 1.0)",
  Green: "rgba(0, 163, 0, 1.0)",
  LightGreen: "rgba(153, 180, 51, 1.0)",
  LightPurple: "rgba(159, 0, 167, 1.0)",
  Warning: "rgba(0, 171, 169, 1.0)", //Teal
  Main: "rgba(2, 103, 100, 1.0)",
  RouteLine: "rgba(2, 103, 100, 0.5)",
  Complementary: "rgba(0, 0, 0, 1.0)",
  Secondary: "rgba(153, 101, 21, 1.0)", // Gold Brown
  Red: "rgba(139, 0, 10, 1.0)",
  WhatsApp: "rgba(37, 211, 102, 1.0)",
  Instagram: "rgba(131, 58, 180, 1.0)",
  SMSApp: "rgba(48, 209, 88, 1.0)"
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Trebuchet, Arial"
  },
  palette: {
    primary: {
      main: COLORS.Main
    },
    secondary: {
      main: COLORS.Secondary
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [trebuchet]
      }
    },
    MuiRadio: {
      colorPrimary: {
        color: COLORS.Main
      }
    },
    MuiButton: {
      outlinedPrimary: {
        backgroundColor: "#000000",
        borderColor: "#000000",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#000000",
          borderColor: "#000000"
        }
      },
      outlinedSecondary: {
        backgroundColor: "transparent",
        borderColor: COLORS.Main,
        color: COLORS.Main,
        "&:hover": {
          backgroundColor: "transparent",
          borderColor: COLORS.Main
        }
      },
      outlined: {
        borderRadius: 30,
        textTransform: "none"
      }
    }
  },
  props: {
    MuiLink: {
      underline: "none"
    }
  }
});

const useStyles = makeStyles({
  content: {
    marginTop: 510,
    backgroundColor: "#fff",
    height: 900,
    position: "relative",
    zIndex: 1
  }
});

function mapFood(food: any) {
  function addUrlToCategory(category: any) {
    return (filterName: string) => {
      return {
        ...category,
        url: `?filterValue=${category.title}&filterType=${filterName}`
      };
    };
  }

  function addPreparationEstimate(preparationTime: number) {
    return [preparationTime, 1.5 * preparationTime];
  }
  return {
    ...food,
    url: `?cuisine=${food.cuisineType.title}&meal=${food.mealType.title}&course=${food.courseType.title}&id=${food.id}`,
    categories: [
      addUrlToCategory(food.menuType)("menuTitle"),
      addUrlToCategory(food.cuisineType)("cuisineTitle"),
      addUrlToCategory(food.mealType)("mealTitle"),
      addUrlToCategory(food.courseType)("courseTitle")
    ],
    preparationEstimate: addPreparationEstimate(food.preparation)
  };
}

const App: React.FC = () => {
  const [goBack] = useState(true);
  const [orderType, setOrderType] = useState("delivery");
  const [slidesCount, setSlidesCount] = useState(1);
  const breakpointMatches = {
    xs: useMediaQuery(theme.breakpoints.up('xs')),
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg'))
  }
  const classes = useStyles();

  useEffect(() => {
    if(breakpointMatches.xs) {
      setSlidesCount(1)
    }
    if(breakpointMatches.sm) {
      setSlidesCount(2)
    }
    
    if (breakpointMatches.md || breakpointMatches.lg) {
      setSlidesCount(3)
    }
  }, [breakpointMatches.xs, breakpointMatches.sm, breakpointMatches.md, breakpointMatches.lg]);

  const handleOrderTypeChange = (type: string) => {
    setOrderType(type);
  };

  const orderOptions = (
    <OrderOptions orderType={orderType} onChange={handleOrderTypeChange} />
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ height: 900 }}>
        <Header showGoBack={goBack} />
        <HeaderPromotion />
        <div className={classes.content}>
          <HeaderOrderOptions>{orderOptions}</HeaderOrderOptions>
          <Carousel
            items={items.map(mapFood)}
            title="American"
            slidesToShow={slidesCount}
            scrollable={isMobile}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
