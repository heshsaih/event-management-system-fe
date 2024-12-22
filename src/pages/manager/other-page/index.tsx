import { Tab, Tabs, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { SyntheticEvent, useEffect, useState } from "react";
import SpeakerTitlePage from "./SpeakerTitlePage";
import SpeakerOrganizationPage from "./SpeakerOrganizationPage";
import SessionTypePage from "./SessionTypePage";
import { useTranslation } from "react-i18next";
import OtherEmailNotificationsPage from "./OtherEmailNotificationsPage";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";

export default function OtherPage() {
  const [tab, setTab] = useState<number>(0);
  const {t} = useTranslation();

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
    <StyledContainer sx={{
      paddingTop: 0
    }}>
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb current navigateTo="#">{t("breadcrumbsLabels.other")}</Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3">{t("otherPage.pageHeading")}</Typography>
      <Tabs
        sx={{ maxWidth: "100%", overflow: "auto" }}
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={tab}
        onChange={handleTabChange}
      >
        <Tab label={t("otherPage.speakerTitleHeading")}></Tab>
        <Tab label={t("otherPage.organizationsHeading")}></Tab>
        <Tab label={t("otherPage.speakerTypeHeading")}></Tab>
        <Tab label="Powiadomienia mailowe"></Tab>
      </Tabs>
      {tab === 0 && <SpeakerTitlePage></SpeakerTitlePage>}
      {tab === 1 && <SpeakerOrganizationPage></SpeakerOrganizationPage>}
      {tab === 2 && <SessionTypePage></SessionTypePage>}
      {tab === 3 && <OtherEmailNotificationsPage></OtherEmailNotificationsPage>}
    </StyledContainer>
  );
}
