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
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";

function mapToColumns(event: EventBrief, t: TFunction) {
  return {
    id: event.id,
    [t("eventsPageManager.tableColumns.name")]: event.name,
    [t("eventsPageManager.tableColumns.active")]: event.active
      ? t("eventsPageManager.tableColumns.yes")
      : t("eventsPageManager.tableColumns.no"),
    [t("eventsPageManager.tableColumns.startDate")]: event.startDate.isValid()
      ? event.startDate.toDate().toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      : t("eventsPageManager.tableColumns.noStartDate"),
    [t("eventsPageManager.tableColumns.endDate")]: event.endDate.isValid()
      ? event.endDate.toDate().toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      : t("eventsPageManager.tableColumns.noEndDate"),
    [t("eventsPageManager.tableColumns.registrationStartDate")]:
      event.registrationStartDate.isValid()
        ? event.registrationStartDate.toDate().toLocaleString("pl-PL", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(function() {
    getAllEvents();
  }, []);

  const mappedEvents =
    events &&
    events.content.map(function(e) {
      return mapToColumns(e, t);
    });

  return (
    <StyledContainer
      sx={{
        paddingTop: 0,
      }}
    >
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb current navigateTo="/manager/events">
          {t("breadcrumbsLabels.events")}
        </Breadcrumb>
      </StyledBreadcrumbs>
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
                aria-label={t("eventsPageManager.ariaLabels.addEventButton")}
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
          {!isFetching && mappedEvents && mappedEvents.length === 0 && (
            <Typography>{t("eventsPageManager.noTableEntries")}</Typography>
          )}
          <Table>
            {!isFetching && mappedEvents && mappedEvents.length > 0 && (
              <>
                <TableHead>
                  {Object.keys(mappedEvents[0]).map(function(e) {
                    if (e === "id") return;
                    return <TableCell key={e}>{e}</TableCell>;
                  })}
                </TableHead>
                <TableBody>
                  {mappedEvents.map(function(e) {
                    return (
                      <Tooltip
                        key={e.id}
                        title={t("eventsPageManager.tableEntryTooltip")}
                      >
                        <TableRow
                          tabIndex={0}
                          aria-label={
                            t("eventsPageManager.ariaLabels.tableEntry") +
                            e[t("eventsPageManager.tableColumns.name")]
                          }
                          hover
                          onClick={function() {
                            navigate(`/manager/events/${e.id}`);
                          }}
                          onKeyUp={function(ev) {
                            if (ev.key === "Enter") {
                              navigate(`/manager/events/${e.id}`);
                            }
                          }}
                        >
                          {Object.keys(e).map(function(val) {
                            if (val === "id") return;
                            return (
                              <TableCell key={val}>
                                {e[val as keyof typeof e]}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </Tooltip>
                    );
                  })}
                </TableBody>
              </>
            )}
            <TablePagination
              count={events?.totalElements ?? 10}
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
