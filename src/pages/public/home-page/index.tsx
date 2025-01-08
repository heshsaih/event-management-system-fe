import { CircularProgress, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";
import { useTranslation } from "react-i18next";
import EventListParticipant from "../../../components/EventListParticipant";
import { lazy, Suspense } from "react";
import { Colors } from "../../../constants/styling";
const Carousel = lazy(() => import("./Carousel"));

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <StyledContainer sx={{ paddingTop: 0 }}>
      <StyledBreadcrumbs>
        <Breadcrumb current navigateTo="/">
          {t("breadcrumbsLabels.home")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography marginBottom={"3rem"} variant="h3">
        Strona główna
      </Typography>
      <Suspense
        fallback={
          <CircularProgress
            size="3rem"
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        }
      >
        <Carousel></Carousel>
      </Suspense>
      <EventListParticipant></EventListParticipant>
    </StyledContainer>
  );
}
