import { Box, RadioGroup } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import { useController } from "react-hook-form";

type ControlledRadioProps = PropsWithChildren & {
  children?: ReactNode[];
  name: string;
};

export default function ControlledRadio(props: ControlledRadioProps) {
  const { field } = useController({
    name: props.name,
  });
  return (
    <Box>
      <RadioGroup name={field.name} onChange={field.onChange}>
        {props.children}
      </RadioGroup>
      ;
    </Box>
  );
}
