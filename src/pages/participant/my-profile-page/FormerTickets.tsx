import { useEffect, useState } from "react";
import StyledContainer from "../../../components/StyledContainer";
import useEventParticipant, {
  SessionForParticipant,
  TicketTime,
} from "../../../data/useEventParticipant";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
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
import { Colors } from "../../../constants/styling";
import FilterParams from "../../../components/FilterParams";
import TicketModal from "./TicketModal";

function mapToTable(data: SessionForParticipant, t: TFunction) {
  return {
    id: data.id,
    [t("myProfile.tickets.tableData.sessionName")]: data.sessionName,
    [t("myProfile.tickets.tableData.sessionType")]: data.sessionType,
    [t("myProfile.tickets.tableData.startDate")]: data.startDate
      .toDate()
      .toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [t("myProfile.tickets.tableData.endDate")]: data.endDate
      .toDate()
      .toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [t("myProfile.tickets.tableData.place")]:
      `${data.room.locationName}, ${data.room.roomNumber}`,
    [t("myProfile.tickets.tableData.reserveList")]: data.ticket?.reserve
      ? t("myProfile.tickets.tableData.yes")
      : t("myProfile.tickets.tableData.no"),
  };
}

export default function FormerTickers() {
  const { tickets, getTickets, isFetching, params } = useEventParticipant();
  const { t } = useTranslation();
  const [chosenId, setChosenId] = useState<string>();

  useEffect(function() {
    getTickets(TicketTime.PAST);
  }, []);

  const mapped =
    tickets &&
    tickets.content.map(function(e) {
      return mapToTable(e, t);
    });

  return (
    <StyledContainer inner sx={{ paddingY: "1rem" }}>
      {isFetching && (
        <CircularProgress
          size="3rem"
          sx={{
            color: Colors.RED,
          }}
        ></CircularProgress>
      )}
      <FilterParams
        sortOptions={[
          {
            label: t("filterParams.orderByOptions.createdAt"),
            value: "createdAt",
          },
          {
            label: t("filterParams.orderByOptions.updatedAt"),
            value: "updatedAt",
          },
        ]}
        callback={function(e) {
          getTickets(TicketTime.FUTURE, e);
        }}
      ></FilterParams>
      {!isFetching && mapped && mapped.length === 0 && (
        <Typography>{t("myProfile.tickets.noEntries")}</Typography>
      )}

      <TableContainer>
        <Table>
          {!isFetching && mapped && mapped.length > 0 && (
            <>
              <TableHead>
                {Object.keys(mapped[0]).map(function(e) {
                  if (e === "id") return;
                  return <TableCell key={e}>{e}</TableCell>;
                })}
              </TableHead>
              <TableBody>
                {mapped.map(function(e) {
                  return (
                    <Tooltip title={t("myProfile.tickets.tableEntryTooltip")}>
                      <TableRow
                        tabIndex={0}
                        hover
                        onClick={function() {
                          setChosenId(e.id);
                        }}
                        onKeyUp={function(ev) {
                          if (ev.key === "Enter") {
                            setChosenId(e.id);
                          }
                        }}
                        key={e.id}
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
            count={tickets?.totalElements ?? 10}
            rowsPerPageOptions={[1, 2, 5, 10, 20, 50]}
            onRowsPerPageChange={function(e) {
              const cast = Number(e.target.value);
              getTickets(TicketTime.FUTURE, {
                size: Number.isNaN(cast) ? 20 : cast,
              });
            }}
            onPageChange={function(_, page) {
              getTickets(TicketTime.FUTURE, {
                page: page,
              });
            }}
            page={params?.page ?? 0}
            rowsPerPage={params?.size ?? 20}
          ></TablePagination>
        </Table>
      </TableContainer>
      <TicketModal
        getTickets={function() {
          getTickets(TicketTime.PAST);
        }}
        open={!!chosenId}
        onClose={function() {
          setChosenId(undefined);
        }}
        id={chosenId!}
      ></TicketModal>
    </StyledContainer>
  );
}
