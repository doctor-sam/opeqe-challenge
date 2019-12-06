import React, { useState, useRef, useEffect } from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import TimerIcon from "@material-ui/icons/Timer";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link, Box, Grid, useMediaQuery, IconButton } from "@material-ui/core";
import clsx from "clsx";

interface IMeal {
  title: string;
  description: string;
  image: string;
  priority: number;
  url: string;
}

interface IFood {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  ingredients: string;
  minimumCalorie: number;
  maximumCalorie: number;
  preparation: number;
  delivery: number;
  image: string;
  gallery: string;
  price: number;
  fee: number;
  rate: number;
  isAcceptingDelivery: boolean;
  isAcceptingPickup: boolean;
  isFavorite: boolean;
  isCatering: boolean;
  isAvailable: boolean;
  cuisineType: IMeal;
  mealType: IMeal;
  menuType: IMeal;
  courseType: IMeal;
  special: {
    title: string;
    description: string;
    transcript: string;
    policy: string;
    image: string;
    voucher: string;
    beginTime: string;
    remainingTime: number;
    amount: number;
    percentage: number;
    limit: number;
    value: number;
    quantity: number;
  };
  rewards: any[];
  categories: Array<IMeal>;
  url: string;
  preparationEstimate: number[];
}

interface IPropsFoodCard {
  subs: Array<IMeal>;
}

const useStyles = makeStyles((theme: Theme) => ({
  carousel: {
    position: "relative",
    overflow: "hidden"
  },
  carouselHeader: {
    padding: `10px ${theme.spacing(2)}px`,
    marginBottom: 10
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 700
  },
  horizontalScroller: {
    overflow: "hidden",
    position: "relative",
    margin: `0 ${theme.spacing(2)}px`
  },
  gridItem: {
    flexWrap: "nowrap",
    paddingRight: 10
  },
  grid: {
    flexWrap: "nowrap",
    transition: "transform 0.5s cubic-bezier(.74, 0, .35, .96)"
  },
  "@keyframes bounce-in": {
    "0%": {
      transform: "scale(1)"
    },
    "70%": {
      transform: "scale(1.3)"
    },
    "100%": {
      transform: "scale(0)"
    }
  },
  "@keyframes bounce-out": {
    "0%": {
      transform: "scale(0)"
    },
    "30%": {
      transform: "scale(1.5)"
    },
    "50%": {
      transform: "scale(1)"
    },
    "70%": {
      transform: "scale(1.1)"
    },
    "100%": {
      transform: "scale(1)"
    }
  },
  banner: {
    borderRadius: 5,
    height: 220,
    position: "relative",
    overflow: "hidden",
    width: "100%",
    marginBottom: 10
  },
  card: {
    width: 465,
    [theme.breakpoints.up("lg")]: {
      width: 400
    },
    [theme.breakpoints.up("md")]: {
      width: 370
    }
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  title: {
    fontSize: 18
  },
  subTitle: {
    fontSize: 15
  },
  subTitleMain: {
    color: theme.palette.primary.main
  },
  subTitleType: {
    color: theme.palette.grey[600],
    display: "inline-block",
    "&:before": {
      content: `" . "`
    }
  },
  tag: {
    display: "inline-block",
    margin: 1,
    padding: 2,
    fontSize: 14
  },
  tagLight: {
    backgroundColor: "#f5f5f5"
  },
  tagDark: {
    backgroundColor: "#d7d7d7"
  },
  tagGreen: {
    color: "#026764"
  },
  timerIcon: {
    fontSize: 14,
    verticalAlign: "middle"
  },
  navigation: {
    position: "absolute",
    top: 0,
    display: "flex",
    height: "100%",
    alignItems: "center"
  },
  next: {
    right: 5 * 2
  },
  prev: {
    left: 5
  },
  navBtn: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: 8,
    display: "inline-block",
    animationName: "$bounce-in",
    animationDuration: "0.4s",
    animationTimingFunction: "cubic-bezier(.53, .72, .81, .31)",
    animationDelay: "0s",
    animationDirection: "normal",
    animationIterationCount: 1,
    animationFillMode: "forwards",
    animationPlayState: "running",
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    },
    "$carousel:hover &": {
      animationName: "$bounce-out",
      animationDuration: "0.8s",
      animationTimingFunction: "linear",
      animationDelay: "0s",
      animationDirection: "normal",
      animationIterationCount: 1,
      animationFillMode: "forwards",
      animationPlayState: "running"
    }
  }
}));

