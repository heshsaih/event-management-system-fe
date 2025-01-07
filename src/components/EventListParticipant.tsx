import { CircularProgress, Typography } from "@mui/material";
import StyledContainer from "./StyledContainer";
import { Colors } from "../constants/styling";
import EventEntry from "../pages/public/events-page/EventEntry";
import useEventParticipant from "../data/useEventParticipant";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function EventListParticipant() {
  const { getAllEvents, isFetching, events } = useEventParticipant();
  const { t } = useTranslation();

  useEffect(function() {
    getAllEvents();
  }, []);

  return (
    <StyledContainer
      inner
      sx={{
        paddingTop: "0",
      }}
    >
      {isFetching && (
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      )}
      {!isFetching &&
        events &&
        events.length > 0 &&
        events.map(function (e) {
          return <EventEntry event={e}></EventEntry>;
        })}
      {(!isFetching && !events) ||
        (!isFetching && events && events.length === 0 && (
          <Typography>{t("eventsPageParticipant.noTableEntries")}</Typography>
        ))}
    </StyledContainer>
  );
}
