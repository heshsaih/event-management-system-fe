import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import useCreateEventStore from "../../../data/useCreateEventStore";
import SessionForm, { CreateSessionForm } from "./SessionForm";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { lazy, Suspense, useRef, useState } from "react";
import FileButton from "../../../components/FileButton";
import Papaparse from "papaparse";
import { buildErrorMessage } from "../../../util/parsingErrors";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Navigate } from "react-router-dom";
import { DEFAULT_SESSION_BLOCK } from "../../../constants/session";
import { Colors } from "../../../constants/styling";
import { useTranslation } from "react-i18next";
import AddLocationForm from "../../../components/AddLocationForm";
import AddRoomForm from "../location-page/AddRoomForm";
import AddSpeakerForm from "../../../components/AddSpeakerForm";
import ConfirmActionModal from "../../../components/ConfirmActionModal";
const SessionViewer = lazy(() => import("../../../components/SessionViewer"));

type CreateSessionsProps = {
  nextStep: () => void;
  previousStep: () => void;
};

type ExpectedCSVType = {
  nazwa?: string;
  "opis-pl"?: string;
  "opis-en"?: string;
  "czas-rozpoczecia"?: string;
  "czas-zakonczenia"?: string;
  "ilosc-miejsc"?: string;
  blok?: string;
  prelegent?: string;
};

function parseSessions(
  data: string,
  setSessions: (sessions: CreateSessionForm[]) => void,
  setSessionBlocks: (sessionBlocks: string[]) => void,
  scroll: () => void,
) {
  Papaparse.parse<ExpectedCSVType>(data, {
    header: true,
    complete: function(result) {
      console.log(result);
      if (result.errors.length > 0) {
        result.errors.forEach(function(e) {
          toast.error(buildErrorMessage(e));
        });
      }

      const dateValidationErorsRows: number[] = [];
      result.data.forEach(function(e, i) {
        const startTime = dayjs(e["czas-rozpoczecia"]);
        const endTime = dayjs(e["czas-zakonczenia"]);

        if (!(startTime.isValid() && endTime.isValid())) {
          dateValidationErorsRows.push(i + 2);
        }
      });

      if (dateValidationErorsRows.length > 0) {
        dateValidationErorsRows.forEach(function(e) {
          toast.error(
            `W wierszu ${e} jedna z dat jest w nieprawidłowym formacie`,
          );
        });
      } else {
        setSessions(
          result.data.map(function(e): CreateSessionForm {
            return {
              name: e["nazwa"] ?? "",
              descriptionPL: e["opis-pl"] ?? "",
              descriptionEN: e["opis-en"] ?? "",
              startTime: dayjs(e["czas-rozpoczecia"]).second(0).millisecond(0),
              endTime: dayjs(e["czas-zakonczenia"]).second(0).millisecond(0),
              maxSeats: Number(e["ilosc-miejsc"] ?? 0),
              id: crypto.randomUUID(),
              sessionBlock: e["blok"] ?? DEFAULT_SESSION_BLOCK.name,
              //@ts-ignore
              roomId: "",
              locationId: "",
              speakerId: "",
            };
          }),
        );
        const uniqueBlocks = new Set(
          result.data
            .filter(function(e) {
              return !!e.blok;
            })
            .map(function(e) {
              return e.blok;
            }),
        ) as Set<string>;
        setSessionBlocks(Array.from(uniqueBlocks));
        console.log(Array.from(uniqueBlocks));
        toast.success(`Dane zostały wczytane pomyślnie`);
        scroll();
      }
    },
    error: function(err: Error, _: Papaparse.LocalFile) {
      console.log(err);
      toast.error(`Nie udało się wczytać pliku\nPowód: ${err.message}`);
    },
  });
}

function readFile(
  file: File,
  setSessions: (sessions: CreateSessionForm[]) => void,
  setSessionBlocks: (sessionBlocks: string[]) => void,
  scroll: () => void,
) {
  if (file.type !== "text/csv") {
    toast.error("Wybrany plik ma niepoprawny format (wymaagane są pliki .csv)");
    return;
  }
  const reader = new FileReader();

  reader.onload = function(e) {
    if (e.target?.result) {
      parseSessions(
        e.target.result as string,
        setSessions,
        setSessionBlocks,
        scroll,
      );
    }
  };

  reader.readAsText(file);
}