export function FoodCardSub({ subs }: IPropsFoodCard) {
  const classes = useStyles();
  const [main, ...rest] = subs;
  return (
    <div className={classes.subTitle}>
      <Link href={main.url} className={classes.subTitleMain}>
        {main.title}
      </Link>
      {rest.map(type => (
        <Link key={type.title} href={type.url} className={classes.subTitleType}>
          {type.title}
        </Link>
      ))}
    </div>
  );
}

export function FoodTag({ children, className }: any) {
  const classes = useStyles();

  return <div className={clsx(classes.tag, className)}>{children}</div>;
}

export function FoodImage({ src, title }: any) {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <img src={src} alt={title} className={classes.image} />
    </div>
  );
}

export function FoodPreparationTime({ time }: { time: number[] }) {
  const classes = useStyles();
  return (
    <FoodTag className={classes.tagLight}>
      <TimerIcon className={classes.timerIcon} />
      {` `}
      {time.join("-")}
      {` `} Mins
    </FoodTag>
  );
}

export function FoodPrice({ price }: { price: number }) {
  const classes = useStyles();
  return <FoodTag className={classes.tagDark}>${price}</FoodTag>;
}

export function FoodCard({ item }: { item: IFood }) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <FoodImage src={item.image} title={item.title} />
      <div className={classes.title}>{item.title}</div>
      <FoodCardSub subs={item.categories} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <FoodPreparationTime time={item.preparationEstimate} />
          <FoodPrice price={item.price} />
        </Box>
        <Box>
          {!item.delivery && (
            <FoodTag className={clsx(classes.tagLight, classes.tagGreen)}>
              Free Delivery
            </FoodTag>
          )}
        </Box>
      </Box>
    </div>
  );
}

interface ICarouselProps {
  items: any[];
  title: string;
  slidesToShow: number;
}

export default function Carousel({
  items,
  title,
  slidesToShow
}: ICarouselProps) {
  const [page, setPage] = useState(0);
  const [position, setPosition] = useState(0);
  const [firstItem, ...otherItems] = items;
  const balanceElementRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const classes = useStyles();
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / slidesToShow);

  useEffect(() => {
    const balanceWidth = balanceElementRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;
    const offset =
      (100 * (page * (slidesToShow - 1) * balanceWidth)) / containerWidth;
    setPosition(Math.floor(offset));
  }, [page, slidesToShow, totalItems]);

  function handleNext() {
    const pageNumber = page + 1;
    if (pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  }

  function handlePrev() {
    const pageNumber = page - 1;
    console.log(pageNumber >= 0);
    if (pageNumber >= 0) {
      setPage(pageNumber);
    }
  }

  const cards = items.length && (
    <Grid
      container
      className={classes.grid}
      style={{ transform: `translateX(-${position}%)` }}
      ref={containerRef}
    >
      <Grid
        ref={balanceElementRef}
        key={firstItem.id}
        item
        className={classes.gridItem}
      >
        <FoodCard item={firstItem} />
      </Grid>
      {otherItems.map((item: IFood) => (
        <Grid key={item.id} item className={classes.gridItem}>
          <FoodCard item={item} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div className={classes.carousel}>
      <div className={classes.carouselHeader}>
        <div className={classes.carouselTitle}>{title}</div>
      </div>
      <div className={classes.horizontalScroller}>{cards}</div>
      {page !== 0 && (
        <div className={clsx(classes.navigation, classes.prev)}>
          <IconButton className={classes.navBtn} onClick={handlePrev}>
            <NavigateBeforeIcon />
          </IconButton>
        </div>
      )}
      {page !== totalPages && (
        <div className={clsx(classes.navigation, classes.next)}>
          <IconButton className={classes.navBtn} onClick={handleNext}>
            <NavigateNextIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}
