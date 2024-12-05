import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import AddIcon from "@mui/icons-material/Add";
import useEvent, { EventBrief } from "../../../data/useEvent";
import { useEffect } from "react";
import FilterParams from "../../../components/FilterParams";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../constants/styling";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

function mapToColumns(event: EventBrief, t: TFunction) {
  return {
    id: event.id,
    [t("eventsPageManager.tableColumns.name")]: event.name,
    [t("eventsPageManager.tableColumns.active")]: event.active
      ? t("eventsPageManager.tableColumns.yes")
      : t("eventsPageManager.tableColumns.no"),
    [t("eventsPageManager.tableColumns.startDate")]: event.startDate.isValid()
      ? event.startDate.toDate().toLocaleString("pl-PL")
      : t("eventsPageManager.tableColumns.noStartDate"),
    [t("eventsPageManager.tableColumns.endDate")]: event.endDate.isValid()
      ? event.endDate.toDate().toLocaleString("pl-PL")
      : t("eventsPageManager.tableColumns.noEndDate"),
    [t("eventsPageManager.tableColumns.registrationStartDate")]:
      event.registrationStartDate.isValid()
        ? event.registrationStartDate.toDate().toLocaleString("pl-PL")
        : t("eventsPageManager.tableColumns.noRegistrationStartDate"),
    [t("eventsPageManager.tableColumns.createdAt")]: event.createdAt.isValid()
      ? event.createdAt.toDate().toLocaleString("pl-PL")
      : t("eventsPageManager.tableColumns.noCreatedAt"),
    [t("eventsPageManager.tableColumns.updatedAt")]: event.updatedAt.isValid()
      ? event.updatedAt.toDate().toLocaleString("pl-PL")
      : t("eventsPageManager.tableColumns.noUpdatedAt"),
  };
}

export default function EventsPageManager() {
  const { getAllEvents, isFetching, params, events } = useEvent();
  const {t} = useTranslation();
  const navigate = useNavigate();

  useEffect(function() {
    getAllEvents();
  }, []);

  const mappedEvents = events && events.map(function (e) {
    return mapToColumns(e, t);
  });

  return (
    <StyledContainer>
      <Typography variant="h3" marginBottom={4}>
        {t("eventsPageManager.pageHeader")}
      </Typography>
      <StyledContainer
        sx={{
          paddingTop: "0",
        }}
      >
        <Box width={"100%"} display={"flex"}>
          <Box flexGrow={1}>
            <FilterParams callback={getAllEvents}></FilterParams>
          </Box>
          <Box>
            <Tooltip title={t("eventsPageManager.addEventButtonTooltip")}>
              <Button
                onClick={function() {
                  navigate("/manager/events/create?step=0");
                }}
              >
                <AddIcon></AddIcon>
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <TableContainer>
          {isFetching && (
            <StyledContainer inner sx={{ padding: "0" }}>
              <CircularProgress
                size={"3rem"}
                sx={{ color: Colors.RED }}
              ></CircularProgress>
            </StyledContainer>
          )}
          <Table>
            {!isFetching && mappedEvents && mappedEvents.length > 0 && (
              <>
                <TableHead>
                  {Object.keys(mappedEvents[0]).map(function(e) {
                    if (e === "id") return;
                    return <TableCell>{e}</TableCell>;
                  })}
                </TableHead>
                <TableBody>
                  {mappedEvents.map(function(e) {
                    return (
                      <TableRow
                        hover
                        onClick={function() {
                          navigate(`/manager/events/${e.id}`);
                        }}
                      >
                        {Object.keys(e).map(function(val) {
                          if (val === "id") return;
                          return (
                            <TableCell>{e[val as keyof typeof e]}</TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </>
            )}
            <TablePagination
              count={10}
              rowsPerPageOptions={[1, 2, 5, 10, 20, 50]}
              onRowsPerPageChange={function(e) {
                const cast = Number(e.target.value);
                getAllEvents({ size: Number.isNaN(cast) ? 20 : cast });
              }}
              onPageChange={function(_, page) {
                getAllEvents({
                  page: page,
                });
              }}
              page={params?.page ?? 0}
              rowsPerPage={params?.size ?? 20}
            ></TablePagination>
          </Table>
        </TableContainer>
      </StyledContainer>
    </StyledContainer>
  );
}
