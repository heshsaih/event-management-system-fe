import { Tab, Tabs, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { SyntheticEvent, useEffect, useState } from "react";
import EventPageSummaryManager from "./EventPageSummaryManager";
import SessionsPageManager from "./SessionsPageManager";
import EmailNotificationsPage from "./EmailNotificationsPage";
import useEvent from "../../../data/useEvent";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";

export default function EventPageManager() {
  const [tab, setTab] = useState<number>(0);
  const state = useEvent();
  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(function() {
    state.getEvent(id ?? "");
  }, []);

  const handleTabChange = function(_: SyntheticEvent, newTab: number) {
    setTab(newTab);
  };

  useEffect(
    function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [tab],
  );

  return (
    <StyledContainer
      sx={{
        paddingTop: 0,
      }}
    >
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb navigateTo="/manager/events">
          {t("breadcrumbsLabels.events")}
        </Breadcrumb>
        <Breadcrumb current navigateTo="#">
          {t("breadcrumbsLabels.event")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3">
        {t("eventPageManager.index.pageHeading")}
      </Typography>
      <Tabs
        sx={{ maxWidth: "100%", overflow: "auto", alignItems: "center" }}
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={tab}
        onChange={handleTabChange}
      >
        <Tab tabIndex={0} label={t("eventPageManager.index.eventDataTab")}></Tab>
        <Tab tabIndex={0} label={t("eventPageManager.index.sessionsTab")}></Tab>
        <Tab tabIndex={0} label={t("eventPageManager.index.mailNotificationsTab")}></Tab>
      </Tabs>
      {tab === 0 && (
        <EventPageSummaryManager state={state}></EventPageSummaryManager>
      )}
      {tab === 1 && <SessionsPageManager state={state}></SessionsPageManager>}
      {tab === 2 && <EmailNotificationsPage></EmailNotificationsPage>}
    </StyledContainer>
  );
}
