import { Box, Typography } from "@mui/material";
import ControlledRadio from "./ControlledRadio";

type MailNotificationTemplateChooserProps = {
  name: string;
  heading: string;
  default?: boolean;
};

export default function MailNotificationTemplateChooser(props: MailNotificationTemplateChooserProps) {
  return <Box>
    <Typography variant="h4">{props.heading}</Typography>
    <ControlledRadio
      name={props.name}
    ></ControlledRadio> 
  </Box>
}
