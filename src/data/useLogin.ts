import { AxiosError } from "axios";
import { useState } from "react";
import {apiConfig} from "../api/config";
import { LoginCredentials } from "../pages/public/login-page";
import useAccountStore from "./useAccountStore";
import { parseToken } from "../util/converters";
import toast from "react-hot-toast";

type LoginResponse = string;

export default function useLogin() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const state = useAccountStore(function (state) {
    return state;
  });

  async function login(login: LoginCredentials) {
    try {
      setIsFetching(true);
      const response = await apiConfig.post<LoginResponse>("/auth/authenticate", login);
      console.log(parseToken(response.data));
      state.setToken(response.data);
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        if (e.status === 403) {
         toast.error("Podane poświadczenia są nieprawidłowe");
        } else {
          toast.error("Wystąpił nieoczekiwany błąd, spróbuj ponownie później");
        }
      }
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  }

  return {isFetching, login};
}
