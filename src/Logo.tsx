import React from "react";
import { Link } from "@material-ui/core";
import LogoSVG from "./assets/logo.svg";


export default function Logo({ className, to }: any) {
  return (
    <Link href={to} className={className}>
      <img src={LogoSVG} alt="opeqe" />
    </Link>
  );
}
