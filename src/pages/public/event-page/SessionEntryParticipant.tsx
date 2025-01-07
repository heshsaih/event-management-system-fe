import { TFunction } from "i18next";
import { SessionForParticipant } from "../../../data/useEventParticipant";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { Colors, Styling } from "../../../constants/styling";
import { ExpandMore } from "@mui/icons-material";

function mapSessionDataToColumn(session: SessionForParticipant, t: TFunction) {
  return {
    [t("eventPageParticipant.sessionTableRow.descriptionPl")]:
      session.descriptionPl,
    [t("eventPageParticipant.sessionTableRow.descriptionEn")]:
      session.descriptionEn,
    [t("eventPageParticipant.sessionTableRow.startDate")]:
      session.startDate.isValid()
        ? session.startDate.toDate().toLocaleString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : t("eventPageParticipant.sessionTableRow.noDate"),
    [t("eventPageParticipant.sessionTableRow.endDate")]:
      session.endDate.isValid()
        ? session.endDate.toDate().toLocaleString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : t("eventPageParticipant.sessionTableRow.noDate"),
    [t("eventPageParticipant.sessionTableRow.location")]:
      `${t("eventPageParticipant.sessionTableRow.room")} ${session.room.roomNumber}, ${t("eventPageParticipant.sessionTableRow.building")} ${session.room.locationName}`,
    [t("eventPageParticipant.sessionTableRow.address")]:
      `${session.room.street} ${session.room.buildingNumber}, ${session.room.postalCode} ${session.room.city}`,
    [t("eventPageParticipant.sessionTableRow.maxSeats")]: session.maxSeats,
    [t("eventPageParticipant.sessionTableRow.availableSeats")]:
      session.availableSeats,
    [t("eventPageParticipant.sessionTableRow.eventBlock")]: session.eventBlock,
    [t("eventPageParticipant.sessionTableRow.speaker")]:
      `${session.speaker.titleName} ${session.speaker.firstName} ${session.speaker.lastName}`,
  };
}

type SessionEntryParticipantProps = {
  session: SessionForParticipant;
};

export default function SessionEntryParticipant(
  props: SessionEntryParticipantProps,
) {
  const { t } = useTranslation();
  const mappedSession = mapSessionDataToColumn(props.session, t);
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const openAccordion = function () {
    setOpen(true);
    const currentRect = ref.current?.getBoundingClientRect() as DOMRect;
    const scrollValue = currentRect.top + window.scrollY - 100;
    window.scrollTo({
      top: scrollValue,
      behavior: "smooth",
    });
  };

  const closeAccordion = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setOpen(false);
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
      ref={ref}
      expanded={open}
      onChange={function () {
        open ? closeAccordion() : openAccordion();
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore></ExpandMore>}>
        <Typography variant="h5">{`${props.session.sessionName} - ${props.session.sessionType}`}</Typography>
        <Typography flexGrow={1}></Typography>
        <Typography variant="h6">{`${t("eventPageParticipant.sessionAvailableSeats")}: ${props.session.availableSeats}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table>
            <TableBody>
              {Object.keys(mappedSession).map(function (e) {
                return (
                  <TableRow>
                    <TableCell>{e}</TableCell>
                    <TableCell>
                      {mappedSession[e as keyof typeof mappedSession]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
