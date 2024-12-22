import { z } from "zod";
import StyledModal from "../../../components/StyledModal";
import useAsyncLocations from "../../../data/useAsyncLocations";
import useAsyncSessionType from "../../../data/useAsyncSessionType";
import useAsyncSpeaker from "../../../data/useAsyncSpeaker";
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSession from "../../../data/useSession";
import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid2,
  GridBaseProps,
  Tooltip,
  Typography,
} from "@mui/material";
import Form from "../../../components/Form";
import ControlledAutocomplete, {
  AutocompleteOption,
} from "../../../components/ControlledAutocomplete";
import useLocation from "../../../data/useLocation";
import TextInput from "../../../components/TextInput";
import { useSessionType } from "../../../data/useSessionType";
import ControlledDateTimePicker from "../../../components/ControlledDateTimePicker";
import { Colors } from "../../../constants/styling";
import useEventBlock from "../../../data/useEventBlock";
import { mapUpdateSessionSchemaToUpdateSessionDto } from "../../../util/converters";
import StyledSwitch from "../../../components/StyledSwitch";
import { useTranslation } from "react-i18next";
import AddLocationForm from "../../../components/AddLocationForm";
import AddRoomForm from "../location-page/AddRoomForm";
import AddSpeakerForm from "../../../components/AddSpeakerForm";
import ConfirmActionModal from "../../../components/ConfirmActionModal";

