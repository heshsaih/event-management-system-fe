import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import useEvent from "../../../data/useEvent";
import Form from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  GridBaseProps,
  Tooltip,
  Typography,
} from "@mui/material";
import ControlledDatePicker from "../../../components/ControlledDatePicker";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Colors } from "../../../constants/styling";
import EventImage from "../../../components/EventImage";
import FileButton from "../../../components/FileButton";
import { readFile } from "../create-event-page/fileReader";
import { mapUpdateEventSchemaToUpdateEventDto } from "../../../util/converters";
import ControlledSwitch from "../../../components/ControlledSwitch";
import StyledSwitch from "../../../components/StyledSwitch";
import { useTranslation } from "react-i18next";

const breakpoints: GridBaseProps["columns"] = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 6,
};

const updateEventSchema = z
  .object({
    name: z.string().min(1),
    descriptionPl: z.string().min(1),
    descriptionEn: z.string().optional(),
    startDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    endDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    registrationStartDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    outsidersAllowed: z.boolean(),
    minutesBetweenSessions: z.number().min(1),
    image: z.object({
      imageName: z.string(),
      data: z.string(),
    }),
  })
  .refine(
    function (e) {
      return !e.startDate.isAfter(e.endDate);
    },
    {
      message: "Data rozpoczęcia musi być przed datą zakończenia",
      path: ["startDate"],
    },
  )
  .refine(
    function (e) {
      return !e.endDate.isBefore(e.startDate);
    },
    {
      message: "Data zakończenia musi być po dacie rozpoczęcia",
      path: ["endDate"],
    },
  )
  .refine(
    function (e) {
      return e.registrationStartDate.isBefore(e.startDate);
    },
    {
      message:
        "Data rozpoczęcia zapisów musi być przed rozpoczęciem wydarzenia",
      path: ["registrationStartDate"],
    },
  );

export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
type UpdateEventForm = {
  refresh: () => void;
  closeForm: () => void;
};

