import StyledContainer from "../../../components/StyledContainer";
import { useParams } from "react-router-dom";
import useEventParticipant, {
  EventForParticipant,
} from "../../../data/useEventParticipant";
import { lazy, Suspense, useEffect, useState } from "react";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../../components/Breadcrumb";
const SessionViewer = lazy(() => import("../../../components/SessionViewer"));
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Colors, Styling } from "../../../constants/styling";
import { TFunction } from "i18next";
import SessionEntryParticipant from "./SessionEntryParticipant";
import getRandomColor from "../../../util/randomColor";
import { DEFAULT_SESSION_BLOCK } from "../../../constants/session";
import { SessionBlock } from "../../../data/useCreateEventStore";
import useAccountStore, { Role } from "../../../data/useAccountStore";
import SignInModal from "./SignInModal";

function mapEventDataToColumn(data: EventForParticipant, t: TFunction) {
  return {
    [t("eventPageParticipant.eventTable.name")]: data.name,
    [t("eventPageParticipant.eventTable.descriptionPl")]: data.descriptionPl,
    [t("eventPageParticipant.eventTable.descriptionEn")]: data.descriptionEn,
    [t("eventPageParticipant.eventTable.startDate")]: data.startDate.isValid()
      ? data.startDate.toDate().toLocaleString("pl-PL", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : t("eventPageParticipant.eventTable.noDate"),
    [t("eventPageParticipant.eventTable.endDate")]: data.endDate.isValid()
      ? data.endDate.toDate().toLocaleString("pl-PL", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : t("eventPageParticipant.eventTable.noDate"),
  };
}

export default function EventPage() {
  const { id } = useParams();
  const parsedToken = useAccountStore(function (store) {
    return store.parsedToken;
  });
  const {
    isFetching,
    getSessions,
    isFetchingSessions,
    event,
    getEvent,
    sessions,
  } = useEventParticipant(
    !!parsedToken && parsedToken.authorities.includes(Role.PARTICIPANT),
  );
  const { t } = useTranslation();
  const [chosenSessionSignInId, setChosenSessionSignInId] = useState<string>();

  useEffect(
    function () {
      if (id) {
        getEvent(id);
      }
    },
    [id],
  );

  const mappedEvent = event && mapEventDataToColumn(event, t);
  const eventBlocks = Array.from(
    new Set(
      sessions &&
        sessions.map(function (e) {
          return {
            id: e.id,
            block: e.eventBlock,
          };
        }),
    ),
  );
  const colors: SessionBlock[] = eventBlocks.map(function (e) {
    if (e.block === DEFAULT_SESSION_BLOCK.name) {
      return DEFAULT_SESSION_BLOCK;
    }
    return {
      color: getRandomColor(),
      name: e.block,
    };
  });

  return (
    <StyledContainer
      sx={{
        paddingTop: 0,
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 1)) ,url('data:image/&;base64,${event?.image.data}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb navigateTo="/events">
          {t("breadcrumbsLabels.events")}
        </Breadcrumb>
        <Breadcrumb current navigateTo="#">
          {t("breadcrumbsLabels.event")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <StyledContainer inner sx={{ 
      }}>
      <Box
        sx={{
          backgroundColor: "white",
          paddingTop: "2rem",
          border: "1px solid lightgrey",
          borderRadius: Styling.BORDER_RADIUS,
        }}
      >
        <Typography variant="h3">Podgląd wydarzenia</Typography>
        {isFetching && (
          <CircularProgress
            size="3rem"
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        <StyledContainer inner>
          {!isFetching && event && mappedEvent && (
            <>
              <Typography variant="h4">Informacje o wydarzeniu</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    {Object.keys(mappedEvent).map(function (e) {
                      return (
                        <TableRow>
                          <TableCell>{e}</TableCell>
                          <TableCell>
                            {[mappedEvent[e as keyof typeof mappedEvent]]}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </StyledContainer>
      </Box>
      </StyledContainer>
      {isFetchingSessions && (
        <CircularProgress
          size="3rem"
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      )}
      <StyledContainer inner>
        {!isFetchingSessions && sessions && sessions.length > 0 && (
          <>
            <Typography variant="h4">
              {t("eventPageParticipant.sessionsDataHeading")}
            </Typography>
            {sessions.map(function (e) {
              return (
                <SessionEntryParticipant
                  setChosenSessionSignInId={setChosenSessionSignInId}
                  session={e}
                ></SessionEntryParticipant>
              );
            })}
          </>
        )}
        {!isFetchingSessions && sessions && sessions.length === 0 && (
          <>
            <Typography variant="h4">
              {t("eventPageParticipant.sessionsDataHeading")}
            </Typography>
            <Typography>{t("eventPageParticipant.noSessions")}</Typography>
          </>
        )}
      </StyledContainer>
      {!isFetchingSessions && sessions && sessions.length > 0 && (
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
            initialState={true}
            selectedDate={event?.startDate.toDate() as Date}
            events={sessions.map(function (e) {
              return {
                event_id: e.id,
                title: e.sessionName,
                start: e.startDate.toDate(),
                end: e.endDate.toDate(),
                subtitle: e.eventBlock,
                color: colors.find(function (val) {
                  return e.eventBlock === val.name;
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
      )}
      <SignInModal
        getSessions={getSessions}
        open={!!chosenSessionSignInId}
        onClose={function () {
          setChosenSessionSignInId(undefined);
        }}
        sessionId={chosenSessionSignInId!}
      ></SignInModal>
    </StyledContainer>
  );
}
