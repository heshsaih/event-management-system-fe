import { Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import StyledLink from "../../../components/StyledLink";
import { Colors } from "../../../constants/styling";

export default function NotFoundPage() {
  return (
    <StyledContainer inner>
      <Typography variant="h3">Nie znaleziono</Typography>
      <Typography>
        Strona, na którą próbujesz się dostać, nie istnieje lub nie masz
        updawnień do wejścia na nią
      </Typography>
      <StyledLink style={{ color: Colors.RED }} to={"/"}>
        Powrót na stronę główną
      </StyledLink>
    </StyledContainer>
  );
}
