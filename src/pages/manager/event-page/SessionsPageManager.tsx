import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { Session } from "../../../data/useSession";
import { Event, UseEventObject } from "../../../data/useEvent";
import { Colors } from "../../../constants/styling";
import SessionEntry from "./SessionEntry";
import UpdateSessionForm from "./UpdateSessionForm";
import { lazy, Suspense, useState } from "react";
import dayjs from "dayjs";
const SessionViewer = lazy(() => import("../../../components/SessionViewer"));
import getRandomColor from "../../../util/randomColor";
import AddSessionForm from "../../../components/AddSessionForm";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

function mapSessionData(data: Session | undefined, t: TFunction<"pl">) {
  return {
    id: data?.id,
    [t("eventPageManager.sessionsPage.sessionDataColumns.name")]:
      data?.sessionName,
    [t("eventPageManager.sessionsPage.sessionDataColumns.sessionType")]:
      data?.sessionType.name,
    [t("eventPageManager.sessionsPage.sessionDataColumns.eventBlock")]:
      data?.eventBlock.name,
    [t("eventPageManager.sessionsPage.sessionDataColumns.descriptionPl")]:
      data?.descriptionPl,
    [t("eventPageManager.sessionsPage.sessionDataColumns.descriptionEn")]:
      data?.descriptionEn ??
      t("eventPageManager.sessionsPage.sessionDataColumns.noDescriptionEn"),
    [t("eventPageManager.sessionsPage.sessionDataColumns.startDate")]:
      data?.startDate.isValid()
        ? data.startDate.toDate().toLocaleString("pl-PL")
        : t("eventPageManager.sessionsPage.sessionDataColumns.noStartDate"),
    [t("eventPageManager.sessionsPage.sessionDataColumns.endDate")]:
      data?.endDate.isValid()
        ? data.endDate.toDate().toLocaleString("pl-PL")
        : t("eventPageManager.sessionsPage.sessionDataColumns.noEndDate"),
    [t("eventPageManager.sessionsPage.sessionDataColumns.maxSeats")]:
      data?.maxSeats,
    [t("eventPageManager.sessionsPage.sessionDataColumns.speaker")]:
      `${data?.speaker.titleName ?? ""} ${data?.speaker.firstName} ${data?.speaker.lastName}`,
    [t("eventPageManager.sessionsPage.sessionDataColumns.address")]:
      `${data?.room.street} ${data?.room.buildingNumber}, ${data?.room.postalCode} ${data?.room.city}`,
    [t("eventPageManager.sessionsPage.sessionDataColumns.location")]:
      data?.room.locationName,
    [t("eventPageManager.sessionsPage.sessionDataColumns.room")]:
      data?.room.roomNumber,
    [t("eventPageManager.sessionsPage.sessionDataColumns.createdAt")]:
      data?.createdAt.isValid()
        ? data.createdAt.toDate().toLocaleString("pl-PL")
        : t("eventPageManager.sessionsPage.sessionDataColumns.noCreatedAt"),
    [t("eventPageManager.sessionsPage.sessionDataColumns.updatedAt")]:
      data?.updatedAt.isValid()
        ? data.updatedAt.toDate().toLocaleString("pl-PL")
        : t("eventPageManager.sessionsPage.sessionDataColumns.noUpdatedAt"),
    [t("eventPageManager.sessionsPage.sessionDataColumns.active")]: data?.active
      ? t("eventPageManager.sessionsPage.sessionDataColumns.yes")
      : t("eventPageManager.sessionsPage.sessionDataColumns.no"),
  };
}
export type SessionEntry = ReturnType<typeof mapSessionData>;
type SessionsPageManagerProps = {
  state: UseEventObject;
};

export default function SessionsPageManager({
  state,
}: SessionsPageManagerProps) {
  const { t } = useTranslation();
  const { event, isFetching, getEvent } = state;
  const [sessionId, setSessionId] = useState<string>();
  const [openCreateSessionForm, setOpenCreateSessionForm] =
    useState<boolean>(false);

  const mappedSessions = event?.sessions.map(function (e) {
    return mapSessionData(e, t);
  });
  const colors = event?.eventBlocks.map(function (e) {
    return {
      id: e.id,
      color: getRandomColor(),
    };
  });

  return (
    <>
      <StyledContainer inner>
        <Typography variant="h4">
          {t("eventPageManager.sessionsPage.pageHeading")}
        </Typography>
        <Tooltip
          title={t("eventPageManager.sessionsPage.createSessionButtonTooltip")}
        >
          <Button
            aria-label={t(
              "eventPageManager.sessionsPage.ariaLabels.createSessionButton",
            )}
            onClick={function () {
              setOpenCreateSessionForm(true);
            }}
          >
            {t("eventPageManager.sessionsPage.createSessionButtonText")}
          </Button>
        </Tooltip>
        {isFetching && (
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        {!isFetching && mappedSessions && (
          <StyledContainer inner sx={{ paddingY: 0 }}>
            {mappedSessions.map(function (e) {
              return (
                <SessionEntry
                  openUpdate={function () {
                    setSessionId(e.id);
                  }}
                  entry={e}
                ></SessionEntry>
              );
            })}
            <Suspense
              fallback={
                <CircularProgress
                  size={"3rem"}
                  sx={{ color: Colors.RED }}
                ></CircularProgress>
              }
            >
              <Typography variant="h4" marginTop={3}>
                {t("eventPageManager.sessionsPage.sessionViewerHeading")}
              </Typography>
              <SessionViewer
                selectedDate={event?.startDate.toDate() as Date}
                events={(event as Event).sessions
                  .filter(function (e) {
                    return e.active;
                  })
                  .map(function (e) {
                    return {
                      event_id: e.id,
                      title: e.sessionName,
                      start: e.startDate.toDate(),
                      end: e.endDate.toDate(),
                      subtitle: e.eventBlock.name,
                      color: colors?.find(function (val) {
                        return e.eventBlock.id === val.id;
                      })?.color,
                    };
                  })}
                scrollOnClose={function () {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              ></SessionViewer>
            </Suspense>
          </StyledContainer>
        )}
      </StyledContainer>
      {sessionId && (
        <UpdateSessionForm
          eventId={event?.id ?? ""}
          eventBlocks={
            event?.eventBlocks.map(function (e) {
              return {
                label: e.name,
                value: e.id,
              };
            }) ?? []
          }
          eventStartDate={event?.startDate ?? dayjs()}
          eventEndDate={event?.endDate ?? dayjs()}
          open={!!sessionId}
          onClose={function () {
            setSessionId(undefined);
          }}
          sessionId={sessionId ?? ""}
          refresh={getEvent}
        ></UpdateSessionForm>
      )}
      {openCreateSessionForm && (
        <AddSessionForm
          eventBlocks={
            event?.eventBlocks.map(function (e) {
              return {
                label: e.name,
                value: e.id,
              };
            }) ?? []
          }
          eventStartDate={event?.startDate ?? dayjs()}
          eventEndDate={event?.endDate ?? dayjs()}
          open={openCreateSessionForm}
          onClose={function () {
            setOpenCreateSessionForm(false);
          }}
          eventId={event?.id ?? ""}
          refresh={getEvent}
        ></AddSessionForm>
      )}
    </>
  );
}
