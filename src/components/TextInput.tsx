import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

type TextInputProps = Omit<TextFieldProps, "name" | "value"> & {
  name: string;
  customErrorMessagePath?: string;
};

export default function TextInput(props: TextInputProps) {
  const { t } = useTranslation();
  const { sx, ...propsWithoutStyles } = props;
  const { field, fieldState } = useController({
    name: props.name,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <TextField
        value={field.value}
        onChange={function(e) {
          if (props.type === "number") {
            const parsedNumber = parseInt(e.target.value, 10);
            if (isNaN(parsedNumber)) {
              field.onChange(e.target.value);
            } else {
              field.onChange(parsedNumber);
            }
          } else {
            field.onChange(e);
          }
        }}
        error={!!fieldState.error}
        fullWidth
        {...propsWithoutStyles}
        sx={{
          marginTop: "0.5rem",
          marginBottom: fieldState.error ? "0" : "0.5rem",
          ...sx,
        }}
      ></TextField>
      {fieldState.error && (
        <Typography
          alignSelf={"start"}
          marginBottom={"0.5rem"}
          variant="body2"
          color="error"
        >
          {
            //@ts-ignore
            t(fieldState.error.message)
          }
        </Typography>
      )}
    </Box>
  );
}
