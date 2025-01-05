import { Scheduler } from "@aldabil/react-scheduler";
import { SchedulerProps } from "@aldabil/react-scheduler/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  createTheme,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef, useState } from "react";
import { Colors, Styling } from "../constants/styling";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

const muiDefaultTheme = createTheme({
  palette: {
    primary: {
      main: Colors.RED,
    },
  },
});

const translations = function(t: TFunction) {
  return {
    navigation: {
      month: t("sessionViewer.translations.navigation.month"),
      week: t("sessionViewer.translations.navigation.week"),
      day: t("sessionViewer.translations.navigation.day"),
      today: t("sessionViewer.translations.navigation.today"),
      agenda: t("sessionViewer.translations.navigation.agenda"),
    },
    form: {
      addTitle: t("sessionViewer.translations.form.addTitle"),
      editTitle: t("sessionViewer.translations.form.editTitle"),
      confirm: t("sessionViewer.translations.form.confirm"),
      delete: t("sessionViewer.translations.form.delete"),
      cancel: t("sessionViewer.translations.form.cancel"),
    },
    event: {
      title: t("sessionViewer.translations.event.title"),
      subtitle: t("sessionViewer.translations.event.subtitle"),
      start: t("sessionViewer.translations.event.start"),
      end: t("sessionViewer.translations.event.end"),
      allDay: t("sessionViewer.translations.event.allDay"),
    },
    validation: {
      required: t("sessionViewer.translations.validation.required"),
      invalidEmail: t("sessionViewer.translations.validation.invalidEmail"),
      onlyNumbers: t("sessionViewer.translations.validation.onlyNumbers"),
      min: t("sessionViewer.translations.validation.min"),
      max: t("sessionViewer.translations.validation.max"),
    },
    moreEvents: "More...",
    noDataToDisplay: "Żadna sesja nie dzieje się tego dnia",
    loading: "Loading...",
  };
};

type SessionViewerProps = {
  events: SchedulerProps["events"];
  selectedDate: SchedulerProps["selectedDate"];
  scrollOnClose?: () => void;
  initialState?: boolean;
};

export default function SessionViewer({
  events,
  selectedDate,
  scrollOnClose,
  initialState,
}: SessionViewerProps) {
  const [open, setOpen] = useState<boolean>(initialState ?? false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const openAccordion = function() {
    setOpen(true);
    const currentRect = ref.current?.getBoundingClientRect() as DOMRect;
    const scrollValue = currentRect.top + window.scrollY - 250;
    window.scrollTo({
      top: scrollValue,
      behavior: "smooth",
    });
  };

  const closeAccordion = function() {
    setOpen(false);
    if (scrollOnClose) {
      scrollOnClose();
    }
  };

  return (
    <Accordion
      elevation={0}
      expanded={open}
      onChange={open ? closeAccordion : openAccordion}
      sx={{
        boxShadow: 0,
        "&:before": { display: "none" },
        width: "100%",
        margin: "0.5rem",
        borderRadius: Styling.BORDER_RADIUS,
        border: `1px solid ${Colors.GREY_BORDER}`,
      }}
    >
      <Tooltip title={t("sessionViewer.accordionTooltip")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}>
          {t("sessionViewer.accordionText")}
        </AccordionSummary>
      </Tooltip>
      <AccordionDetails>
        <Typography marginY={"1rem"} variant="h4">
          {t("sessionViewer.componentHeading")}
        </Typography>
        <Box
          sx={{
            overflow: "auto",
            maxHeight: "30rem",
          }}
          ref={ref}
        >
          <ThemeProvider theme={muiDefaultTheme}>
            <Scheduler
              selectedDate={
                new Date(selectedDate.setDate(selectedDate.getDate() - 1))
              }
              view="week"
              week={{
                /*@ts-ignore*/
                weekDays: [1, 2, 3, 4, 5, 6, 7],
                startHour: 0,
                endHour: 24,
                step: 60,
                weekStartOn: 0,
              }}
              hourFormat="24"
              editable={false}
              deletable={false}
              stickyNavigation
              events={events.map(function(e) {
                return {
                  color: Colors.RED,
                  ...e,
                };
              })}
              translations={translations(t)}
            ></Scheduler>
          </ThemeProvider>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
