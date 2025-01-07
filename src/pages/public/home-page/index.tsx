import { Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";
import { useTranslation } from "react-i18next";
import EventListParticipant from "../../../components/EventListParticipant";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <StyledContainer sx={{ paddingTop: 0 }}>
      <StyledBreadcrumbs>
        <Breadcrumb current navigateTo="/">
          {t("breadcrumbsLabels.home")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3">Strona główna</Typography>
      <EventListParticipant></EventListParticipant>
    </StyledContainer>
  );
}
