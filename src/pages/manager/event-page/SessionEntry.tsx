import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import * as SessionsPageManager from "./SessionsPageManager";
import { Colors, Styling } from "../../../constants/styling";
import { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

type SessionEntryProps = {
  entry: SessionsPageManager.SessionEntry;
  openUpdate: () => void;
  showParticipants: () => void;
};


export default function SessionEntry(props: SessionEntryProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const openAccordion = function() {
    setOpen(true);
    const currentRect = ref.current?.getBoundingClientRect() as DOMRect;
    const scrollValue = currentRect.top + window.scrollY - 100;
    window.scrollTo({
      top: scrollValue,
      behavior: "smooth",
    });
  };

  const closeAccordion = function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setOpen(false);
  };

  return (
    <Accordion
      aria-label={t("eventPageManager.sessionEntry.ariaLabels.accordion")}
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
      onChange={function() {
        open ? closeAccordion() : openAccordion();
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}>
        <Typography fontSize={Styling.HEADING_SIZE}>{props.entry.Nazwa}</Typography>
        <Typography flexGrow={1}></Typography>
        <Typography fontSize={Styling.HEADING_SIZE} marginRight={3}>
          {
            props.entry[
            t("eventPageManager.sessionsPage.sessionDataColumns.eventBlock")
            ]
          }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table>
            <TableBody>
              {Object.keys(props.entry).map(function(e) {
                if (e === "Nazwa" || e === "id") return;
                return (
                  <TableRow>
                    <TableCell>{e}</TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "pre",
                        textWrap: "wrap",
                      }}
                    >
                      {props.entry[e as keyof typeof props.entry]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <Tooltip
            title={t(
              "eventPageManager.sessionEntry.updateSessionButtonTooltip",
            )}
          >
            <Button
              aria-label={t(
                "eventPageManager.sessionEntry.ariaLabels.updateSessionButton",
              )}
              onClick={function() {
                closeAccordion();
                props.openUpdate();
              }}
            >
              {t("eventPageManager.sessionEntry.updateSessionButtonText")}
            </Button>
          </Tooltip>
          <Tooltip
            title={t(
              "eventPageManager.sessionEntry.showParticipantsButtonTootlip",
            )}
          >
            <Button
              aria-label={t(
                "eventPageManager.sessionEntry.ariaLabels.showParticipantsButton",
              )}
              onClick={function() {
                closeAccordion();
                props.showParticipants();
              }}
            >
              {t("eventPageManager.sessionEntry.showParticipantsButtonText")}
            </Button>
          </Tooltip>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
