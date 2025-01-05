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
import ConfirmActionModal from "../../../components/ConfirmActionModal";

const breakpoints: GridBaseProps["columns"] = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 6,
};

const updateEventSchema = z
  .object({
    name: z
      .string()
      .min(2, "eventPageManager.updateEventForm.validation.nameTooShort")
      .max(64, "eventPageManager.updateEventForm.validation.nameTooLong"),
    descriptionPl: z
      .string()
      .min(
        2,
        "eventPageManager.updateEventForm.validation.descriptionPlTooShort",
      )
      .max(
        2000,
        "eventPageManager.updateEventForm.validation.descriptionPlTooLong",
      ),
    descriptionEn: z.string().optional(),
    startDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    endDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    registrationStartDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    outsidersAllowed: z.boolean(),
    minutesBetweenSessions: z
      .number()
      .min(
        1,
        "eventPageManager.updateEventForm.validation.minutesBetweenSessionsTooLow",
      ),
    image: z.object({
      imageName: z.string(),
      data: z.string(),
    }),
    signUpTemplateId: z.string().nullable(),
    reminderTemplateId: z.string().nullable(),
    surveyTemplateId: z.string().nullable(),
  })
  .refine(
    function(e) {
      return !e.startDate.isAfter(e.endDate);
    },
    {
      message:
        "eventPageManager.updateEventForm.validation.startDateBeforeEndDate",
      path: ["startDate"],
    },
  )
  .refine(
    function(e) {
      return !e.endDate.isBefore(e.startDate);
    },
    {
      message:
        "eventPageManager.updateEventForm.validation.endDateAfterStartDate",
      path: ["endDate"],
    },
  )
  .refine(
    function(e) {
      return e.registrationStartDate.isBefore(e.startDate);
    },
    {
      message:
        "eventPageManager.updateEventForm.validation.registrationStartDateBeforeStartDate",
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
  const [confrimAction, setConfirmAction] = useState<() => void>();
  const { t } = useTranslation();
  const { id } = useParams();
  const [image, setImage] = useState<{ imageName: string; data: string }>({
    imageName: event?.image.imageName ?? "",
    data: event?.image.data ?? "",
  });
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  useEffect(
    function() {
      async function get() {
        await getEvent(id ?? "");
      }
      get();
    },
    [id],
  );

  useEffect(
    function() {
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
      signUpTemplateId: event?.sessionSignUpManagerEmailTemplateId ?? null,
      reminderTemplateId: event?.sessionReminderManagerEmailTemplateId ?? null,
      surveyTemplateId: event?.surveyManagerEmailTemplateId ?? null,
    },
    mode: "all",
  });

  const submit = a.handleSubmit(function() {
    setConfirmAction(function() {
      return async function() {
        setOpenConfirm(false);
        const result = await updateEvent(
          id ?? "",
          mapUpdateEventSchemaToUpdateEventDto({
            ...a.getValues(),
            image: image,
          }),
        );
        if (result) {
          refresh();
          closeForm();
        }
      };
    });
    setOpenConfirm(true);
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
                    triggerCallback={function() {
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
                    triggerCallback={function() {
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
                triggerCallback={function() {
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
                {t("eventPageManager.updateEventForm.eventImageHeading")}
              </Typography>
              <EventImage data={image.data}></EventImage>
              <Typography variant="body1">{image.imageName}</Typography>
              <FileButton
                aria-label={t(
                  "eventPageManager.updateEventForm.ariaLabels.uploadImageButton",
                )}
                callback={function(e) {
                  readFile(e, function(name, data) {
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
              <Typography variant="h4" marginTop={3}>
                {t("eventPageManager.updateEventForm.activeHeading")}
              </Typography>
              <StyledSwitch
                checked={event.active}
                onChange={function() {
                  setConfirmAction(function() {
                    return async function() {
                      const response = await changeEventActive(
                        event.id,
                        !event.active,
                      );
                      if (response) {
                        refresh();
                      }
                    };
                  });
                  setOpenConfirm(true);
                }}
              ></StyledSwitch>
            </>
          )}
        </Form>
      </FormProvider>
      <ConfirmActionModal
        open={openConfirm}
        onClose={function() {
          setOpenConfirm(false);
        }}
        confirmAction={confrimAction as () => void}
      ></ConfirmActionModal>
    </>
  );
}
