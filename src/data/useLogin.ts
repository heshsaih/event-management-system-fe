import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import { AxiosError } from "axios";
import { apiWithToken } from "../api/config";
import useAccountStore from "./useAccountStore";
import { parseToken } from "../util/converters";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function useLogin(navigate: NavigateFunction) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const state = useAccountStore(function(state) {
    return state;
  });
  const { t } = useTranslation();

  const login = async function() {
    setIsFetching(true);
    location.replace(
      import.meta.env.VITE_BASE_API_URL + "/oauth2/authorization/google",
    );
  };

  const refreshSession = async function() {
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<string>("/auth/renew-token");
      const parsedToken = parseToken(response.data);

      if (parsedToken) {
        state.setToken(response.data, parsedToken);
        toast.success(t("auth.sessionRefreshSuccess"));
      } else {
        state.setToken(undefined, undefined);
        toast.success(t("auth.loginFail"));
        navigate("/login");
      }
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      navigate("/logout");
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, login, refreshSession };
}
