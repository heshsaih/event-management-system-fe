import { Box, Switch, Typography } from "@mui/material";
import { useController } from "react-hook-form";

type ControlledSwitchProps = {
  name: string;
  left?: string;
  right?: string;
  label?: string;
  "aria-label"?: string
};

export default function ControlledSwitch(props: ControlledSwitchProps) {
  const { field } = useController({
    name: props.name,
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="body1">{props.label ?? ""}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">{props.left ?? "Nie"}</Typography>
        <Switch aria-label={props["aria-label"]} checked={field.value} onChange={field.onChange}></Switch>
        <Typography variant="body2">{props.right ?? "Tak"}</Typography>
      </Box>
    </Box>
  );
}
