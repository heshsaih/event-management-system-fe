import { Tab, Tabs, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { useTranslation } from "react-i18next";
import { SyntheticEvent, useState } from "react";
import UpcomingTickets from "./UpcomingTickets";
import FormerTickers from "./FormerTickets";

export default function Tickets() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(0);

  const handleTabChange = function(_: SyntheticEvent, newTab: number) {
    setTab(newTab);
  };

  return (
    <StyledContainer inner>
      <Typography variant="h4">{t("myProfile.tickets.heading")}</Typography>
      <Tabs
        sx={{ maxWidth: "100%", overflow: "auto" }}
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={tab}
        onChange={handleTabChange}
      >
        <Tab label={t("myProfile.tickets.upcomingTab")}></Tab>
        <Tab label={t("myProfile.tickets.formerTab")}></Tab>
      </Tabs>
      {tab === 0 && <UpcomingTickets></UpcomingTickets>}
      {tab === 1 && <FormerTickers></FormerTickers>}
    </StyledContainer>
  );
}
