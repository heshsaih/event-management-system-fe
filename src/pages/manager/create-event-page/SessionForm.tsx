import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import useCreateEventStore from "../../../data/useCreateEventStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Grid2,
  GridBaseProps,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorIcon from "@mui/icons-material/Error";
import dayjs, { Dayjs } from "dayjs";
import Form from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import ControlledDateTimePicker from "../../../components/ControlledDateTimePicker";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Styling, Colors } from "../../../constants/styling";
import { ADD_BLOCK_MESSAGE } from "../../../constants/session";
import useLocation from "../../../data/useLocation";
import ControlledAutocomplete, {
  AutocompleteOption,
} from "../../../components/ControlledAutocomplete";
import useAsyncLocations from "../../../data/useAsyncLocations";
import useAsyncSpeaker from "../../../data/useAsyncSpeaker";
import useAsyncSessionType from "../../../data/useAsyncSessionType";
import { useSessionType } from "../../../data/useSessionType";
import { useTranslation } from "react-i18next";
import ConfirmActionModal from "../../../components/ConfirmActionModal";
import i18next from "i18next";

const sessionSchema = z
  .object({
    minutesBeforeSignUpCloses: z
      .number()
      .min(
        1,
        i18next.t(
          "createEventPage.sessionForm.validation.minuteBeforeSignUpCloseTooLow",
        ),
      ),
    name: z
      .string()
      .min(3, i18next.t("createEventPage.sessionForm.validation.nameTooShort"))
      .max(64, i18next.t("createEventPage.sessionForm.validation.nameTooLong")),
    descriptionPL: z
      .string()
      .min(
        3,
        i18next.t(
          "createEventPage.sessionForm.validation.descriptionPlTooShort",
        ),
      )
      .max(
        2000,
        i18next.t(
          "createEventPage.sessionForm.validation.descriptionPlTooLong",
        ),
      ),
    descriptionEN: z
      .string()
      .optional()
      .or(
        z
          .string()
          .min(
            2,
            i18next.t(
              "createEventPage.sessionForm.validation.descriptionEnTooShort",
            ),
          )
          .max(
            2000,
            i18next.t(
              "createEventPage.sessionForm.validation.descriptionEnTooLong",
            ),
          ),
      ),
    startTime: z.instanceof(dayjs as unknown as typeof Dayjs),
    endTime: z.instanceof(dayjs as unknown as typeof Dayjs),
    sessionBlock: z
      .string()
      .min(
        1,
        i18next.t("createEventPage.sessionForm.validation.eventBlockRequired"),
      ),
    maxSeats: z
      .number({
        message: i18next.t(
          "createEventPage.sessionForm.validation.maxSeatsTooLow",
        ),
      })
      .min(
        1,
        i18next.t("createEventPage.sessionForm.validation.maxSeatsTooLow"),
      ),
    location: z.object({
      label: z.string(),
      value: z
        .string()
        .min(
          1,
          i18next.t("createEventPage.sessionForm.validation.locationRequired"),
        ),
    }),
    room: z.object({
      label: z.string(),
      value: z
        .string()
        .min(
          1,
          i18next.t("createEventPage.sessionForm.validation.roomRequired"),
        ),
    }),
    speaker: z.object({
      label: z.string(),
      value: z
        .string()
        .min(
          1,
          i18next.t("createEventPage.sessionForm.validation.speakerRequired"),
        ),
    }),
    sessionType: z.object({
      label: z.string(),
      value: z
        .string()
        .min(
          1,
          i18next.t(
            "createEventPage.sessionForm.validation.sessionTypeRequired",
          ),
        ),
    }),
  })
  .refine(
    function(e) {
      return !e.startTime.isAfter(e.endTime);
    },
    {
      message: i18next.t(
        "createEventPage.sessionForm.validation.startDateBeforeEndDate",
      ),
      path: ["startTime"],
    },
  )
  .refine(
    function(e) {
      return !e.endTime.isBefore(e.startTime);
    },
    {
      message: i18next.t(
        "createEventPage.sessionForm.validation.endDateAfterStartDate",
      ),
      path: ["endTime"],
    },
  );

export type CreateSessionForm = z.infer<typeof sessionSchema> & {
  id: string;
};

