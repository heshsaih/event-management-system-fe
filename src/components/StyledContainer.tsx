import { Container, ContainerProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { Colors } from "../constants/styling";

type ShadowContainerProps = ContainerProps & PropsWithChildren & {
  inner?: boolean;
};

export default function StyledContainer(props: ShadowContainerProps) {
  const {sx, ...propsWithoutStyles} = props;
  return <Container
    disableGutters
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      padding: "4rem 0 4rem 0",
      paddingX: "0.5rem",
      borderRadius: "0.5rem",
      border: props.inner ? "none" : `1px solid ${Colors.GREY_BORDER}`,
      backgroundColor: "primary",
      ...sx
    }}
    {...propsWithoutStyles}
  >
    {props.children}
  </Container>
}