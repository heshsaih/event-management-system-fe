import {
  Button,
  Grid2,
  GridBaseProps,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { z } from "zod";
import useCreateEventStore from "../../../data/useCreateEventStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../components/TextInput";
import Form from "../../../components/Form";
import ControlledDatePicker from "../../../components/ControlledDatePicker";
import dayjs, { Dayjs } from "dayjs";
import FileButton from "../../../components/FileButton";
import ControlledSwitch from "../../../components/ControlledSwitch";
import { readFile } from "./fileReader";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useState } from "react";
import ReadEventDataModal from "../../../file-reading/ReadEventDataModal";
import { CloudUpload } from "@mui/icons-material";

const eventSchema = z
  .object({
    name: z
      .string()
      .min(2, "createEventPage.eventForm.validation.nameTooShort")
      .max(64, "createEventPage.eventForm.validation.nameTooLong"),
    descriptionPL: z
      .string()
      .min(2, "createEventPage.eventForm.validation.descriptionPlTooShort")
      .max(2000, "createEventPage.eventForm.validation.descriptionPlTooLong"),
    descriptionEN: z.string().optional(),
    imageName: z.string().optional(),
    startDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    endDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    registrationStartDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    outsidersAllowed: z.boolean(),
    minutesBetweenSessions: z
      .number()
      .min(
        1,
        "createEventPage.eventForm.validation.minutesBetweenSessionsTooLow",
      ),
  })
  .refine(
    function(e) {
      return !e.startDate.isAfter(e.endDate);
    },
    {
      message: "createEventPage.eventForm.validation.startDateBeforeEndDate",
      path: ["startDate"],
    },
  )
  .refine(
    function(e) {
      return !e.endDate.isBefore(e.startDate);
    },
    {
      message: "createEventPage.eventForm.validation.endDateAfterStartDate",
      path: ["endDate"],
    },
  )
  .refine(
    function(e) {
      const threshold = e.startDate.date(e.startDate.date());
      return e.registrationStartDate.isBefore(threshold);
    },
    {
      message: i18next.t(
        "createEventPage.eventForm.validation.registrationStartDateBeforeStartDate",
      ),
      path: ["registrationStartDate"],
    },
  );

const breakpoints: GridBaseProps["columns"] = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 6,
};

export type CreateEventForm = z.infer<typeof eventSchema>;

type EventFormProps = {
  nextStep: () => void;
};

export default function EventForm(props: EventFormProps) {
  const { t } = useTranslation();
  const [openReadFile, setOpenReadFile] = useState<boolean>(false);
  const state = useCreateEventStore(function(state) {
    return state;
  });

  const a = useForm<CreateEventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: state.name,
      descriptionPL: state.descriptionPL,
      descriptionEN: state.descriptionEN,
      startDate: state.startDate,
      endDate: state.endDate,
      registrationStartDate: state.registrationStartDate,
      outsidersAllowed: state.outsidersAllowed,
      imageName: state.imageName,
      minutesBetweenSessions: state.minutesBetweenSessions,
    },
    mode: "all",
  });

  const submit = a.handleSubmit(function(data) {
    state.updateEvent(data);
    props.nextStep();
  });

  return (
    <StyledContainer inner>
      <Typography variant="h3" marginBottom={4}>
        {t("createEventPage.eventForm.pageHeader")}
      </Typography>
      <FormProvider {...a}>
        <Form onSubmit={submit}>
          <TextInput
            aria-label={t(
              "createEventPage.eventForm.ariaLabels.eventNameInput",
            )}
            name="name"
            label={t("createEventPage.eventForm.labels.eventName")}
          ></TextInput>
          <TextInput
            aria-label={t(
              "createEventPage.eventForm.ariaLabels.eventDescriptionPl",
            )}
            name="descriptionPL"
            multiline
            minRows={6}
            maxRows={8}
            label={t("createEventPage.eventForm.labels.descriptionPl")}
          ></TextInput>
          <TextInput
            aria-label={t(
              "createEventPage.eventForm.ariaLabels.eventDescriptionEn",
            )}
            name="descriptionEN"
            multiline
            minRows={6}
            maxRows={8}
            label={t("createEventPage.eventForm.labels.descriptionEn")}
          ></TextInput>
          <TextInput
            aria-label={t(
              "createEventPage.eventForm.ariaLabels.eventMinutesBetweenSessions",
            )}
            type="number"
            name="minutesBetweenSessions"
            label={t("createEventPage.eventForm.labels.minutesBetweenSessions")}
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
                  "createEventPage.eventForm.ariaLabels.eventStartDate",
                )}
                label={t("createEventPage.eventForm.labels.startDate")}
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
                  "createEventPage.eventForm.ariaLabels.eventEndDate",
                )}
                name="endDate"
                label={t("createEventPage.eventForm.labels.endDate")}
                triggerCallback={function() {
                  a.trigger("startDate");
                  a.trigger("registrationStartDate");
                }}
              ></ControlledDatePicker>
            </Grid2>
          </Grid2>
          <ControlledDatePicker
            aria-label={t(
              "createEventPage.eventForm.ariaLabels.eventRegistrationStartDate",
            )}
            name="registrationStartDate"
            label={t("createEventPage.eventForm.labels.registrationStartDate")}
            maxDate={a.getValues().startDate}
          ></ControlledDatePicker>
          <ControlledSwitch
            aria-label={t(
              "createEventPage.eventForm.ariaLabels.eventOutsidersAllowed",
            )}
            name="outsidersAllowed"
            label={t("createEventPage.eventForm.labels.outsidersAllowed")}
          ></ControlledSwitch>
          <Tooltip
            title={t("createEventPage.eventForm.readFromFileButtonTooltip")}
          >
            <Button
              onClick={() => setOpenReadFile(true)}
              endIcon={<CloudUpload></CloudUpload>}
              aria-label={t(
                "createEventPage.eventForm.ariaLabels.readFromFileButton",
              )}
            >
              {t("createEventPage.eventForm.readFromFileButtonText")}
            </Button>
          </Tooltip>
          <FileButton
            aria-label={t(
              "createEventPage.eventForm.ariaLabels.eventImageButton",
            )}
            callback={function(data) {
              readFile(data, state.setImage);
            }}
          >
            {t("createEventPage.eventForm.imageButtonText")}
          </FileButton>
          {state.image && <Typography>{state.image.name}</Typography>}
          <Tooltip
            title={t("createEventPage.createSessions.nextStepButtonTooltip")}
          >
            <Button
              aria-label={t(
                "createEventPage.eventForm.ariaLabels.eventNextStep",
              )}
              disabled={Object.keys(a.formState.errors).length > 0}
              type="submit"
            >
              {t("createEventPage.eventForm.nextStepButtonText")}
            </Button>
          </Tooltip>
        </Form>
      </FormProvider>
      <ReadEventDataModal
        open={openReadFile}
        onClose={function() {
          setOpenReadFile(false);
        }}
      ></ReadEventDataModal>
    </StyledContainer>
  );
}