export default function CreateSessions(props: CreateSessionsProps) {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [openAddLocation, setOpenAddLocation] = useState<boolean>(false);
  const [openAddRoom, setOpenAddRoom] = useState<boolean>(false);
  const [openAddSpeaker, setOpenAddSpeaker] = useState<boolean>(false);
  const [chosenLocationForRoomAddition, setChosenLocationFormRoomAddition] =
    useState<string>();
  const [retrieveRooms, setRetrieveRooms] = useState<() => void>();

  const addError = function(id: string) {
    if (!errors.includes(id)) {
      setErrors([...errors, id]);
    }
  };

  const removeError = function(id: string) {
    setErrors(
      errors.filter(function(e) {
        return e !== id;
      }),
    );
  };

  const handleListChange = function() {
    const currentRect = ref.current?.getBoundingClientRect() as DOMRect;
    const scrollValue = currentRect.top + window.scrollY - 150;
    window.scrollTo({
      top: scrollValue,
      behavior: "smooth",
    });
  };

  const state = useCreateEventStore(function(state) {
    return state;
  });

  if (state.name.length < 3 || state.descriptionPL.length < 3) {
    return <Navigate to={"/events/create?step=0"}></Navigate>;
  }

  const addSession = function() {
    const newSession: CreateSessionForm = {
      minutesBeforeSignUpCloses: 15,
      name: t("createEventPage.createSessions.newSessionName"),
      descriptionEN: "",
      descriptionPL: "",
      startTime: state.startDate.minute(0).second(0).millisecond(0),
      endTime: state.startDate.second(0).millisecond(0),
      maxSeats: 1,
      id: crypto.randomUUID(),
      sessionBlock: DEFAULT_SESSION_BLOCK.name,
      location: {
        label: "",
        value: "",
      },
      room: {
        label: "",
        value: "",
      },
      speaker: {
        label: "",
        value: "",
      },
      sessionType: {
        label: "",
        value: "",
      },
    };

    state.createSession(newSession);
    toast.success(t("createEventPage.createSessions.newSessionCreateSuccess"));
    handleListChange();
  };

  return (
    <StyledContainer inner>
      <Typography ref={ref} variant="h3" marginBottom={4}>
        {t("createEventPage.createSessions.pageHeader")}
      </Typography>
      <StyledContainer
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <Tooltip
            title={t(
              "createEventPage.createSessions.deleteAllSessionsButtonTooltip",
            )}
          >
            <Button
              onClick={function() {
                setOpenConfirm(true);
              }}
            >
              <DeleteForeverIcon></DeleteForeverIcon>
            </Button>
          </Tooltip>
          <Tooltip
            title={t(
              "createEventPage.createSessions.addNewSessionButtonToolTip",
            )}
          >
            <Button onClick={addSession}>
              <AddIcon></AddIcon>
            </Button>
          </Tooltip>
          <FileButton
            callback={function(e) {
              readFile(
                e,
                state.setSessions,
                state.setSessionBlocks,
                handleListChange,
              );
            }}
          ></FileButton>
        </Box>
        {state.sessions.length > 0 ? (
          state.sessions.map(function(e) {
            return (
              <SessionForm
                setRetrieveRooms={setRetrieveRooms}
                openRoomForm={function() {
                  setOpenAddRoom(true);
                }}
                openLocationForm={function() {
                  setOpenAddLocation(true);
                }}
                openSpeakerForm={function() {
                  setOpenAddSpeaker(true);
                }}
                setChosenLocation={function(id: string) {
                  setChosenLocationFormRoomAddition(id);
                }}
                handleListChange={handleListChange}
                key={e.id}
                id={e.id}
                addError={addError}
                removeError={removeError}
              ></SessionForm>
            );
          })
        ) : (
          <Typography>
            {t("createEventPage.createSessions.noSessionsPresentMessage")}
          </Typography>
        )}
      </StyledContainer>
      <Suspense
        fallback={
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        }
      >
        <SessionViewer
          selectedDate={state.startDate.toDate()}
          events={state.sessions.map(function(e) {
            return {
              event_id: e.id,
              title: e.name,
              start: e.startTime.toDate(),
              end: e.endTime.toDate(),
              color: state.sessionBlocks.find(function(block) {
                return block.name === e.sessionBlock;
              })?.color,
              subtitle: e.sessionBlock,
            };
          })}
          scrollOnClose={handleListChange}
        ></SessionViewer>
      </Suspense>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <Tooltip
          title={t("createEventPage.createSessions.previousStepButtonTooltip")}
        >
          <Button onClick={props.previousStep}>
            {t("createEventPage.createSessions.previousStepButtonText")}
          </Button>
        </Tooltip>
        <Tooltip
          title={t("createEventPage.createSessions.nextStepButtonTooltip")}
        >
          <Button disabled={errors.length > 0} onClick={props.nextStep}>
            {t("createEventPage.createSessions.nextStepButtonText")}
          </Button>
        </Tooltip>
      </Box>
      <AddLocationForm
        open={openAddLocation}
        setOpen={setOpenAddLocation}
        fetchLocations={function() { }}
      ></AddLocationForm>
      <AddRoomForm
        locationId={chosenLocationForRoomAddition as string}
        open={openAddRoom}
        onClose={function() {
          setOpenAddRoom(false);
        }}
        submitCallback={retrieveRooms}
      ></AddRoomForm>
      <AddSpeakerForm
        open={openAddSpeaker}
        onClose={function() {
          setOpenAddSpeaker(false);
        }}
      ></AddSpeakerForm>
      <ConfirmActionModal
        open={openConfirm}
        onClose={function() {
          setOpenConfirm(false);
        }}
        confirmAction={function() {
          setErrors([]);
          state.setSessions([]);
          state.setSessionBlocks([]);
          toast.success(
            t("createEventPage.createSessions.deleteAllSessionsSuccess"),
          );
          setOpenConfirm(false);
        }}
      ></ConfirmActionModal>
    </StyledContainer>
  );
}
