import { Box, Switch, SwitchProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type StyledSwitchProps = SwitchProps & {
  left?: string;
  right?: string;
  label?: string;
};

export default function StyledSwitch(props: StyledSwitchProps) {
  const {t} = useTranslation();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="body1">{props.label ?? t("styledSwitch.defaultLabel")}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">{props.left ?? t("styledSwitch.defaultLeft")}</Typography>
        <Switch {...props}></Switch>
        <Typography variant="body2">{props.right ?? t("styledSwitch.defaultRight")}</Typography>
      </Box>
    </Box>
  );
}
