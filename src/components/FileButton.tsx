import { Button, styled, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type FileButtonProps = PropsWithChildren & {
  callback: (data: File) => void;
  "aria-label"?: string;
};

function loadFileAndCallCallback(
  event: ChangeEvent<HTMLInputElement>,
  callback: FileButtonProps["callback"],
) {
  if (event.target.files) {
    callback(event.target.files[0]);
  }
}

export default function FileButton({ callback, children }: FileButtonProps) {
  const {t} = useTranslation();

  return (
    <Tooltip title={t("fileButton.tooltipText")}>
      <Button
        component="label"
        tabIndex={-1}
        endIcon={children && <CloudUploadIcon></CloudUploadIcon>}
      >
        <>
          {children || <CloudUploadIcon></CloudUploadIcon>}
          <VisuallyHiddenInput
            type="file"
            onChange={function (e) {
              loadFileAndCallCallback(e, callback);
              e.target.value = "";
            }}
          ></VisuallyHiddenInput>
        </>
      </Button>
    </Tooltip>
  );
}
