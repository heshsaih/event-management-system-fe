import { Box, FormLabel, Switch, Typography } from "@mui/material";
import { useController } from "react-hook-form";

type ControlledSwitchProps = {
  name: string;
  label?: string;
};

export default function ControlledSwitch(props: ControlledSwitchProps) {
  const { field } = useController({
    name: props.name,
  });

  return (
    <>
      <FormLabel htmlFor={props.name}>{props.label ?? ""}</FormLabel>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Typography>Nie</Typography>
        <Switch
          id={props.name}
          name="outsidersAllowed"
          checked={field.value}
          onChange={field.onChange}
        ></Switch>
        <Typography>Tak</Typography>
      </Box>
    </>
  );
}
