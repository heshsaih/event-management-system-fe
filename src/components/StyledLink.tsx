import { Typography, TypographyProps } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import { useState } from "react";

type StyledLinkProps = LinkProps & {
  children: string;
  variant?: TypographyProps["variant"];
}

export default function StyledLink(props: StyledLinkProps) {
  const { style, ...propsWithoutStyle } = props;
  const [hover, setHover] = useState<boolean>(false);

  return <Link 
    style={{
      color: "black",
      textDecoration: hover ? "underline" : "none",
      textAlign: "start",
      ...style,
    }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    {...propsWithoutStyle}
  >
    <Typography sx={{ textAlign: "left" }} variant={props.variant}>{props.children}</Typography>
  </Link>

}
