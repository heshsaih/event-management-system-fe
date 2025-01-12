import { Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";
import { useTranslation } from "react-i18next";
import PersonalData from "./PersonalData";
import Tickets from "./Tickets";

export default function MyProfilePage() {
  const {t} = useTranslation();
  return (
    <StyledContainer  sx={{ paddingTop: 0 }}>
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb current navigateTo="#">
          {t("breadcrumbsLabels.myProfile")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3" marginBottom={4}>Mój profil</Typography>
      <PersonalData></PersonalData>
      <Tickets></Tickets>
    </StyledContainer>
  );
}
