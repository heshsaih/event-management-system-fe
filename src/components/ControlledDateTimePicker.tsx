import { Typography } from "@mui/material";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useController } from "react-hook-form";

type ControlledDateTimePickerProps = Omit<
  DateTimePickerProps<Dayjs>,
  "name" | "value"
> & {
  name: string;
  triggerCallback?: () => void;
};

export default function ControlledDateTimePicker(
  props: ControlledDateTimePickerProps
) {
  const { name, sx, ...rest } = props;
  const { field, fieldState } = useController({
    name: name,
  });

  return (
    <>
      <DateTimePicker
        closeOnSelect={false}
        localeText={{
          month: ""
        }}
        value={field.value}
        ampm={false}
        onChange={function (e) {
          field.onChange(e ? e : dayjs());
          if (rest.triggerCallback) {
            rest.triggerCallback();
          }
        }}
        format="DD.MM.YYYY HH:mm"
        sx={{
          margin: "0.5rem",
          ...sx,
        }}
        slotProps={{
          textField: {
            error: !!fieldState.error,
            onKeyDown: function(e) {
              e.preventDefault();
            },
            size: "small"
          },
        }}
        {...rest}
      ></DateTimePicker>
      {fieldState.error && (
        <Typography
          marginBottom={"0.5rem"}
          variant="body2"
          textAlign={"center"}
          color="error"
        >
          {fieldState.error.message}
        </Typography>
      )}
    </>
  );
}
