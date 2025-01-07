import { Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";
import { useTranslation } from "react-i18next";
import EventListParticipant from "../../../components/EventListParticipant";

export default function EventsPage() {
  const { t } = useTranslation();
  return (
    <StyledContainer
      sx={{
        paddingTop: 0,
      }}
    >
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb current navigateTo="#">
          {t("breadcrumbsLabels.events")}
        </Breadcrumb>
        <Breadcrumb disabled navigateTo="#">
          {t("breadcrumbsLabels.event")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3" marginBottom={4}>
        {t("eventsPageParticipant.pageHeaading")}
      </Typography>
      <EventListParticipant></EventListParticipant>
    </StyledContainer>
  );
}
