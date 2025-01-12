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
import StyledModal from "../../../components/StyledModal";
import useEventParticipant, {
  SessionForParticipant,
} from "../../../data/useEventParticipant";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { Colors } from "../../../constants/styling";
import ConfirmActionModal from "../../../components/ConfirmActionModal";

type SignInModalProps = {
  open: boolean;
  onClose: () => void;
  sessionId: string;
  getSessions: () => void;
};

function mapDataToTable(data: SessionForParticipant, t: TFunction) {
  return {
    [t("signInModal.tableData.name")]: data.sessionName,
    [t("signInModal.tableData.startDate")]: data.startDate
      .toDate()
      .toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [t("signInModal.tableData.endDate")]: data.endDate
      .toDate()
      .toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [t("signInModal.tableData.location")]:
      `${t("signInModal.tableData.room")} ${data.room.roomNumber}, ${t("signInModal.tableData.building")} ${data.room.locationName}`,
    [t("signInModal.tableData.address")]:
      `${data.room.street} ${data.room.buildingNumber}, ${data.room.postalCode} ${data.room.city}`,
    [t("signInModal.tableData.availableSeats")]: data.availableSeats,
    [t("signInModal.tableData.eventBlock")]: data.eventBlock,
    [t("signInModal.tableData.speaker")]:
      `${data.speaker.titleName} ${data.speaker.firstName} ${data.speaker.lastName}`,
  };
}

export default function SignInModal(props: SignInModalProps) {
  const {
    session,
    signIn,
    getSession,
    isSigning,
    setSession,
    isFetchingSession,
  } = useEventParticipant();
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const mappedSession = session && mapDataToTable(session, t);

  useEffect(
    function() {
      if (props.open) {
        getSession(props.sessionId);
      } else {
        setSession(undefined);
      }
    },
    [props.sessionId],
  );

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">{t("signInModal.pageHeading")}</Typography>
        <Typography>{t("signInModal.question")}</Typography>
        {isFetchingSession && (
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        {!isFetchingSession && mappedSession && (
          <>
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.keys(mappedSession).map(function(e) {
                    if (
                      e ===
                      t("signInModal.tableData.availableSeats")
                    ) {
                      return (
                        <TableRow>
                          <TableCell
                            sx={{
                              color:
                                session.availableSeats === 0
                                  ? Colors.RED
                                  : "black",
                            }}
                          >
                            {e}
                          </TableCell>
                          <TableCell
                            sx={{
                              color:
                                session.availableSeats === 0
                                  ? Colors.RED
                                  : "black",
                            }}
                          >
                            {mappedSession[e as keyof typeof mappedSession]}
                          </TableCell>
                        </TableRow>
                      );
                    }
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
            <Box>
              <Tooltip title={t("signInModal.signInButtonTooltip")}>
                <Button
                  disabled={isSigning}
                  onClick={function() {
                    setOpenConfirm(true);
                  }}
                  aria-label={t("signInModal.ariaLabels.signInButton")}
                >
                  {!isSigning ? (
                    t("signInModal.signInButtonText")
                  ) : (
                    <CircularProgress></CircularProgress>
                  )}
                </Button>
              </Tooltip>
              <Tooltip title={t("signInModal.cancelButtonTooltip")}>
                <Button
                  disabled={isSigning}
                  onClick={props.onClose}
                  autoFocus
                  aria-label={t("signInModal.ariaLabels.cancelButton")}
                >
                  {!isSigning ? (
                    t("signInModal.cancelButtonText")
                  ) : (
                    <CircularProgress></CircularProgress>
                  )}
                </Button>
              </Tooltip>
            </Box>
          </>
        )}
        <ConfirmActionModal
          open={openConfirm}
          onClose={function() {
            setOpenConfirm(false);
          }}
          confirmAction={async function() {
            setOpenConfirm(false);
            const result = await signIn(props.sessionId);
            if (result) {
              props.onClose();
              props.getSessions();
            }
          }}
        ></ConfirmActionModal>
      </>
    </StyledModal>
  );
}
