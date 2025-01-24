import { Box, FormLabel, Switch, Typography } from "@mui/material";
import Form from "./Form";
import { useTranslation } from "react-i18next";

type ChangeActiveSwitchProps = {
  value: boolean;
  onChange: () => void;
  heading: string;
};

export default function ChangeActiveSwitch(props: ChangeActiveSwitchProps) {
  const { t } = useTranslation();

  return (
    <Form>
      <Typography variant="h4">{props.heading}</Typography>
      <FormLabel htmlFor="active">{t("styledSwitch.defaultLabel")}</FormLabel>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Typography>{t("styledSwitch.defaultLeft")}</Typography>
        <Switch
          checked={props.value}
          id="active"
          name="active"
          onChange={props.onChange}
        ></Switch>
        <Typography>{t("styledSwitch.defaultRight")}</Typography>
      </Box>
    </Form>
  );
}
