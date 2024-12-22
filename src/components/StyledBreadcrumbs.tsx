import { Breadcrumbs } from "@mui/material";
import { ReactNode } from "react";

type StyledBreadcrumbsProps = {
  children?: ReactNode | ReactNode[];
};

export default function StyledBreadcrumbs(props: StyledBreadcrumbsProps) {
  return (
    <div
      style={{
        width: "100%",
        paddingBottom: "3rem",
        paddingTop: "0.5rem",
        paddingLeft: "0.5rem",
      }}
    >
      <Breadcrumbs>{props.children}</Breadcrumbs>
    </div>
  );
}
