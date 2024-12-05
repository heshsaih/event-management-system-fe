import { ListItem, Typography } from "@mui/material";
import { ReactElement } from "react";

type ListLinkProps = {
  icon: ReactElement;
  href?: string;
  text: string;
  link?: boolean;
};

export default function ListLink({ icon, href, text, link = true }: ListLinkProps) {
  return (
    <ListItem
      sx={{
        padding: 0,
        justifyContent: "center",
        width: "100%",
      }}
    >
      {icon}
      <Typography
        component={link ? "a" : "text"}
        href={href}
        sx={{
          textDecoration: "none",
          color: "white",
          marginLeft: "0.3rem",
        }}
      >
        {text}
      </Typography>
    </ListItem>
  );
}