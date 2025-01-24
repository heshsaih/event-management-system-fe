import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

type EventImageProps = {
  data: string;
};
export default function EventImage({ data }: EventImageProps) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{
          maxWidth: "80%",
          maxHeight: "80%",
          verticalAlign: "center",
        }}
        src={`data:image/&;base64,${data}`}
        alt={t("eventImage.alt")}
      />
    </Box>
  );
}