type UpdateSessionFormProps = {
  eventStartDate: Dayjs;
  eventEndDate: Dayjs;
  eventId: string;
  eventBlocks: AutocompleteOption[];
  sessionId: string;
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

const updateSessionSchema = z
  .object({
    minutesBeforeSignUpCloses: z.number().min(
      1,

      "eventPageManager.updateSessionForm.validation.minutesBeforeSignUpClosesTooLow",
    ),
    sessionName: z
      .string()
      .min(2, "eventPageManager.updateSessionForm.validation.nameTooShort")
      .max(64, "eventPageManager.updateSessionForm.validation.nameTooLong"),
    sessionType: z.object({
      label: z.string(),
      value: z
        .string()
        .min(
          1,
          "eventPageManager.updateSessionForm.validation.sessionTypeRequired",
        ),
    }),
    speaker: z.object({
      label: z.string(),
      value: z
        .string()
        .min(
          1,
          "eventPageManager.updateSessionForm.validation.speakerRequired",
        ),
    }),
    location: z.object({
      label: z.string(),
      value: z
        .string()
        .min(
          1,
          "eventPageManager.updateSessionForm.validation.locationRequired",
        ),
    }),
    room: z.object({
      label: z.string(),
      value: z
        .string()
        .min(1, "eventPageManager.updateSessionForm.validation.roomRequired"),
    }),
    eventBlock: z.object({
      label: z.string(),
      value: z
        .string()
        .min(
          1,
          "eventPageManager.updateSessionForm.validation.eventBlockRequired",
        ),
    }),
    descriptionPl: z
      .string()
      .min(
        2,
        "eventPageManager.updateSessionForm.validation.descriptionPlTooShort",
      )
      .max(
        2000,
        "eventPageManager.updateSessionForm.validation.descriptionPlTooLong",
      ),
    descriptionEn: z
      .string()
      .optional()
      .or(
        z
          .string()
          .min(
            2,
            "eventPageManager.updateSessionForm.validation.descriptionEnTooShort",
          )
          .max(
            2000,
            "eventPageManager.updateSessionForm.validation.descriptionEnTooLong",
          ),
      ),
    startDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    endDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    maxSeats: z
      .number()
      .min(1, "eventPageManager.updateSessionForm.validation.maxSeatsTooLow"),
  })
  .refine(
    function(e) {
      return !e.startDate.isAfter(e.endDate);
    },
    {
      message:
        "eventPageManager.updateSessionForm.validation.startDateBeforeEndDate",
      path: ["startDate"],
    },
  )
  .refine(
    function(e) {
      return !e.endDate.isBefore(e.startDate);
    },
    {
      message:
        "eventPageManager.updateSessionForm.validation.endDateAfterStartDate",
      path: ["endDate"],
    },
  );

export type UpdateSessionSchema = z.infer<typeof updateSessionSchema>;

export default function UpdateSessionForm(props: UpdateSessionFormProps) {
  const {
    session,
    getSession,
    isFetching,
    updateSession,
    isUpdating,
    setSessionActive,
  } = useSession();
  const { t } = useTranslation();
  const a = useForm<UpdateSessionSchema>({
    resolver: zodResolver(updateSessionSchema),
    values: {
      minutesBeforeSignUpCloses: session?.minutesBeforeSignUpCloses ?? 15,
      sessionName: session?.sessionName ?? "",
      sessionType: {
        label: session?.sessionType.name ?? "",
        value: session?.sessionType.id ?? "",
      },
      speaker: {
        label: `${session?.speaker.titleName ?? ""} ${session?.speaker.firstName} ${session?.speaker.lastName}`,
        value: session?.speaker.id ?? "",
      },
      location: {
        label: session?.room.locationName ?? "",
        value: session?.room.locationId ?? "",
      },
      room: {
        label: session?.room.roomNumber ?? "",
        value: session?.room.roomId ?? "",
      },
      eventBlock: {
        label: session?.eventBlock.name ?? "",
        value: session?.eventBlock.id ?? "",
      },
      descriptionPl: session?.descriptionPl ?? "",
      descriptionEn: session?.descriptionEn ?? "",
      startDate: session?.startDate ?? dayjs(),
      endDate: session?.endDate ?? dayjs(),
      maxSeats: session?.maxSeats ?? 1,
    },
  });
  const [roomComponentState, setRoomComponentState] =
    useState<AutocompleteOption>(a.getValues().room);
  const locations = useAsyncLocations();
  const sessionTypes = useAsyncSessionType();
  const speakers = useAsyncSpeaker();
  const { retrieveRoomOptions } = useLocation();
  const { createSessionType } = useSessionType();
  const { createBlock } = useEventBlock();
  const [newSessionType, setNewSessionType] = useState<string>("");
  const [newEventBlock, setNewEventBlock] = useState<string>("");
  const [roomOptions, setRoomOptions] = useState<AutocompleteOption[]>();
  const [chosenLocationId, setChosenLocationId] = useState<string | undefined>(
    session?.room.locationId ? session.room.locationId : undefined,
  );
  const [openLocationForm, setOpenLocationForm] = useState<boolean>(false);
  const [openRoomForm, setOpenRoomForm] = useState<boolean>(false);
  const [openSpeakerForm, setOpenSpeakerForm] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<() => void>();
  const [eventBlockAutocompleteState, setEventBlockAutocompleteState] =
    useState<AutocompleteOption>({
      label: session?.eventBlock.name ?? "",
      value: session?.eventBlock.id ?? "",
    });

  useEffect(
    function() {
      if (props.open) {
        getSession(props.sessionId ?? "");
      }
    },
    [props.open],
  );

  useEffect(
    function() {
      if (session) {
        setChosenLocationId(session.room.locationId);
        locations.setComponentState({
          label: session.room.locationName,
          value: session.room.locationId,
        });
        sessionTypes.setComponentState({
          label: session.sessionType.name,
          value: session.sessionType.id,
        });
        speakers.setComponentState({
          label: `${session.speaker.titleName ?? ""} ${session.speaker.firstName} ${session.speaker.lastName}`,
          value: session.speaker.id,
        });
        setRoomComponentState({
          label: session.room.roomNumber,
          value: session.room.roomId,
        });
        setEventBlockAutocompleteState({
          label: session.eventBlock.name,
          value: session.eventBlock.id,
        });
      }
    },
    [session],
  );

  async function fetchRooms() {
    if (chosenLocationId) {
      setRoomOptions(await retrieveRoomOptions(chosenLocationId));
    } else {
      setRoomOptions(undefined);
    }
  }

  useEffect(
    function() {
      fetchRooms();
    },
    [chosenLocationId],
  );

  const submit = a.handleSubmit(function() {
    setConfirmAction(function() {
      return async function() {
        setOpenConfirm(false);
        const response = await updateSession(
          session?.id ?? "",
          mapUpdateSessionSchemaToUpdateSessionDto(a.getValues()),
        );
        if (response) {
          props.refresh(props.eventId);
          props.onClose();
        }
      };
    });
    setOpenConfirm(true);
  });

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">
          {t("eventPageManager.updateSessionForm.pageHeading")}
        </Typography>
        <Typography variant="h5">
          {t("eventPageManager.updateSessionForm.dataHeading")}
        </Typography>
        {isFetching && (
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        {!isFetching && session && (
          <FormProvider {...a}>
            <Form onSubmit={submit}>
              <TextInput
                autoFocus
                aria-label={t(
                  "eventPageManager.updateSessionForm.ariaLabels.name",
                )}
                label={t("eventPageManager.updateSessionForm.labels.name")}
                name="sessionName"
              ></TextInput>
              <TextInput
                sx={{
                  whiteSpace: "pre",
                }}
                aria-label={t(
                  "eventPageManager.updateSessionForm.ariaLabels.descriptionPl",
                )}
                label={t(
                  "eventPageManager.updateSessionForm.labels.descriptionPl",
                )}
                name="descriptionPl"
                multiline
                minRows={1}
                maxRows={5}
              ></TextInput>
              <TextInput
                aria-label={t(
                  "eventPageManager.updateSessionForm.ariaLabels.descriptionEn",
                )}
                label={t(
                  "eventPageManager.updateSessionForm.labels.descriptionEn",
                )}
                name="descriptionEn"
                multiline
                minRows={1}
                maxRows={5}
              ></TextInput>
              <ControlledAutocomplete
                aria-label={t(
                  "eventPageManager.updateSessionForm.ariaLabels.sessionType",
                )}
                async
                componentState={sessionTypes.componentState}
                setComponentState={sessionTypes.setComponentState}
                loading={sessionTypes.isFetching}
                name={"sessionType"}
                options={sessionTypes.options ?? []}
                label={t(
                  "eventPageManager.updateSessionForm.labels.sessionType",
                )}
                createable
                onCreateCallback={async function() {
                  const result = await createSessionType([
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
                createLabel={t(
                  "eventPageManager.updateSessionForm.createSessionTypeMessage",
                )}
                createValue={crypto.randomUUID()}
                filterCallback={function(phrase) {
                  sessionTypes.setInput(phrase);
                  setNewSessionType(phrase);
                }}
              ></ControlledAutocomplete>
              <ControlledAutocomplete
                aria-label={t(
                  "eventPageManager.updateSessionForm.ariaLabels.eventBlock",
                )}
                createable={true}
                createLabel={t(
                  "eventPageManager.updateSessionForm.createBlockMessage",
                )}
                createValue={crypto.randomUUID()}
                onCreateCallback={async function() {
                  const result = await createBlock([
                    {
                      eventId: props.eventId,
                      name: newEventBlock,
                    },
                  ]);

                  if (result) {
                    props.refresh(props.eventId);
                  }
                }}
                filterCallback={setNewEventBlock}
                async={true}
                componentState={eventBlockAutocompleteState}
                setComponentState={setEventBlockAutocompleteState}
                options={props.eventBlocks}
                name="eventBlock"
                label={t(
                  "eventPageManager.updateSessionForm.labels.eventBlock",
                )}
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
                    aria-label={t(
                      "eventPageManager.updateSessionForm.ariaLabels.location",
                    )}
                    async
                    componentState={locations.componentState}
                    setComponentState={locations.setComponentState}
                    loading={locations.isFetching}
                    name={"location"}
                    options={locations.options ?? []}
                    label={t(
                      "eventPageManager.updateSessionForm.labels.location",
                    )}
                    createable
                    onCreateCallback={function() {
                      setOpenLocationForm(true);
                    }}
                    createLabel={t(
                      "eventPageManager.updateSessionForm.createLocationMessage",
                    )}
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
                    aria-label={t(
                      "eventPageManager.updateSessionForm.ariaLabels.room",
                    )}
                    async
                    componentState={roomComponentState}
                    setComponentState={setRoomComponentState}
                    disabled={!chosenLocationId}
                    name="room"
                    options={roomOptions ?? []}
                    label={t("eventPageManager.updateSessionForm.labels.room")}
                    createable
                    onCreateCallback={function() {
                      setOpenRoomForm(true);
                    }}
                    createLabel={t(
                      "eventPageManager.updateSessionForm.createRoomMessage",
                    )}
                    createValue={crypto.randomUUID()}
                  ></ControlledAutocomplete>
                </Grid2>
              </Grid2>
              <ControlledAutocomplete
                aria-label={t(
                  "eventPageManager.updateSessionForm.ariaLabels.speaker",
                )}
                async
                componentState={speakers.componentState}
                setComponentState={speakers.setComponentState}
                name={"speaker"}
                options={speakers.options ?? []}
                label={t("eventPageManager.updateSessionForm.labels.speaker")}
                createable
                onCreateCallback={function() {
                  setOpenSpeakerForm(true);
                }}
                createLabel={t(
                  "eventPageManager.updateSessionForm.createSpeakerMessage",
                )}
                createValue={crypto.randomUUID()}
                filterCallback={function(phrase) {
                  speakers.setInput(phrase);
                }}
              ></ControlledAutocomplete>
              <TextInput
                aria-label={t(
                  "eventPageManager.updateSessionForm.ariaLabels.maxSeats",
                )}
                label={t("eventPageManager.updateSessionForm.labels.maxSeats")}
                type="number"
                name="maxSeats"
              ></TextInput>
              <TextInput
                aria-label={t(
                  "eventPageManager.updateSessionForm.ariaLabels.minutesBeforeSignUpCloses",
                )}
                label={t(
                  "eventPageManager.updateSessionForm.labels.minutesBeforeSignUpCloses",
                )}
                type="number"
                name="minutesBeforeSignUpCloses"
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
                    aria-label={t(
                      "eventPageManager.updateSessionForm.ariaLabels.startDate",
                    )}
                    minDate={props.eventStartDate}
                    maxDate={props.eventEndDate}
                    label={t(
                      "eventPageManager.updateSessionForm.labels.startDate",
                    )}
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
                    aria-label={t(
                      "eventPageManager.updateSessionForm.ariaLabels.endDate",
                    )}
                    minDate={props.eventStartDate}
                    maxDate={props.eventEndDate}
                    name="endDate"
                    label={t(
                      "eventPageManager.updateSessionForm.labels.endDate",
                    )}
                    triggerCallback={function() {
                      a.trigger(["startDate", "endDate"]);
                    }}
                  ></ControlledDateTimePicker>
                </Grid2>
              </Grid2>
              <Tooltip
                title={t(
                  "eventPageManager.updateSessionForm.saveSessionButtonTooltip",
                )}
              >
                <Button
                  aria-label={t(
                    "eventPageManager.updateSessionForm.ariaLabels.saveSessionButton",
                  )}
                  disabled={Object.keys(a.formState.errors).length > 0}
                  type="submit"
                >
                  {isUpdating ? (
                    <CircularProgress></CircularProgress>
                  ) : (
                    t(
                      "eventPageManager.updateSessionForm.saveSessionButtonText",
                    )
                  )}
                </Button>
              </Tooltip>
              <Typography variant="h5">
                {t("eventPageManager.updateSessionForm.activeHeading")}
              </Typography>
              <StyledSwitch
                aria-label={t(
                  "eventPageManager.updateSessionForm.ariaLabels.active",
                )}
                checked={session.active}
                onChange={function() {
                  setConfirmAction(function() {
                    return async function() {
                      setOpenConfirm(false);
                      const response = await setSessionActive(
                        session.id,
                        !session.active,
                      );
                      if (response) {
                        getSession(props.sessionId);
                      }
                    };
                  });
                  setOpenConfirm(true);
                }}
              ></StyledSwitch>
            </Form>
          </FormProvider>
        )}
        <AddLocationForm
          open={openLocationForm}
          setOpen={setOpenLocationForm}
          fetchLocations={function() {
            locations.setInput("");
          }}
        ></AddLocationForm>
        <AddRoomForm
          open={openRoomForm}
          onClose={function() {
            setOpenRoomForm(false);
          }}
          locationId={chosenLocationId as string}
        ></AddRoomForm>
        <AddSpeakerForm
          open={openSpeakerForm}
          onClose={function() {
            setOpenSpeakerForm(false);
          }}
        ></AddSpeakerForm>
        <ConfirmActionModal
          open={openConfirm}
          onClose={function() {
            setOpenConfirm(false);
          }}
          confirmAction={confirmAction as () => void}
        ></ConfirmActionModal>
      </>
    </StyledModal>
  );
}
