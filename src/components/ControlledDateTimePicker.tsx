import { Typography } from "@mui/material";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

type ControlledDateTimePickerProps = Omit<
  DateTimePickerProps<Dayjs>,
  "name" | "value"
> & {
  name: string;
  triggerCallback?: () => void;
};

export default function ControlledDateTimePicker(
  props: ControlledDateTimePickerProps,
) {
  const { name, sx, ...rest } = props;
  const { field, fieldState } = useController({
    name: name,
  });
  const { t } = useTranslation();

  return (
    <>
      <DateTimePicker
        closeOnSelect={false}
        localeText={{
          month: "",
        }}
        value={field.value}
        ampm={false}
        onChange={function(e) {
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
              if (e.key !== "Tab") {
                e.preventDefault();
              }
            },
            size: "small",
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
          {
            //@ts-ignore
            t(fieldState.error.message)
          }
        </Typography>
      )}
    </>
  );
}
