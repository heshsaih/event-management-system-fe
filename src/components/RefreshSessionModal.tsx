import { useEffect, useState } from "react";
import useAccountStore from "../data/useAccountStore";
import StyledModal from "./StyledModal";
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useLogin from "../data/useLogin";
import { useNavigate } from "react-router-dom";

export default function RefreshSessionModal() {
  const state = useAccountStore(function(state) {
    return state;
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isFetching, refreshSession } = useLogin(navigate);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(
    function() {
      if (state.parsedToken) {
        const remainingTime =
          state.parsedToken.exp * 1000 - new Date().getTime();

        const id = setTimeout(() => {
          setOpen(true);
        }, remainingTime - 60000);

        return () => clearTimeout(id);
      }
    },
    [state.parsedToken],
  );

  return (
    <StyledModal
      open={open}
      onClose={function() {
        setOpen(false);
      }}
    >
      <>
        <Typography variant="h4">
          {t("refreshSessionModal.pageHeading")}
        </Typography>
        <Typography>{t("refreshSessionModal.pageBody")}</Typography>
        <Box>
          <Tooltip title={t("refreshSessionModal.confirmButtonTooltip")}>
            <Button
              onClick={async function () {
                await refreshSession();
                setOpen(false);
              }}
              aria-label={t("refreshSessionModal.ariaLabels.confirmButton")}
            >
              {isFetching ? (
                <CircularProgress></CircularProgress>
              ) : (
                t("refreshSessionModal.confirmButtonText")
              )}
            </Button>
          </Tooltip>
          <Tooltip title={t("refreshSessionModal.cancelButtonTooltip")}>
            <Button
              onClick={function () {
                setOpen(false);
              }}
              aria-label={t("refreshSessionModal.ariaLabels.cancelButton")}
            >
              {isFetching ? (
                <CircularProgress></CircularProgress>
              ) : (
                t("refreshSessionModal.cancelButtonText")
              )}
            </Button>
          </Tooltip>
        </Box>
      </>
    </StyledModal>
  );
}
