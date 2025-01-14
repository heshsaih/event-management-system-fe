import { useEffect, useState } from "react";
import useSession, { ManagerTicketEntry } from "../../../data/useSession";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { useTranslation } from "react-i18next";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { TFunction } from "i18next";
import StyledModal from "../../../components/StyledModal";
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
import { Colors } from "../../../constants/styling";
import FilterParams from "../../../components/FilterParams";
import StyledContainer from "../../../components/StyledContainer";
import useTicket from "../../../data/useTicket";
import ConfirmActionModal from "../../../components/ConfirmActionModal";

function mapToTableData(data: ManagerTicketEntry, t: TFunction) {
  return {
    id: data.id,
    [t("sessionParticipantsModal.tableData.personalData")]:
      `${data.accountFirstName} ${data.accountLastName}`,
    [t("sessionParticipantsModal.tableData.email")]: data.accountEmail,
    [t("sessionParticipantsModal.tableData.createdAt")]: data.createdAt
      .toDate()
      .toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    [t("sessionParticipantsModal.tableData.reserved")]: data.reserve
      ? t("sessionParticipantsModal.tableData.yes")
      : t("sessionParticipantsModal.tableData.no"),
  };
}

type SessionParticipantsModalProps = {
  sessionId: string;
  open: boolean;
  onClose: () => void;
};

export default function SessionParticipantsModal(
  props: SessionParticipantsModalProps,
) {
  const {
    isFetching,
    tickets,
    getParticipants,
    setTickets,
    params,
    isSending,
    sendParticipantListToSpeaker,
  } = useSession();
  const { isPerforming, signOutParticipant } = useTicket();
  const { t } = useTranslation();
  const [confirmAction, setConfimAction] = useState<() => void>();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const mapped =
    tickets &&
    tickets.content.map(function(e) {
      return mapToTableData(e, t);
    });

  useEffect(
    function() {
      if (props.open) {
        getParticipants(props.sessionId);
      } else {
        setTickets(undefined);
      }
    },
    [props.open],
  );

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <StyledContainer inner>
        <Typography variant="h4" marginBottom={3}>
          {t("sessionParticipantsModal.pageHeading")}
        </Typography>
        <Box display="flex" width={"100%"}>
          <Box width={"100%"}>
            <FilterParams
              callback={function(params) {
                getParticipants(props.sessionId, params);
              }}
            ></FilterParams>
          </Box>
          <Box>
            <Tooltip title={t("sessionParticipantsModal.sendEmailTooltip")}>
              <Button
                autoFocus
                onClick={function() {
                  setConfimAction(function() {
                    return async function() {
                      setOpenConfirm(false);
                      sendParticipantListToSpeaker(props.sessionId);
                    };
                  });
                  setOpenConfirm(true);
                }}
                aria-label={t(
                  "sessionParticipantsModal.ariaLabels.sendEmailButton",
                )}
              >
                {isSending ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  <ForwardToInboxIcon></ForwardToInboxIcon>
                )}
              </Button>
            </Tooltip>
          </Box>
        </Box>
        {isFetching && (
          <CircularProgress
            size={"3rem"}
            sx={{
              color: Colors.RED,
            }}
          ></CircularProgress>
        )}
        {!isFetching && mapped && mapped.length === 0 && (
          <Typography>{t("sessionParticipantsModal.noEntries")}</Typography>
        )}
        <TableContainer>
          <Table>
            {!isFetching && mapped && mapped.length > 0 && (
              <>
                <TableHead>
                  {Object.keys(mapped[0]).map(function(e) {
                    if  (e === "id") return;
                    return <TableCell key={e}>{e}</TableCell>;
                  })}
                  <TableCell>Opcje</TableCell>
                </TableHead>
                <TableBody>
                  {mapped.map(function(e) {
                    return (
                      <TableRow>
                        {Object.keys(e).map(function(val) {
                          if  (val === "id") return;
                          return (
                            <TableCell>{e[val as keyof typeof e]}</TableCell>
                          );
                        })}
                        <TableCell>
                          {e[
                            t("sessionParticipantsModal.tableData.reserved")
                          ] === t("sessionParticipantsModal.tableData.no") && (
                              <Tooltip
                                title={t(
                                  "sessionParticipantsModal.signOutButtonTooltip",
                                )}
                              >
                                <Button
                                  sx={{ margin: 0 }}
                                  aria-label={t(
                                    "sessionParticipantsModal.ariaLabels.signOutButton",
                                  )}
                                  onClick={function() {
                                    setConfimAction(function() {
                                      return async function() {
                                        const result = await signOutParticipant(
                                          e.id,
                                        );
                                        if (result) {
                                          getParticipants(props.sessionId);
                                        }
                                      };
                                    });
                                    setOpenConfirm(true);
                                  }}
                                >
                                  {isPerforming ? (
                                    <CircularProgress></CircularProgress>
                                  ) : (
                                    <PersonRemoveIcon></PersonRemoveIcon>
                                  )}
                                </Button>
                              </Tooltip>
                            )}
                        </TableCell>
                      </TableRow>
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
                getParticipants(props.sessionId, {
                  size: Number.isNaN(cast) ? 20 : cast,
                });
              }}
              onPageChange={function(_, page) {
                getParticipants(props.sessionId, {
                  page: page,
                });
              }}
              page={params?.page ?? 0}
              rowsPerPage={params?.size ?? 20}
            ></TablePagination>
          </Table>
        </TableContainer>
        <ConfirmActionModal
          open={openConfirm}
          onClose={function() {
            setOpenConfirm(false);
          }}
          confirmAction={confirmAction!}
        ></ConfirmActionModal>
      </StyledContainer>
    </StyledModal>
  );
}
