import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { EventForParticipantBrief } from "../../../data/useEventParticipant";
import { Colors, Styling } from "../../../constants/styling";
import { TFunction } from "i18next";
import { ExpandMore } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import StyledContainer from "../../../components/StyledContainer";
import { useNavigate } from "react-router-dom";

function mapToColumns(event: EventForParticipantBrief, t: TFunction) {
  return {
    id: event.id,
    [t("eventsPageParticipant.tableColumns.name")]: event.name,
    [t("eventsPageParticipant.tableColumns.startDate")]:
      event.startDate.isValid()
        ? event.startDate.toDate().toLocaleString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : t("eventsPageParticipant.tableColumns.noDate"),
    [t("eventsPageParticipant.tableColumns.endDate")]: event.endDate.isValid()
      ? event.endDate.toDate().toLocaleString("pl-PL", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : t("eventsPageParticipant.tableColumns.noDate"),
  };
}

type EventEntryProps = {
  event: EventForParticipantBrief;
};

export default function EventEntry(props: EventEntryProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const mappedEvent = mapToColumns(props.event, t);
  const navigate = useNavigate();

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
        <Typography variant="h5">{props.event.name}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)) ,url('data:image/&;base64,${props.event.image.data}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <TableContainer>
          <Table>
            <TableBody>
              {Object.keys(mappedEvent).map(function (e) {
                if (e !== "id") {
                  return (
                    <TableRow>
                      <TableCell>{e}</TableCell>
                      <TableCell>
                        {mappedEvent[e as keyof typeof mappedEvent]}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledContainer inner sx={{ padding: "0" }}>
          <Tooltip title="Kliknij, aby dowiedzieć się więcej">
            <Button
              onClick={function () {
                navigate(`/events/${props.event.id}`);
              }}
            >
              Wyświetl
            </Button>
          </Tooltip>
        </StyledContainer>
      </AccordionDetails>
    </Accordion>
  );
}
