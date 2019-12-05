import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TimerIcon from "@material-ui/icons/Timer";
import { Link, Box, Grid } from "@material-ui/core";
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
  horizontalScroller: {
    overflow: "hidden",
    height: "100%",
    position: "relative",
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
    transition: 'transform 0.5s cubic-bezier(.74, 0, .35, .96)',
  },
  root: {
    margin: "0 5px",
    width: "33%"
  },
  banner: {
    borderRadius: 5,
    height: 220,
    position: "relative",
    overflow: "hidden",
    width: "100%",
    marginBottom: 10
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
        <Link href={type.url} className={classes.subTitleType}>
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
    <div className={classes.root}>
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

export default function Carousel({ items }: any) {
  const classes = useStyles();
  return (
    items.length && (
      <Grid container className={classes.horizontalScroller}>
        {items.map((item: IFood) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </Grid>
    )
  );
}
