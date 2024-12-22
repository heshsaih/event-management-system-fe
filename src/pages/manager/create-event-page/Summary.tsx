import {
  Button,
  CircularProgress,
  Grid2,
  GridBaseProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import useCreateEventStore from "../../../data/useCreateEventStore";
import { Navigate, useNavigate } from "react-router-dom";
import { CreateEventForm } from "./EventForm";
import { mapEventDataToCreateEventDto } from "../../../util/converters";
import useEvent from "../../../data/useEvent";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { useState } from "react";
import ConfirmActionModal from "../../../components/ConfirmActionModal";

type SummaryProps = {
  previousStep: () => void;
};

const breakpoints: GridBaseProps["columns"] = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 6,
};

function mapStateToTable(state: CreateEventForm, t: TFunction<"pl">) {
  return {
    [t("createEventPage.summary.eventTableColumns.name")]: state.name,
    [t("createEventPage.summary.eventTableColumns.descriptionPl")]:
      state.descriptionPL,
    [t("createEventPage.summary.eventTableColumns.descriptionEn")]:
      state.descriptionEN,
    [t("createEventPage.summary.eventTableColumns.startDate")]: state.startDate
      .toDate()
      .toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [t("createEventPage.summary.eventTableColumns.endDate")]: state.endDate
      .toDate()
      .toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [t("createEventPage.summary.eventTableColumns.registrationStartDate")]:
      state.registrationStartDate.toDate().toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [t("createEventPage.summary.eventTableColumns.outsidersAllowed")]:
      state.outsidersAllowed
        ? t("createEventPage.summary.eventTableColumns.yes")
        : t("createEventPage.summary.eventTableColumns.no"),
    [t("createEventPage.summary.eventTableColumns.minutesBetweenSessions")]:
      state.minutesBetweenSessions,
  };
}

export default function Summary({ previousStep }: SummaryProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { isCreating, createEvent } = useEvent();
  const state = useCreateEventStore(function(state) {
    return state;
  });

  if (state.name.length < 3 || state.descriptionPL.length < 3) {
    return <Navigate to={"/events/create?step=0"}></Navigate>;
  }

  const eventDetailsMap = mapStateToTable(state, t);

  const submit = async function() {
    setOpenConfirm(true);
  };

  return (
    <StyledContainer
      inner
      sx={{ backgroundColor: "white", paddingTop: "2rem", marginTop: "2rem" }}
    >
      <Typography variant="h3" marginBottom={4}>
        {t("createEventPage.summary.pageHeading")}
      </Typography>
      <Typography variant="h4" margin={4}>
        {t("createEventPage.summary.eventDataHeading")}
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {Object.keys(eventDetailsMap).map(function(e) {
              return (
                <TableRow>
                  <TableCell>{e}</TableCell>
                  <TableCell sx={{ whiteSpace: "pre", textWrap: "wrap" }}>
                    {eventDetailsMap[e as keyof typeof eventDetailsMap]}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4" margin={4}>
        {t("createEventPage.summary.sessionsDataHeading")}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>
              {t("createEventPage.summary.sessionTableRows.name")}
            </TableCell>
            <TableCell align={"right"}>
              {t("createEventPage.summary.sessionTableRows.descriptionPl")}
            </TableCell>
            <TableCell align="right">
              {t("createEventPage.summary.sessionTableRows.descriptionEn")}
            </TableCell>
            <TableCell align="right">
              {t("createEventPage.summary.sessionTableRows.sessionType")}
            </TableCell>
            <TableCell align="right">
              {t("createEventPage.summary.sessionTableRows.eventBlock")}
            </TableCell>
            <TableCell align="right">
              {t("createEventPage.summary.sessionTableRows.speaker")}
            </TableCell>
            <TableCell align="right">
              {t("createEventPage.summary.sessionTableRows.room")}
            </TableCell>
            <TableCell align={"right"}>
              {t("createEventPage.summary.sessionTableRows.maxSeats")}
            </TableCell>
            <TableCell align={"right"}>
              {t("createEventPage.summary.sessionTableRows.startDate")}
            </TableCell>
            <TableCell align={"right"}>
              {t("createEventPage.summary.sessionTableRows.endDate")}
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableHead>
          <TableBody>
            {state.sessions.map(function(e) {
              return (
                <TableRow>
                  <TableCell>{e.name}</TableCell>
                  <TableCell align={"right"} sx={{ whiteSpace: "pre" }}>
                    {e.descriptionPL}
                  </TableCell>
                  <TableCell align={"right"} sx={{ whiteSpace: "pre" }}>
                    {e.descriptionEN}
                  </TableCell>
                  <TableCell align="right">{e.sessionType.label}</TableCell>
                  <TableCell align="right">{e.sessionBlock}</TableCell>
                  <TableCell align="right">{e.speaker.label}</TableCell>
                  <TableCell align="right">{`${e.location.label}, ${e.room.label}`}</TableCell>
                  <TableCell align={"right"}>{e.maxSeats}</TableCell>
                  <TableCell align={"right"}>
                    {e.startTime.toDate().toLocaleString("pl-PL", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell align={"right"}>
                    {e.endTime.toDate().toLocaleString("pl-PL", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid2 container marginTop={4}>
        <Grid2
          size={breakpoints}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip
            title={t("createEventPage.summary.previousStepButtonTooltip")}
          >
            <Button
              aria-label={t(
                "createEventPage.summary.ariaLabels.previouStepButton",
              )}
              onClick={previousStep}
            >
              {t("createEventPage.summary.previousStepButtonText")}
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
            title={t("createEventPage.summary.submitButtonTooltip")}
            aria-label={t("createEventPage.summary.ariaLabels.submitButton")}
          >
            <Button onClick={submit}>
              {isCreating ? (
                <CircularProgress></CircularProgress>
              ) : (
                t("createEventPage.summary.submitButtonText")
              )}
            </Button>
          </Tooltip>
        </Grid2>
      </Grid2>
      <ConfirmActionModal
        open={openConfirm}
        onClose={function() {
          setOpenConfirm(false);
        }}
        confirmAction={async function() {
          const mappedData = mapEventDataToCreateEventDto(state);
          const id = await createEvent(mappedData);

          if (id) {
            navigate(`/manager/events/${id}`);
            state.clearStore();
          }
          setOpenConfirm(false);
        }}
      ></ConfirmActionModal>
    </StyledContainer>
  );
}
