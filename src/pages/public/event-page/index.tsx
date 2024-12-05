import { Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import useEvent from "../../../data/useEvent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EventPage() {
  const { getEvent, event } = useEvent();
  const { id } = useParams();

  useEffect(
    function() {
      getEvent(id ?? "");
    },
    [id],
  );

  return (
    <StyledContainer>
      <Typography variant="h3">Panel podglądu wydarzenia</Typography>
      <Typography>{JSON.stringify(event)}</Typography>
    </StyledContainer>
  );
}
