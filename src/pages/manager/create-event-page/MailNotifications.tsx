import { Box, Button, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";

type MailNotificationsProps = {
  previousStep: () => void;
  nextStep: () => void;
};

export default function MailNotifications(props: MailNotificationsProps) {
  return (
    <StyledContainer inner>
      <Typography variant="h3" marginBottom={4}>Powiadomienia mailowe</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <Button onClick={props.previousStep}>Powrót</Button>
        <Button onClick={props.nextStep}>Dalej</Button>
      </Box>
    </StyledContainer>
  );
}
