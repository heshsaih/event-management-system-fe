import dayjs, { Dayjs } from "dayjs";
import ControlledAutocomplete, {
  AutocompleteOption,
} from "./ControlledAutocomplete";
import {
  Button,
  CircularProgress,
  Grid2,
  GridBaseProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { z } from "zod";
import useSession from "../data/useSession";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useAsyncLocations from "../data/useAsyncLocations";
import useAsyncSessionType from "../data/useAsyncSessionType";
import useAsyncSpeaker from "../data/useAsyncSpeaker";
import { useSessionType } from "../data/useSessionType";
import useLocation from "../data/useLocation";
import StyledModal from "./StyledModal";
import TextInput from "./TextInput";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import ControlledDateTimePicker from "./ControlledDateTimePicker";
import useEventBlock from "../data/useEventBlock";
import { mapAddSessionSchemaToCreateSessionDto } from "../util/converters";
import { useTranslation } from "react-i18next";
import useAsyncEventBlock from "../data/useAsyncEventBlock";

type AddSessionFormProps = {
  eventStartDate: Dayjs;
  eventEndDate: Dayjs;
  eventId: string;
  open: boolean;
  onClose: () => void;
  refresh: (id: string) => void;
};

const breakpoints: GridBaseProps["columns"] = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 6,
};

const addSessionSchema = z
  .object({
    sessionName: z.string().min(1),
    sessionType: z.object({
      label: z.string(),
      value: z.string().min(1),
    }),
    speaker: z.object({
      label: z.string(),
      value: z.string().min(1),
    }),
    location: z.object({
      label: z.string(),
      value: z.string().min(1),
    }),
    room: z.object({
      label: z.string(),
      value: z.string().min(1),
    }),
    eventBlock: z.object({
      label: z.string(),
      value: z.string().min(1),
    }),
    descriptionPl: z.string().min(1),
    descriptionEn: z.string().optional(),
    startDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    endDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    maxSeats: z.number().min(1),
  })
  .refine(
    function(e) {
      return !e.startDate.isAfter(e.endDate);
    },
    {
      message: "Data rozpoczęcia musi być przed datą zakończenia",
      path: ["startDate"],
    },
  )
  .refine(
    function(e) {
      return !e.endDate.isBefore(e.startDate);
    },
    {
      message: "Data zakończenia musi być po dacie rozpoczęcia",
      path: ["endDate"],
    },
  );

export type AddSessionSchema = z.infer<typeof addSessionSchema>;

