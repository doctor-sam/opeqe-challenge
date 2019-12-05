import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

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
}

interface IPropsFoodCard {
  subs: Array<IMeal>;
}

const useStyles = makeStyles((theme: Theme) => ({
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

export function FoodCard({ item }: { item: IFood }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.title}>{item.title}</div>
      <FoodCardSub subs={item.categories} />
    </>
  );
}

export default function Carousel({ items }: any) {
  return items.length && items.map((item: IFood) => <FoodCard key={item.id} item={item} />);
}
