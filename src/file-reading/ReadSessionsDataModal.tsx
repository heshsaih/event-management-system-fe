import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import StyledModal from "../components/StyledModal";
import { useState } from "react";
import {
  downloadExampleCSVFile,
  ParsedSessionData,
  parseSessionsData,
  sessionDataExample,
  validateFile,
} from "./fileReading";
import FileButton from "../components/FileButton";
import StyledContainer from "../components/StyledContainer";
import { useTranslation } from "react-i18next";
import { Colors } from "../constants/styling";
import { TFunction } from "i18next";
import useCreateEventStore from "../data/useCreateEventStore";
import ConfirmActionModal from "../components/ConfirmActionModal";
import useRoom from "../data/useRoom";
import useLocation from "../data/useLocation";
import { useSessionType } from "../data/useSessionType";
import useSpeaker from "../data/useSpeaker";
import dayjs from "dayjs";
import { DEFAULT_SESSION_BLOCK } from "../constants/session";
import { CreateSessionForm } from "../pages/manager/create-event-page/SessionForm";

type ReadSessionsDataModalProps = {
  open: boolean;
  onClose: () => void;
};

function mapResultToTableRows(data: ParsedSessionData, t: TFunction) {
  return {
    [t("readFileModal.sessionsData.tableKeys.name")]:
      data.name.length > 0
        ? data.name
        : t("readFileModal.sessionsData.tableKeys.emptyValue"),
    [t("readFileModal.sessionsData.tableKeys.descriptionPl")]:
      data.descriptionPl.length > 0
        ? data.descriptionPl
        : t("readFileModal.sessionsData.tableKeys.emptyValue"),
    [t("readFileModal.sessionsData.tableKeys.descriptionEn")]:
      data.descriptionEn.length > 0
        ? data.descriptionEn
        : t("readFileModal.sessionsData.tableKeys.valueNotFound"),
    [t("readFileModal.sessionsData.tableKeys.sessionType")]:
      data.sessionType.value.length > 0
        ? data.sessionType.label
        : t("readFileModal.sessionsData.tableKeys.emptyValue"),
    [t("readFileModal.sessionsData.tableKeys.sessionBlock")]:
      data.sessionBlock.length > 0
        ? data.sessionBlock
        : t("readFileModal.sessionsData.tableKeys.emptySessionBlock"),
    [t("readFileModal.sessionsData.tableKeys.room")]:
      data.room.value.length > 0
        ? data.room.label
        : t("readFileModal.sessionsData.tableKeys.valueNotFound"),
    [t("readFileModal.sessionsData.tableKeys.location")]:
      data.location.value.length > 0
        ? data.location.label
        : t("readFileModal.sessionsData.tableKeys.valueNotFound"),
    [t("readFileModal.sessionsData.tableKeys.speaker")]:
      data.speaker.value.length > 0
        ? data.speaker.label
        : t("readFileModal.sessionsData.tableKeys.valueNotFound"),
    [t("readFileModal.sessionsData.tableKeys.maxSeats")]: Number.isNaN(
      data.maxSeats,
    )
      ? t("readFileModal.sessionsData.tableKeys.wrongNumberFormat")
      : data.maxSeats,
    [t("readFileModal.sessionsData.tableKeys.minutesBeforeSignUpCloses")]:
      Number.isNaN(data.minutesBeforeSignUpCloses)
        ? t("readFileModal.sessionsData.tableKeys.wrongNumberFormat")
        : data.minutesBeforeSignUpCloses,
    [t("readFileModal.sessionsData.tableKeys.startTime")]:
      data.startTime.isValid()
        ? data.startTime.toDate().toLocaleString("pl-Pl", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : t("readFileModal.sessionsData.tableKeys.wrongDateFormat"),
    [t("readFileModal.sessionsData.tableKeys.endTime")]: data.endTime.isValid()
      ? data.endTime.toDate().toLocaleString("pl-PL", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : t("readFileModal.sessionsData.tableKeys.wrongDateFormat"),
  };
}

export default function ReadSessionsDataModal(
  props: ReadSessionsDataModalProps,
) {
  const [isReading, setIsReading] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<() => void>();
  const [result, setResult] = useState<ParsedSessionData[]>();
  const { t } = useTranslation();
  const state = useCreateEventStore(function (state) {
    return state;
  });
  const { findRoomForCSVParsing } = useRoom();
  const { findLocationForCSVParsing } = useLocation();
  const { findSpeakerForCSVParsing } = useSpeaker();
  const { findSessionTypeForCSVParsing } = useSessionType();

  const mappedResult =
    result &&
    result.map(function (e) {
      return mapResultToTableRows(e, t);
    });

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">
          {t("readFileModal.sessionsData.pageHeading")}
        </Typography>
        {isReading && (
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        {!isReading && !result && (
          <>
            <StyledContainer sx={{ marginY: "2rem", paddingY: "1rem" }}>
              <Typography>
                {t("readFileModal.sessionsData.instruction.intro")}
              </Typography>
              <List dense>
                <ListItem alignItems="flex-start">
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.name")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.descriptionPl")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.descriptionEn")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.sessionType")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.sessionBlock")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.room")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.speaker")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.maxSeats")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t(
                      "readFileModal.sessionsData.instruction.minutesBeforeSignUpCloses",
                    )}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.startTime")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.sessionsData.instruction.endTime")}
                  </ListItemText>
                </ListItem>
              </List>
              <Tooltip
                title={t(
                  "readFileModal.sessionsData.downloadExampleButtonTooltip",
                )}
              >
                <Button
                  autoFocus
                  aria-label={t(
                    "readFileModal.eventData.ariaLabels.downloadExampleButton",
                  )}
                  endIcon={<CloudDownloadIcon></CloudDownloadIcon>}
                  onClick={function () {
                    downloadExampleCSVFile(
                      sessionDataExample,
                      "przyklad_konferencje.csv",
                    );
                  }}
                >
                  {t("readFileModal.eventData.downloadExampleButtonText")}
                </Button>
              </Tooltip>
            </StyledContainer>
            <FileButton
              callback={function (file) {
                const result = validateFile(file);
                if (result) {
                  parseSessionsData({
                    file: result,
                    findSpeaker: findSpeakerForCSVParsing,
                    findLocation: findLocationForCSVParsing,
                    findRoom: findRoomForCSVParsing,
                    findSessionType: findSessionTypeForCSVParsing,
                    setResult: setResult,
                    setIsLoading: setIsReading,
                  });
                }
              }}
            >
              {t("readFileModal.eventData.loadFileButtonText")}
            </FileButton>
          </>
        )}
        {!isReading && result && mappedResult && (
          <StyledContainer inner>
            <Typography variant="h5">
              {t("readFileModal.eventData.readDataHeading")}
            </Typography>
            {mappedResult.length > 0 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    {Object.keys(mappedResult[0]).map(function (e) {
                      return <TableCell>{e}</TableCell>;
                    })}
                  </TableHead>
                  <TableBody>
                    {mappedResult.map(function (e) {
                      return (
                        <TableRow>
                          {Object.values(e).map(function (val) {
                            return <TableCell>{val}</TableCell>;
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {mappedResult.length === 0 && (
              <Typography marginY={3}>{t("readFileModal.sessionsData.noSessionsLoaded")}</Typography>
            )}
            <Typography>
              {t("readFileModal.eventData.isDataCorrect")}
            </Typography>
            <Box>
              <Tooltip title={t("readFileModal.eventData.submitButtonTooltip")}>
                <Button
                  aria-label={t(
                    "readFileModal.eventData.ariaLabels.submitButton",
                  )}
                  onClick={function () {
                    setConfirmAction(function () {
                      return function () {
                        setOpenConfirm(false);
                        const mappedResultForPersisting: CreateSessionForm[] =
                          result.map(function (e) {
                            return {
                              minutesBeforeSignUpCloses: Number.isNaN(
                                e.minutesBeforeSignUpCloses,
                              )
                                ? 15
                                : e.minutesBeforeSignUpCloses,
                              name: e.name,
                              descriptionPL: e.descriptionPl,
                              descriptionEN: e.descriptionEn,
                              startTime: e.startTime.isValid()
                                ? e.startTime
                                : dayjs(),
                              endTime: e.endTime.isValid()
                                ? e.endTime
                                : dayjs(),
                              sessionBlock:
                                e.sessionBlock.length > 0
                                  ? e.sessionBlock
                                  : DEFAULT_SESSION_BLOCK.name,
                              maxSeats: Number.isNaN(e.maxSeats)
                                ? 15
                                : e.maxSeats,
                              location: e.location,
                              room: e.room,
                              speaker: e.speaker,
                              sessionType: e.sessionType,
                              id: crypto.randomUUID(),
                            };
                          });
                        state.setSessions(mappedResultForPersisting);
                        state.setSessionBlocks(
                          Array.from(
                            new Set([
                              ...mappedResultForPersisting.map(function (e) {
                                return e.sessionBlock;
                              }),
                              DEFAULT_SESSION_BLOCK.name,
                            ]),
                          ),
                        );
                        location.reload();
                      };
                    });
                    setOpenConfirm(true);
                  }}
                >
                  {t("readFileModal.eventData.submitButtonText")}
                </Button>
              </Tooltip>
              <Tooltip title={t("readFileModal.eventData.cancelButtonTooltip")}>
                <Button
                  autoFocus
                  aria-label={t(
                    "readFileModal.eventData.ariaLabels.cancelButton",
                  )}
                  onClick={function () {
                    setResult(undefined);
                  }}
                >
                  {t("readFileModal.eventData.cancelButtonText")}
                </Button>
              </Tooltip>
            </Box>
            <ConfirmActionModal
              open={openConfirm}
              onClose={function () {
                setOpenConfirm(false);
              }}
              confirmAction={confirmAction as () => void}
            ></ConfirmActionModal>
          </StyledContainer>
        )}
      </>
    </StyledModal>
  );
}
