import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import useLogin from "../../../data/useLogin";
import GoogleIcon from "@mui/icons-material/Google";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { isFetching, login } = useLogin();
  const { t } = useTranslation();

  return (
    <>
      <StyledContainer>
        <Typography variant="h3">{t("loginPage.pageHeading")}</Typography>
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