export default function UpdateEventForm({
  refresh,
  closeForm,
}: UpdateEventForm) {
  const {
    event,
    getEvent,
    isFetching,
    updateEvent,
    isUpdating,
    changeEventActive,
  } = useEvent();
  const { t } = useTranslation();
  const { id } = useParams();
  const [image, setImage] = useState<{ imageName: string; data: string }>({
    imageName: event?.image.imageName ?? "",
    data: event?.image.data ?? "",
  });

  useEffect(
    function () {
      async function get() {
        await getEvent(id ?? "");
      }
      get();
    },
    [id],
  );

  useEffect(
    function () {
      setImage(
        event?.image || {
          imageName: "",
          data: "",
        },
      );
    },
    [event],
  );

  const a = useForm<UpdateEventSchema>({
    resolver: zodResolver(updateEventSchema),
    values: {
      name: event?.name ?? "",
      descriptionPl: event?.descriptionPl ?? "",
      descriptionEn: event?.descriptionEn,
      startDate: event?.startDate ?? dayjs(),
      endDate: event?.endDate ?? dayjs(),
      registrationStartDate: event?.registrationStartDate ?? dayjs(),
      outsidersAllowed: event?.outsidersAllowed ?? true,
      minutesBetweenSessions: event?.minutesBetweenDifferentSessions ?? 1,
      image: {
        imageName: event?.image.imageName ?? "",
        data: event?.image.data ?? "",
      },
    },
    mode: "all",
  });

  const submit = a.handleSubmit(async function (data) {
    const result = await updateEvent(
      id ?? "",
      mapUpdateEventSchemaToUpdateEventDto({
        ...data,
        image: image,
      }),
    );
    if (result) {
      refresh();
      closeForm();
    }
  });

  return (
    <>
      <Typography variant="h4">
        {t("eventPageManager.updateEventForm.pageHeading")}
      </Typography>
      <Typography variant="h5">
        {t("eventPageManager.updateEventForm.eventDataHeading")}
      </Typography>
      <FormProvider {...a}>
        <Form onSubmit={submit}>
          {isFetching && (
            <CircularProgress
              size={"3rem"}
              sx={{ color: Colors.RED }}
            ></CircularProgress>
          )}
          {!isFetching && event && (
            <>
              <TextInput
                aria-label={t(
                  "eventPageManager.updateEventForm.ariaLabels.name",
                )}
                name="name"
                label={t("eventPageManager.updateEventForm.labels.name")}
              ></TextInput>
              <TextInput
                multiline
                minRows={6}
                maxRows={8}
                name="descriptionPl"
                aria-label={t(
                  "eventPageManager.updateEventForm.ariaLabels.descriptionPl",
                )}
                label={t(
                  "eventPageManager.updateEventForm.labels.descriptionPl",
                )}
              ></TextInput>
              <TextInput
                multiline
                minRows={6}
                maxRows={8}
                name="descriptionEn"
                label={t(
                  "eventPageManager.updateEventForm.labels.descriptionEn",
                )}
                aria-label={t(
                  "eventPageManager.updateEventForm.ariaLabels.descriptionEn",
                )}
              ></TextInput>
              <TextInput
                type="number"
                name="minutesBetweenSessions"
                label={t(
                  "eventPageManager.updateEventForm.labels.minutesBetweenSessions",
                )}
                aria-label={t(
                  "eventPageManager.updateEventForm.ariaLabels.minutesBetweenSessions",
                )}
              ></TextInput>
              <Grid2 container>
                <Grid2
                  size={breakpoints}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <ControlledDatePicker
                    aria-label={t(
                      "eventPageManager.updateEventForm.ariaLabels.startDate",
                    )}
                    label={t(
                      "eventPageManager.updateEventForm.labels.startDate",
                    )}
                    name="startDate"
                    triggerCallback={function () {
                      a.trigger("endDate");
                      a.trigger("registrationStartDate");
                    }}
                  ></ControlledDatePicker>
                </Grid2>
                <Grid2
                  size={breakpoints}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <ControlledDatePicker
                    aria-label={t(
                      "eventPageManager.updateEventForm.ariaLabels.endDate",
                    )}
                    name="endDate"
                    label={t("eventPageManager.updateEventForm.labels.endDate")}
                    minDate={a.getValues().startDate.add(1, "day")}
                    triggerCallback={function () {
                      a.trigger("startDate");
                      a.trigger("registrationStartDate");
                    }}
                  ></ControlledDatePicker>
                </Grid2>
              </Grid2>
              <ControlledDatePicker
                aria-label={t(
                  "eventPageManager.updateEventForm.ariaLabels.registrationStartDate",
                )}
                label={t(
                  "eventPageManager.updateEventForm.labels.registrationStartDate",
                )}
                name="registrationStartDate"
                maxDate={a.getValues().startDate.subtract(1, "day")}
                triggerCallback={function () {
                  a.trigger("endDate");
                  a.trigger("registrationStartDate");
                }}
              ></ControlledDatePicker>
              <ControlledSwitch
                name="outsidersAllowed"
                label={t(
                  "eventPageManager.updateEventForm.labels.outsidersAllowed",
                )}
                aria-label={t(
                  "eventPageManager.updateEventForm.ariaLabels.outsidersAllowed",
                )}
              ></ControlledSwitch>
              <Typography variant="h5" marginTop={3}>
                {t("eventPageManager.updateEventForm.activeHeading")}
              </Typography>
              <StyledSwitch
                checked={event.active}
                onChange={async function () {
                  const response = await changeEventActive(
                    event.id,
                    !event.active,
                  );
                  if (response) {
                    refresh();
                  }
                }}
              ></StyledSwitch>
              <Typography variant="h5" marginTop={3}>
                {t("eventPageManager.updateEventForm.eventImageHeading")}
              </Typography>
              <EventImage data={image.data}></EventImage>
              <Typography variant="body1">{image.imageName}</Typography>
              <FileButton
                aria-label={t(
                  "eventPageManager.updateEventForm.ariaLabels.uploadImageButton",
                )}
                callback={function (e) {
                  readFile(e, function (name, data) {
                    setImage({
                      imageName: name,
                      data: data,
                    });
                  });
                }}
              >
                {t("eventPageManager.updateEventForm.uploadImageButtonText")}
              </FileButton>
              <Box>
                <Tooltip
                  title={t(
                    "eventPageManager.updateEventForm.uploadImageButtonTooltip",
                  )}
                >
                  <Button
                    aria-label={t(
                      "eventPageManager.updateEventForm.ariaLabels.submitButton",
                    )}
                    type="submit"
                    disabled={Object.keys(a.formState.errors).length > 0}
                  >
                    {isUpdating ? (
                      <CircularProgress></CircularProgress>
                    ) : (
                      t("eventPageManager.updateEventForm.submitButtonText")
                    )}
                  </Button>
                </Tooltip>
                <Tooltip
                  title={t(
                    "eventPageManager.updateEventForm.cancelButtonTooltip",
                  )}
                >
                  <Button
                    onClick={closeForm}
                    aria-label={t(
                      "eventPageManager.updateEventForm.ariaLabels.cancelButton",
                    )}
                  >
                    {t("eventPageManager.updateEventForm.cancelButtonText")}
                  </Button>
                </Tooltip>
              </Box>
            </>
          )}
        </Form>
      </FormProvider>
    </>
  );
}
