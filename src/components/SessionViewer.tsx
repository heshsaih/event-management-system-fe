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

const muiDefaultTheme = createTheme({
  palette: {
    primary: {
      main: Colors.RED,
    },
  },
});

const translations = {
  navigation: {
    month: "Miesiąc",
    week: "Tydzień",
    day: "Dzień",
    today: "Dzisiaj",
    agenda: "Podsumowanie",
  },
  form: {
    addTitle: "Add Event",
    editTitle: "Edit Event",
    confirm: "Confirm",
    delete: "Delete",
    cancel: "Cancel",
  },
  event: {
    title: "Tytuł",
    subtitle: "Podtytuł",
    start: "Czas rozpoczęcia",
    end: "Czas zakończenia",
    allDay: "Cały dzień",
  },
  validation: {
    required: "Required",
    invalidEmail: "Invalid Email",
    onlyNumbers: "Only Numbers Allowed",
    min: "Minimum {{min}} letters",
    max: "Maximum {{max}} letters",
  },
  moreEvents: "More...",
  noDataToDisplay: "Żadna sesja nie dzieje się tego dnia",
  loading: "Loading...",
};

type SessionViewerProps = {
  events: SchedulerProps["events"];
  selectedDate: SchedulerProps["selectedDate"];
  scrollOnClose?: () => void;
  expandable?: boolean;
};

export default function SessionViewer({
  events,
  selectedDate,
  scrollOnClose,
}: SessionViewerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const openAccordion = function () {
    setOpen(true);
    const currentRect = ref.current?.getBoundingClientRect() as DOMRect;
    const scrollValue = currentRect.top + window.scrollY - 250;
    window.scrollTo({
      top: scrollValue,
      behavior: "smooth",
    });
  };

  const closeAccordion = function () {
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
        border: `1px solid ${Colors.GREY_BORDER}`
      }}
    >
      <Tooltip title="Kliknij, aby rozwinąć">
      <AccordionSummary expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}>
        Kliknij, aby wyświetlić sesje w kalendarzu
      </AccordionSummary>
      </Tooltip>
      <AccordionDetails>
        <Typography marginY={"1rem"} variant="h4">
          Aktualnie dodane konferencje
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
              selectedDate={new Date(selectedDate.setDate(selectedDate.getDate() + 1))}
              view="week"
              week={{
                /*@ts-ignore*/
                weekDays: [1, 2, 3, 4, 5, 6, 7],
                startHour: 8,
                endHour: 21,
                step: 60,
                weekStartOn: 0,
              }}
              hourFormat="24"
              editable={false}
              deletable={false}
              stickyNavigation
              events={events.map(function (e) {
                return {
                  color: Colors.RED,
                  ...e,
                };
              })}
              translations={translations}
            ></Scheduler>
          </ThemeProvider>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
