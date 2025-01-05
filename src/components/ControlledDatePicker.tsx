import { Typography } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

type ControlledDatePickerProps = Omit<
  DatePickerProps<Dayjs>,
  "name" | "value"
> & {
  name: string;
  triggerCallback?: () => void;
};

export default function ControlledDatePicker(props: ControlledDatePickerProps) {
  const { name, sx, ...rest } = props;
  const { field, fieldState } = useController({
    name: name,
  });
  const { t } = useTranslation();

  return (
    <>
      <DatePicker
        closeOnSelect={false}
        value={field.value}
        onChange={function(e) {
          field.onChange(e ? e : dayjs());
          if (props.triggerCallback) {
            props.triggerCallback();
          }
        }}
        format="DD.MM.YYYY"
        sx={{
          margin: "0.5rem",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
          ...sx,
        }}
        slotProps={{
          textField: {
            error: !!fieldState.error,
            onKeyDown: function(e) {
              if (e.key !== "Tab") {
                e.preventDefault();
              }
            },
            size: "small",
          },
        }}
        {...rest}
      ></DatePicker>
      {fieldState.error && (
        <Typography
          textAlign={"center"}
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
    </>
  );
}