export default function AddSessionForm(props: AddSessionFormProps) {
  const { t } = useTranslation();
  const a = useForm<AddSessionSchema>({
    resolver: zodResolver(addSessionSchema),
    values: {
      sessionName: "",
      sessionType: {
        label: "",
        value: "",
      },
      speaker: {
        label: "",
        value: "",
      },
      location: {
        label: "",
        value: "",
      },
      room: {
        label: "",
        value: "",
      },
      eventBlock: {
        label: "",
        value: "",
      },
      descriptionPl: "",
      descriptionEn: "",
      startDate: props.eventStartDate,
      endDate: props.eventStartDate.add(1, "day"),
      maxSeats: 1,
    },
  });
  const sessionHook = useSession();
  const eventBlockHook = useEventBlock();
  const [roomComponentState, setRoomComponentState] =
    useState<AutocompleteOption>(a.getValues().room);
  const [newEventBlock, setNewEventBlock] = useState<string>("");
  const locations = useAsyncLocations();
  const sessionTypes = useAsyncSessionType();
  const speakers = useAsyncSpeaker();
  const locationHook = useLocation();
  const eventBlocks = useAsyncEventBlock(props.eventId);
  const sessionTypeHook = useSessionType();
  const [newSessionType, setNewSessionType] = useState<string>("");
  const [roomOptions, setRoomOptions] = useState<AutocompleteOption[]>();
  const [chosenLocationId, setChosenLocationId] = useState<string>();
  const navigate = useNavigate();

  useEffect(
    function() {
      async function setState() {
        if (chosenLocationId) {
          setRoomOptions(
            await locationHook.retrieveRoomOptions(chosenLocationId),
          );
        } else {
          setRoomOptions(undefined);
        }
      }
      setState();
    },
    [chosenLocationId],
  );

  const submit = a.handleSubmit(async function(data) {
    const response = await sessionHook.createSession([
      mapAddSessionSchemaToCreateSessionDto({
        ...data,
        eventId: props.eventId,
      }),
    ]);

    if (response) {
      props.refresh(props.eventId);
      props.onClose();
    }
  });

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">{t("addSessionForm.pageHeading")}</Typography>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <TextInput
              autoFocus
              aria-label={t("addSessionForm.ariaLabels.name")}
              label={t("addSessionForm.labels.name")}
              name="sessionName"
            ></TextInput>
            <TextInput
              aria-label={t("addSessionForm.ariaLabels.descriptionPl")}
              label={t("addSessionForm.labels.descriptionPl")}
              name="descriptionPl"
              multiline
              minRows={1}
              maxRows={5}
            ></TextInput>
            <TextInput
              aria-label={t("addSessionForm.ariaLabels.descriptionEn")}
              label={t("addSessionForm.labels.descriptionEn")}
              name="descriptionEn"
              multiline
              minRows={1}
              maxRows={5}
            ></TextInput>
            <ControlledAutocomplete
              async
              disabled={sessionTypeHook.isCreating}
              componentState={sessionTypes.componentState}
              setComponentState={sessionTypes.setComponentState}
              loading={sessionTypes.isFetching}
              name={"sessionType"}
              options={sessionTypes.options ?? []}
              label={t("addSessionForm.labels.sessionType")}
              aria-label={t("addSessionForm.ariaLabels.sessionType")}
              createable
              onCreateCallback={async function() {
                const result = await sessionTypeHook.createSessionType([
                  {
                    name: newSessionType,
                  },
                ]);

                if (result) {
                  sessionTypes.setComponentState({
                    label: "",
                    value: "",
                  });
                }
              }}
              createLabel={t("addSessionForm.sessionTypeCreateLabel")}
              createValue={crypto.randomUUID()}
              filterCallback={function(phrase) {
                sessionTypes.setInput(phrase);
                setNewSessionType(phrase);
              }}
            ></ControlledAutocomplete>
            <ControlledAutocomplete
              disabled={eventBlockHook.isCreating}
              createable={true}
              createLabel={t("addSessionForm.eventBlockCreateLabel")}
              createValue={crypto.randomUUID()}
              onCreateCallback={async function() {
                const response = await eventBlockHook.createBlock([
                  {
                    eventId: props.eventId,
                    name: newEventBlock,
                  },
                ]);

                if (response) {
                  eventBlocks.setComponentState({
                    label: response.name,
                    value: response.id
                  });
                  setNewEventBlock("");
                }
              }}
              filterCallback={function(phrase) {
                eventBlocks.setInput(phrase);
                setNewEventBlock(phrase);
              }}
              async={false}
              options={eventBlocks.options ?? []}
              name="eventBlock"
              label={t("addSessionForm.labels.eventBlock")}
              aria-label={t("addSessionForm.ariaLabels.eventBlock")}
            ></ControlledAutocomplete>
            <Grid2 container width={"100%"}>
              <Grid2
                size={breakpoints}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ControlledAutocomplete
                  async
                  componentState={locations.componentState}
                  setComponentState={locations.setComponentState}
                  loading={locations.isFetching}
                  name={"location"}
                  options={locations.options ?? []}
                  label={t("addSessionForm.labels.location")}
                  aria-label={t("addSessionForm.ariaLabels.location")}
                  createable
                  onCreateCallback={function() {
                    navigate("/manager/locations");
                  }}
                  createLabel={t("addSessionForm.locationCreateLabel")}
                  createValue={crypto.randomUUID()}
                  onChangeCallback={function(id) {
                    setChosenLocationId(id);
                    setRoomComponentState({
                      label: "",
                      value: "",
                    });
                    a.setValue("room", {
                      label: "",
                      value: "",
                    });
                  }}
                  filterCallback={function(phrase) {
                    locations.setInput(phrase);
                  }}
                ></ControlledAutocomplete>
              </Grid2>
              <Grid2
                size={breakpoints}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ControlledAutocomplete
                  async
                  componentState={roomComponentState}
                  setComponentState={setRoomComponentState}
                  disabled={!chosenLocationId}
                  name="room"
                  options={roomOptions ?? []}
                  label={t("addSessionForm.labels.room")}
                  aria-label={t("addSessionForm.ariaLabels.room")}
                  createable
                  onCreateCallback={function() {
                    navigate(`/manager/locations/${chosenLocationId}`);
                  }}
                  createLabel={t("addSessionForm.roomCreateLabel")}
                  createValue={crypto.randomUUID()}
                ></ControlledAutocomplete>
              </Grid2>
            </Grid2>
            <ControlledAutocomplete
              async
              componentState={speakers.componentState}
              setComponentState={speakers.setComponentState}
              name={"speaker"}
              options={speakers.options ?? []}
              label={t("addSessionForm.labels.speaker")}
              aria-label={t("addSessionForm.ariaLabels.speaker")}
              createable
              onCreateCallback={function() {
                navigate("/manager/speakers");
              }}
              createLabel={t("addSessionForm.speakerCreateLabel")}
              createValue={crypto.randomUUID()}
              filterCallback={function(phrase) {
                speakers.setInput(phrase);
              }}
            ></ControlledAutocomplete>
            <TextInput
              aria-label={t("addSessionForm.ariaLabels.maxSeats")}
              label={t("addSessionForm.labels.maxSeats")}
              type="number"
              name="maxSeats"
            ></TextInput>
            <Grid2 container>
              <Grid2
                size={breakpoints}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ControlledDateTimePicker
                  aria-label={t("addSessionForm.ariaLabels.startDate")}
                  minDate={props.eventStartDate}
                  maxDate={props.eventEndDate}
                  label={t("addSessionForm.labels.startDate")}
                  name="startDate"
                  triggerCallback={function() {
                    a.trigger(["startDate", "endDate"]);
                  }}
                ></ControlledDateTimePicker>
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
                <ControlledDateTimePicker
                  aria-label={t("addSessionForm.ariaLabels.endDate")}
                  minDate={props.eventStartDate}
                  maxDate={props.eventEndDate}
                  name="endDate"
                  label={t("addSessionForm.labels.endDate")}
                  triggerCallback={function() {
                    a.trigger(["startDate", "endDate"]);
                  }}
                ></ControlledDateTimePicker>
              </Grid2>
            </Grid2>
            <Tooltip title={t("addSessionForm.submitButtonTooltip")}>
              <Button
                aria-label={t("addSessionForm.ariaLabels.submitButton")}
                disabled={Object.keys(a.formState.errors).length > 0}
                type="submit"
              >
                {sessionHook.isCreating ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  t("addSessionForm.sutmitButtonText")
                )}
              </Button>
            </Tooltip>
          </Form>
        </FormProvider>
      </>
    </StyledModal>
  );
}
