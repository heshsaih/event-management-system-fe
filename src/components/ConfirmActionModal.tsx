import { Box, Button, Tooltip, Typography } from "@mui/material";
import StyledModal from "./StyledModal";
import { useTranslation } from "react-i18next";

type ConfirmActionModalProps = {
  open: boolean;
  onClose: () => void;
  confirmAction: () => void;
};

export default function ConfirmActionModal(props: ConfirmActionModalProps) {
  const { t } = useTranslation();
  return (
    <StyledModal
      open={props.open}
      onClose={props.onClose}
      innerContainerSx={{
        width: "fit-content",
        paddingBottom: "3rem"
      }}
    >
      <>
        <Typography variant="h4">
          {t("confirmActionModal.pageHeading")}
        </Typography>
        <Typography>{t("confirmActionModal.pageBody")}</Typography>
        <Box>
          <Tooltip title={t("confirmActionModal.confirmButtonTooltip")}>
            <Button
              onClick={function() {
                props.confirmAction();
                props.onClose();
              }}
            >
              {t("confirmActionModal.confrimButtonText")}
            </Button>
          </Tooltip>
          <Tooltip title={t("confirmActionModal.denyButtonTooltip")}>
            <Button autoFocus onClick={props.onClose}>
              {t("confirmActionModal.denyButtonText")}
            </Button>
          </Tooltip>
        </Box>
      </>
    </StyledModal>
  );
}
