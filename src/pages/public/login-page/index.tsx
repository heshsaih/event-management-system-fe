import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import useLogin from "../../../data/useLogin";
import GoogleIcon from "@mui/icons-material/Google";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isFetching, login } = useLogin(navigate);
  const { t } = useTranslation();

  return (
    <>
      <StyledContainer sx={{ paddingTop: 0 }}>
        <StyledBreadcrumbs>
          <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
          <Breadcrumb current navigateTo="#">
            {t("breadcrumbsLabels.login")}
          </Breadcrumb>
        </StyledBreadcrumbs>
        <Typography marginBottom={4} variant="h3">{t("loginPage.pageHeading")}</Typography>
        <StyledContainer inner>
          <Typography>{t("loginPage.pageBody")}</Typography>
          <Tooltip title={t("loginPage.loginButtonTooltip")}>
            <Button
              aria-label={t("loginPage.loginButtonAriaLabel")}
              onClick={login}
              startIcon={isFetching ? <></> : <GoogleIcon></GoogleIcon>}
            >
              {isFetching ? (
                <CircularProgress></CircularProgress>
              ) : (
                t("loginPage.loginButtonText")
              )}
            </Button>
          </Tooltip>
        </StyledContainer>
      </StyledContainer>
    </>
  );
}
