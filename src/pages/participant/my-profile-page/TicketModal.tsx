import { useEffect, useState } from "react";
import useEventParticipant, {
  SessionForParticipant,
} from "../../../data/useEventParticipant";
import StyledModal from "../../../components/StyledModal";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Colors } from "../../../constants/styling";
import { useNavigate } from "react-router-dom";
import ConfirmActionModal from "../../../components/ConfirmActionModal";
import dayjs from "dayjs";

function mapDataToTable(data: SessionForParticipant, t: TFunction) {
  return {
    [t("myProfile.ticketModal.tableData.sessionName")]: data.sessionName,
    [t("myProfile.ticketModal.tableData.startDate")]: data.startDate
      .toDate()
      .toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [t("myProfile.ticketModal.tableData.endDate")]: data.endDate
      .toDate()
      .toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [t("myProfile.ticketModal.tableData.sessionType")]: data.sessionType,
    [t("myProfile.ticketModal.tableData.eventBlock")]: data.eventBlock,
    [t("myProfile.ticketModal.tableData.location")]:
      `${data.room.roomNumber}, ${data.room.locationName}`,
    [t("myProfile.ticketModal.tableData.address")]:
      `${data.room.street} ${data.room.buildingNumber}, ${data.room.postalCode} ${data.room.city}`,
    [t("myProfile.ticketModal.tableData.speaker")]:
      `${data.speaker.titleName} ${data.speaker.firstName} ${data.speaker.lastName}`,
    [t("myProfile.ticketModal.tableData.reserveList")]: data.ticket?.reserve
      ? t("myProfile.ticketModal.tableData.yes")
      : t("myProfile.ticketModal.tableData.no"),
  };
}

type TicketModalProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  getTickets: () => void;
};

export default function TicketModal(props: TicketModalProps) {
  const {
    setSession,
    getSession,
    session,
    isFetchingSession,
    signOut,
    isSigning,
  } = useEventParticipant();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  useEffect(
    function() {
      if (props.open) {
        getSession(props.id);
      } else {
        setSession(undefined);
      }
    },
    [props.id],
  );

  const mapped = session && mapDataToTable(session, t);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">
          {t("myProfile.ticketModal.heading")}
        </Typography>
        {isFetchingSession && (
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        {!isFetchingSession && mapped && (
          <TableContainer>
            <Table>
              <TableBody>
                {Object.keys(mapped).map(function(e) {
                  return (
                    <TableRow>
                      <TableCell>{e}</TableCell>
                      <TableCell>{mapped[e as keyof typeof mapped]}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {session?.startDate.isAfter(dayjs()) && (
          <Box>
            <Tooltip title={t("myProfile.ticketModal.showEventButtonTooltip")}>
              <Button
                disabled={isSigning}
                aria-label={t(
                  "myProfile.ticketModal.ariaLabels.showEventButton",
                )}
                onClick={function() {
                  navigate(`/events/${session?.eventId!}`);
                }}
              >
                {!isSigning ? (
                  t("myProfile.ticketModal.showEventButtonText")
                ) : (
                  <CircularProgress></CircularProgress>
                )}
              </Button>
            </Tooltip>
            <Tooltip title={t("myProfile.ticketModal.signOutButtonTooltip")}>
              <Button
                disabled={isSigning}
                aria-label={t("myProfile.ticketModal.ariaLabels.signOutButton")}
                onClick={function() {
                  setOpenConfirm(true);
                }}
              >
                {!isSigning ? (
                  t("myProfile.ticketModal.signOutButtonText")
                ) : (
                  <CircularProgress></CircularProgress>
                )}
              </Button>
            </Tooltip>
          </Box>
        )}
        <ConfirmActionModal
          open={openConfirm}
          onClose={function() {
            setOpenConfirm(false);
          }}
          confirmAction={async function() {
            setOpenConfirm(false);
            const result = await signOut(session?.ticket?.id!);

            if (result) {
              props.getTickets();
              props.onClose();
            }
          }}
        ></ConfirmActionModal>
      </>
    </StyledModal>
  );
}
