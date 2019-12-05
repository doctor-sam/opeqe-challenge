import React from "react";
import { Link } from "@material-ui/core";
import { ReactComponent as LogoSVG } from "./assets/logo.svg";


export default function Logo({ className, to }: any) {
  return (
    <Link href={to} className={className}>
      <LogoSVG />
    </Link>
  );
}
