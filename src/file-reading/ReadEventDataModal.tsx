import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import StyledModal from "../components/StyledModal";
import { useState } from "react";
import {
  downloadExampleCSVFile,
  eventDataExample,
  ParsedEventData,
  parseEventData,
  validateFile,
} from "./fileReading";
import FileButton from "../components/FileButton";
import StyledContainer from "../components/StyledContainer";
import { useTranslation } from "react-i18next";
import { Colors } from "../constants/styling";
import { TFunction } from "i18next";
import useCreateEventStore from "../data/useCreateEventStore";
import dayjs from "dayjs";
import ConfirmActionModal from "../components/ConfirmActionModal";

type ReadEventDataModalProps = {
  open: boolean;
  onClose: () => void;
};

function mapResultToTableRows(data: ParsedEventData, t: TFunction) {
  return {
    [t("readFileModal.eventData.tableKeys.name")]:
      data.name.length > 0
        ? data.name
        : t("readFileModal.eventData.tableKeys.emptyValue"),
    [t("readFileModal.eventData.tableKeys.descriptionPl")]:
      data.descriptionPl.length > 0
        ? data.descriptionPl
        : t("readFileModal.eventData.tableKeys.emptyValue"),
    [t("readFileModal.eventData.tableKeys.descriptionEn")]:
      data.descriptionEn.length > 0
        ? data.descriptionEn
        : t("readFileModal.eventData.tableKeys.emptyValue"),
    [t("readFileModal.eventData.tableKeys.startDate")]: data.startDate.isValid()
      ? data.startDate.toDate().toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      : t("readFileModal.eventData.tableKeys.wrongDateFormat"),
    [t("readFileModal.eventData.tableKeys.endDate")]: data.endDate.isValid()
      ? data.endDate.toDate().toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      : t("readFileModal.eventData.tableKeys.wrongDateFormat"),
    [t("readFileModal.eventData.tableKeys.registrationStartDate")]:
      data.registrationStartDate.isValid()
        ? data.registrationStartDate.toDate().toLocaleString("pl-PL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        : t("readFileModal.eventData.tableKeys.wrongDateFormat"),
    [t("readFileModal.eventData.tableKeys.outsidersAllowed")]:
      data.outsidersAllowed
        ? t("readFileModal.eventData.tableKeys.yes")
        : t("readFileModal.eventData.tableKeys.no"),
    [t("readFileModal.eventData.tableKeys.minutesBetweenSessions")]:
      Number.isNaN(data.minutesBetweenSessions)
        ? t("readFileModal.eventData.tableKeys.wrongNumberFormat")
        : data.minutesBetweenSessions,
  };
}

export default function ReadEventDataModal(props: ReadEventDataModalProps) {
  const [isReading, setIsReading] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<() => void>();
  const [result, setResult] = useState<ParsedEventData>();
  const { t } = useTranslation();
  const updateEvent = useCreateEventStore(function(state) {
    return state.updateEvent;
  });

  const mappedResult = result && mapResultToTableRows(result, t);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">
          {t("readFileModal.eventData.pageHeading")}
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
                {t("readFileModal.eventData.instruction.intro")}
              </Typography>
              <List dense>
                <ListItem alignItems="flex-start">
                  <ListItemText>
                    {t("readFileModal.eventData.instruction.name")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.eventData.instruction.descriptionPl")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.eventData.instruction.descriptionEn")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t(
                      "readFileModal.eventData.instruction.minutesBetweenSessions",
                    )}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.eventData.instruction.startDate")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.eventData.instruction.endDate")}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t(
                      "readFileModal.eventData.instruction.registrationStartDate",
                    )}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {t("readFileModal.eventData.instruction.outsidersAllowed")}
                  </ListItemText>
                </ListItem>
              </List>
              <Tooltip
                title={t(
                  "readFileModal.eventData.downloadExampleButtonTooltip",
                )}
              >
                <Button
                  autoFocus
                  aria-label={t(
                    "readFileModal.eventData.ariaLabels.downloadExampleButton",
                  )}
                  endIcon={<CloudDownloadIcon></CloudDownloadIcon>}
                  onClick={function() {
                    downloadExampleCSVFile([eventDataExample], "przyklad_wydarzenie.csv");
                  }}
                >
                  {t("readFileModal.eventData.downloadExampleButtonText")}
                </Button>
              </Tooltip>
            </StyledContainer>
            <FileButton
              callback={function(file) {
                const result = validateFile(file);
                if (result) {
                  parseEventData(result, setIsReading, setResult);
                }
              }}
            >
              {t("readFileModal.eventData.loadFileButtonText")}
            </FileButton>
          </>
        )}
        {!isReading && result && (
          <StyledContainer inner>
            <Typography variant="h5">
              {t("readFileModal.eventData.readDataHeading")}
            </Typography>
            <TableContainer>
              <Table>
                {mappedResult &&
                  Object.keys(mappedResult).map(function(e) {
                    return (
                      <TableRow>
                        <TableCell>{e}</TableCell>
                        <TableCell>
                          {mappedResult[e as keyof typeof mappedResult]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </Table>
            </TableContainer>
            <Typography>
              {t("readFileModal.eventData.isDataCorrect")}
            </Typography>
            <Box>
              <Tooltip title={t("readFileModal.eventData.submitButtonTooltip")}>
                <Button
                  aria-label={t(
                    "readFileModal.eventData.ariaLabels.submitButton",
                  )}
                  onClick={function() {
                    setConfirmAction(function() {
                      return function() {
                        setOpenConfirm(false);
                        updateEvent({
                          ...result,
                          descriptionPL: result.descriptionPl,
                          descriptionEN: result.descriptionEn,
                          startDate: result.startDate.isValid()
                            ? result.startDate
                            : dayjs(),
                          endDate: result.endDate.isValid()
                            ? result.endDate
                            : dayjs(),
                          registrationStartDate:
                            result.registrationStartDate.isValid()
                              ? result.registrationStartDate
                              : dayjs(),
                          minutesBetweenSessions: Number.isNaN(
                            result.minutesBetweenSessions,
                          )
                            ? 15
                            : result.minutesBetweenSessions,
                        });
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
                  aria-label={t(
                    "readFileModal.eventData.ariaLabels.cancelButton",
                  )}
                  onClick={function() {
                    setResult(undefined);
                  }}
                >
                  {t("readFileModal.eventData.cancelButtonText")}
                </Button>
              </Tooltip>
            </Box>
            <ConfirmActionModal
              open={openConfirm}
              onClose={function() {
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
