import { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import { Colors } from "../constants/styling";

type BreadcrumbProps = PropsWithChildren & {
  navigateTo: string;
  current?: boolean;
  disabled?: boolean;
};

export default function Breadcrumb(props: BreadcrumbProps) {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <Link
      style={{
        textDecoration: hover ? "underline" : "none",
        pointerEvents: props.disabled ? "none" : "auto",
        color: props.disabled ? "grey" : Colors.RED,
        fontWeight: props.current ? "bold" : "normal"
      }}
      to={props.navigateTo}
      onMouseOver={function() {
        setHover(true);
      }}
      onMouseOut={function() {
        setHover(false);
      }}
    >
      {props.children}
    </Link>
  );
}
