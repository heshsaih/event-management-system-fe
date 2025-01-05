import {
  alpha,
  Box,
  IconButton,
  Modal,
  ModalProps,
  SxProps,
  Tooltip,
} from "@mui/material";
import StyledContainer from "./StyledContainer";
import { defaultTheme } from "../style/defaultTheme";
import CloseIcon from "@mui/icons-material/Close";

type StyledModalProps = Omit<ModalProps, "onClose"> & {
  onClose: () => void;
  innerContainerSx?: SxProps;
};

export default function StyledModal(props: StyledModalProps) {
  const { sx, children, ...rest } = props;

  const focusTrapSetup = function(ref: HTMLDivElement) {
    if (props.open) {
      const focusableElements = ref.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      ref.addEventListener("keydown", function(e) {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });

      ref.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
          props.onClose();
        }
      });
    }
  };

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      {...rest}
      ref={function(ref) {
        if (ref) {
          focusTrapSetup(ref as HTMLDivElement);
        }
      }}
    >
      <StyledContainer
        sx={{
          position: "absolute",
          backgroundColor: alpha(defaultTheme.palette.background.default, 1),
          maxWidth: "60rem",
          maxHeight: "90%",
          paddingTop: 0,
          overflow: "auto",
          ...props.innerContainerSx,
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
    </Modal>
  );
}
