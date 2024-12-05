import {
  alpha,
  Box,
  IconButton,
  Modal,
  ModalProps,
  Tooltip,
} from "@mui/material";
import StyledContainer from "./StyledContainer";
import { defaultTheme } from "../style/defaultTheme";
import CloseIcon from "@mui/icons-material/Close";
import FocusTrap from "@mui/material/Unstable_TrapFocus";

type StyledModalProps = Omit<ModalProps, "onClose"> & {
  onClose: () => void;
};

export default function StyledModal(props: StyledModalProps) {
  const { sx, children, ...rest } = props;
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      {...rest}
    >
      <FocusTrap open>
        <StyledContainer
          sx={{
            position: "absolute",
            backgroundColor: alpha(defaultTheme.palette.background.default, 1),
            maxWidth: "60rem",
            maxHeight: "50rem",
            paddingTop: 0,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              position: "relative",
              alignSelf: "end",
              top: 0,
              right: 0,
            }}
          >
            <Tooltip title="Zamknij okno">
              <IconButton onClick={props.onClose}>
                <CloseIcon></CloseIcon>
              </IconButton>
            </Tooltip>
          </Box>
          {children}
        </StyledContainer>
      </FocusTrap>
    </Modal>
  );
}
