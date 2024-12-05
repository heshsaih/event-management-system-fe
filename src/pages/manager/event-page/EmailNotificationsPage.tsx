import { Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";

export default function EmailNotificationsPage() {
  return (
    <StyledContainer
      inner
      sx={{
        paddingTop: 2,
      }}
    >
      <Typography variant="h4">Powiadomienia mailowe</Typography>
    </StyledContainer>
  );
}
