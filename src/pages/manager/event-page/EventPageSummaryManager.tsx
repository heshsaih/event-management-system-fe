import { useState } from "react";
import { Event, UseEventObject } from "../../../data/useEvent";
import { useParams } from "react-router-dom";
import StyledContainer from "../../../components/StyledContainer";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Colors } from "../../../constants/styling";
import EventImage from "../../../components/EventImage";
import UpdateEventForm from "./UpdateEventForm";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

function mapEventData(data: Event | undefined, t: TFunction<"pl">) {
  return {
    id: data?.id,
    [t("eventPageManager.summary.eventDataColumns.name")]: data?.name,
    [t("createEventPage.summary.sessionTableRows.descriptionPl")]:
      data?.descriptionPl,
    [t("createEventPage.summary.sessionTableRows.descriptionEn")]:
      data?.descriptionEn && data.descriptionEn.length > 0
        ? data.descriptionEn
        : t("eventPageManager.summary.eventDataColumns.noDescriptionEn"),
    [t("eventPageManager.summary.eventDataColumns.startDate")]:
      data?.startDate.isValid()
        ? data.startDate.toDate().toLocaleString("pl-PL")
        : t("eventPageManager.summary.eventDataColumns.noStartDate"),
    [t("eventPageManager.summary.eventDataColumns.endDate")]:
      data?.endDate.isValid()
        ? data.endDate.toDate().toLocaleString("pl-PL")
        : t("eventPageManager.summary.eventDataColumns.noEndDate"),
    [t("eventPageManager.summary.eventDataColumns.registrationStartDate")]:
      data?.registrationStartDate.isValid()
        ? data.registrationStartDate.toDate().toLocaleString("pl-PL")
        : t(
            "eventPageManager.summary.eventDataColumns.noRegistrationStartDate",
          ),
    [t("eventPageManager.summary.eventDataColumns.outsidersAllowed")]:
      data?.outsidersAllowed
        ? t("eventPageManager.summary.eventDataColumns.yes")
        : t("eventPageManager.summary.eventDataColumns.no"),
    [t(
      "eventPageManager.summary.eventDataColumns.minutesBetweenDifferentSessions",
    )]: data?.minutesBetweenDifferentSessions,
    [t("eventPageManager.summary.eventDataColumns.createdAt")]:
      data?.createdAt.isValid()
        ? data.createdAt.toDate().toLocaleString("pl-PL")
        : t("eventPageManager.summary.eventDataColumns.noCreatedAt"),
    [t("eventPageManager.summary.eventDataColumns.updatedAt")]:
      data?.updatedAt.isValid()
        ? data.updatedAt.toDate().toLocaleString("pl-PL")
        : t("eventPageManager.summary.eventDataColumns.noUpdatedAt"),
    [t("eventPageManager.summary.eventDataColumns.active")]: data?.active
      ? t("eventPageManager.summary.eventDataColumns.yes")
      : t("eventPageManager.summary.eventDataColumns.no"),
  };
}

type EventPageSummaryManager = {
  state: UseEventObject;
};

export default function EventPageSummaryManager({
  state,
}: EventPageSummaryManager) {
  const {t} = useTranslation()
  const { getEvent, event, isFetching } = state;
  const [editingMode, setEditingMode] = useState<boolean>(false);

  const { id } = useParams();

  const mappedData = mapEventData(event, t);

  return (
    <StyledContainer inner>
      {isFetching && (
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      )}
      {!isFetching && event && !editingMode && (
        <>
          <Typography variant="h4">{t("eventPageManager.summary.pageHeading")}</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {Object.keys(mappedData).map(function (e) {
                  if (e === "id") return;
                  return (
                    <TableRow>
                      <TableCell>{e}</TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "pre",
                          textWrap: "wrap",
                        }}
                      >
                        {mappedData[e as keyof typeof mappedData]}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h4" marginTop={3} marginBottom={2}>
            {t("eventPageManager.summary.eventImageHeading")}
          </Typography>
          <EventImage data={event.image.data}></EventImage>
          <Typography variant="body1">{event.image.imageName}</Typography>
          <Tooltip title={t("eventPageManager.summary.updateEventButtonTooltip")}>
            <Button
              aria-label={t("eventPageManager.summary.ariaLabels.updateEventButton")}
              onClick={function () {
                setEditingMode(true);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              {t("eventPageManager.summary.updateEventButtonText")}
            </Button>
          </Tooltip>
        </>
      )}
      {!isFetching && event && editingMode && (
        <UpdateEventForm
          refresh={function () {
            getEvent(id ?? "");
          }}
          closeForm={function () {
            setEditingMode(false);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        ></UpdateEventForm>
      )}
    </StyledContainer>
  );
}