type SessionFormProps = {
  id: string;
  openLocationForm: () => void;
  openRoomForm: () => void;
  openSpeakerForm: () => void;
  setChosenLocation: (id: string) => void;
  handleListChange: () => void;
  addError: (id: string) => void;
  removeError: (id: string) => void;
  setRetrieveRooms: (func: () => void) => void;
};

const breakpoints: GridBaseProps["columns"] = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 6,
};

export default function SessionForm({
  id,
  handleListChange,
  addError,
  removeError,
  openLocationForm,
  openRoomForm,
  setChosenLocation,
  setRetrieveRooms,
  openSpeakerForm,
}: SessionFormProps) {
  const { t } = useTranslation();
  const { retrieveRoomOptions } = useLocation();
  const [newOption, setNewOption] = useState<string>("");
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const state = useCreateEventStore(function(state) {
    return state;
  });
  const [openConfirmAction, setOpenConfirmAction] = useState<boolean>(false);
  const [confirmActionFunction, setConfirmActionFunction] =
    useState<() => void>();
  const session = state.sessions.find(function(e) {
    return e.id === id;
  }) as CreateSessionForm;
  const a = useForm<CreateSessionForm>({
    resolver: zodResolver(sessionSchema),
    values: {
      name: session.name,
      descriptionPL: session.descriptionPL,
      descriptionEN: session.descriptionEN,
      startTime: session.startTime,
      endTime: session.endTime,
      maxSeats: session.maxSeats,
      id: session.id,
      sessionBlock: session.sessionBlock,
      location: session.location,
      room: session.room,
      speaker: session.speaker,
      sessionType: session.sessionType,
      minutesBeforeSignUpCloses: session.minutesBeforeSignUpCloses ?? 1,
    },
    mode: "all",
  });
  const locations = useAsyncLocations(session.location);
  const speakers = useAsyncSpeaker(session.speaker);
  const sessionTypes = useAsyncSessionType(session.sessionType);
  const [newSessionType, setNewSessionType] = useState<string>("");
  const { createSessionType } = useSessionType();
  const [roomOptions, setRoomOptions] = useState<AutocompleteOption[]>();
  const [chosenLocationId, setChosenLocationId] = useState<string | undefined>(
    session.location.value.length > 0 ? session.location.value : undefined,
  );
  const [roomComponentState, setRoomComponentState] =
    useState<AutocompleteOption>(session.room);

  useEffect(
    function() {
      async function setState() {
        if (chosenLocationId) {
          setRoomOptions(await retrieveRoomOptions(chosenLocationId));
        } else {
          setRoomOptions(undefined);
        }
      }
      setState();
    },
    [chosenLocationId],
  );

  const openAccordion = function() {
    setAccordionOpen(true);
    const currentRect = ref.current?.getBoundingClientRect() as DOMRect;
    const scrollValue = currentRect.top + window.scrollY - 200;
    window.scrollTo({
      top: scrollValue,
      behavior: "smooth",
    });
  };

  const closeAccordion = function() {
    setAccordionOpen(false);
    handleListChange();
  };

  useEffect(function() {
    a.trigger();
  }, []);

  useEffect(
    function() {
      if (Object.keys(a.formState.errors).length > 0) {
        addError(id);
      } else {
        removeError(id);
      }
    },
    [a.formState.errors],
  );

  const submit = a.handleSubmit(function(data) {
    setConfirmActionFunction(function() {
      return function() {
        state.updateSession({
          ...data,
          id: id,
        });
        toast.success(t("createEventPage.sessionForm.updateSessionSuccess"));
      };
    });
    setOpenConfirmAction(true);
  });

  const remove = function() {
    setConfirmActionFunction(function() {
      return function() {
        closeAccordion();
        removeError(id);
        state.removeSession(session.id);
        handleListChange();
        toast.success(t("createEventPage.sessionForm.removeSessionSuccess"));
      };
    });
    setOpenConfirmAction(true);
  };

  return (
    <Accordion
      sx={{
        boxShadow: 0,
        "&:before": { display: "none" },
        width: "100%",
        margin: "0.5rem",
        borderRadius: Styling.BORDER_RADIUS,
        border: `1px solid ${Colors.GREY_BORDER}`,
      }}
      expanded={accordionOpen}
      onChange={accordionOpen ? closeAccordion : openAccordion}
      ref={ref}
    >
      <AccordionSummary
        expandIcon={
          <>
            {Object.keys(a.formState.errors).length > 0 && (
              <ErrorIcon color="primary"></ErrorIcon>
            )}
            <ExpandMoreIcon></ExpandMoreIcon>
          </>
        }
      >
        <Typography fontSize={Styling.HEADING_SIZE}>
          {session.name
            ? session.name
            : t("createEventPage.sessionForm.sessionNamePlaceholder")}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <TextInput
              focused={accordionOpen}
              aria-label={t(
                "createEventPage.sessionForm.ariaLabels.sessionName",
              )}
              label={t("createEventPage.sessionForm.labels.sessionName")}
              name="name"
            ></TextInput>
            <TextInput
              aria-label={t(
                "createEventPage.sessionForm.ariaLabels.descriptionPl",
              )}
              label={t("createEventPage.sessionForm.labels.descriptionPl")}
              name="descriptionPL"
              multiline
              minRows={1}
              maxRows={5}
            ></TextInput>
            <TextInput
              aria-label={t(
                "createEventPage.sessionForm.ariaLabels.descriptionEn",
              )}
              label={t("createEventPage.sessionForm.labels.descriptionEn")}
              name="descriptionEN"
              multiline
              minRows={1}
              maxRows={5}
            ></TextInput>
            <ControlledAutocomplete
              aria-label={t(
                "createEventPage.sessionForm.ariaLabels.sessionType",
              )}
              async
              componentState={sessionTypes.componentState}
              setComponentState={sessionTypes.setComponentState}
              loading={sessionTypes.isFetching}
              name={"sessionType"}
              options={sessionTypes.options ?? []}
              label={t("createEventPage.sessionForm.labels.sessionType")}
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
                "createEventPage.sessionForm.sessionTypeCreateMessage",
              )}
              createValue={crypto.randomUUID()}
              filterCallback={function(phrase) {
                sessionTypes.setInput(phrase);
                setNewSessionType(phrase);
              }}
            ></ControlledAutocomplete>
            <Autocomplete
              aria-label={t(
                "createEventPage.sessionForm.ariaLabels.eventBlock",
              )}
              fullWidth
              size="small"
              sx={{
                marginY: "0.5rem",
              }}
              value={a.getValues().sessionBlock}
              onChange={function(_, value) {
                if (value) {
                  if (value === ADD_BLOCK_MESSAGE) {
                    state.addSessionBlock(newOption);
                    toast.success(
                      t("createEventPage.sessionForm.eventBlockCreateSuccess"),
                    );
                    a.setValue("sessionBlock", newOption);
                  } else {
                    a.setValue("sessionBlock", value);
                  }
                }
              }}
              options={state.sessionBlocks.map(function(e) {
                return e.name;
              })}
              renderInput={function(params) {
                return (
                  <TextField
                    {...params}
                    label={t("createEventPage.sessionForm.labels.eventBlock")}
                  ></TextField>
                );
              }}
              filterOptions={function(options, params) {
                const filtered = options.filter(function(e) {
                  return e.includes(params.inputValue);
                });

                if (filtered.length === 0) {
                  filtered.push(ADD_BLOCK_MESSAGE);
                  setNewOption(params.inputValue);
                }

                return filtered;
              }}
            ></Autocomplete>
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
                    "createEventPage.sessionForm.ariaLabels.location",
                  )}
                  async
                  componentState={locations.componentState}
                  setComponentState={locations.setComponentState}
                  loading={locations.isFetching}
                  name={"location"}
                  options={locations.options ?? []}
                  label={t("createEventPage.sessionForm.labels.location")}
                  createable
                  onCreateCallback={function() {
                    state.updateSession(a.getValues());
                    openLocationForm();
                  }}
                  createLabel={t(
                    "createEventPage.sessionForm.locationCreateMessage",
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
                  aria-label={t("createEventPage.sessionForm.ariaLabels.room")}
                  async
                  componentState={roomComponentState}
                  setComponentState={setRoomComponentState}
                  disabled={!chosenLocationId}
                  name="room"
                  options={roomOptions ?? []}
                  label={t("createEventPage.sessionForm.labels.room")}
                  createable
                  onCreateCallback={function() {
                    setRetrieveRooms(function() {
                      return async function() {
                        if (chosenLocationId) {
                          setRoomOptions(
                            await retrieveRoomOptions(chosenLocationId),
                          );
                        }
                      };
                    });
                    state.updateSession(a.getValues());
                    setChosenLocation(chosenLocationId as string);
                    openRoomForm();
                  }}
                  createLabel={t(
                    "createEventPage.sessionForm.roomCreateMessage",
                  )}
                  createValue={crypto.randomUUID()}
                ></ControlledAutocomplete>
              </Grid2>
            </Grid2>
            <ControlledAutocomplete
              aria-label={t("createEventPage.sessionForm.ariaLabels.speaker")}
              async
              componentState={speakers.componentState}
              setComponentState={speakers.setComponentState}
              name={"speaker"}
              options={speakers.options ?? []}
              label={t("createEventPage.sessionForm.labels.speaker")}
              createable
              onCreateCallback={function() {
                state.updateSession(a.getValues());
                openSpeakerForm();
              }}
              createLabel={t(
                "createEventPage.sessionForm.speakerCreateMessage",
              )}
              createValue={crypto.randomUUID()}
              filterCallback={function(phrase) {
                speakers.setInput(phrase);
              }}
            ></ControlledAutocomplete>
            <TextInput
              aria-label={t("createEventPage.sessionForm.ariaLabels.maxSeats")}
              label={t("createEventPage.sessionForm.labels.maxSeats")}
              type="number"
              name="maxSeats"
            ></TextInput>
            <TextInput
              name="minutesBeforeSignUpCloses"
              type="number"
              label={t(
                "createEventPage.sessionForm.labels.minutesBeforeSignUpCloses",
              )}
              aria-label={t(
                "createEventPage.sessionForm.ariaLabels.minutesBeforeSignUpCloses",
              )}
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
                    "createEventPage.sessionForm.ariaLabels.startTime",
                  )}
                  minDate={state.startDate}
                  maxDate={state.endDate}
                  label={t("createEventPage.sessionForm.labels.startTime")}
                  name="startTime"
                  triggerCallback={function() {
                    a.trigger(["startTime", "endTime"]);
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
                    "createEventPage.sessionForm.ariaLabels.endTime",
                  )}
                  minDate={state.startDate}
                  maxDate={state.endDate}
                  name="endTime"
                  label={t("createEventPage.sessionForm.labels.endTime")}
                  triggerCallback={function() {
                    a.trigger(["startTime", "endTime"]);
                  }}
                ></ControlledDateTimePicker>
              </Grid2>
            </Grid2>
            <Grid2 container>
              <Grid2
                size={breakpoints}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  title={t(
                    "createEventPage.sessionForm.saveSessionButtonTooltip",
                  )}
                >
                  <Button
                    disabled={Object.keys(a.formState.errors).length > 0}
                    aria-label={t(
                      "createEventPage.sessionForm.ariaLabels.saveSessionButton",
                    )}
                    type="submit"
                  >
                    {t("createEventPage.sessionForm.saveSessionButtonText")}
                  </Button>
                </Tooltip>
              </Grid2>
              <Grid2
                size={breakpoints}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  title={t(
                    "createEventPage.sessionForm.deleteSessionButtonTooltip",
                  )}
                >
                  <Button
                    aria-label={t(
                      "createEventPage.sessionForm.ariaLabels.deleteSessionButton",
                    )}
                    onClick={remove}
                  >
                    {t("createEventPage.sessionForm.deleteSessionButtonText")}
                  </Button>
                </Tooltip>
              </Grid2>
            </Grid2>
          </Form>
        </FormProvider>
      </AccordionDetails>
      <ConfirmActionModal
        open={openConfirmAction}
        onClose={function() {
          setOpenConfirmAction(false);
        }}
        confirmAction={confirmActionFunction as () => void}
      ></ConfirmActionModal>
    </Accordion>
  );
}
