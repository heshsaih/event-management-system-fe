import { Typography } from "@mui/material";
import axios, { AxiosError, HttpStatusCode } from "axios";
import i18next from "i18next";
import Papaparse from "papaparse";
import toast from "react-hot-toast";

export enum ParsingErrors {
  MissingQuotes = "Brakujący cudzysłow",
  UndetectableDelimeter = "Niespodziewany przecinek",
  TooFewFields = "Wiersz zawiera zbyt mało pól",
  TooManyFields = "Wiersz zawiera zbyt dużo pól",
}

export type BackendError = {
  message: string;
  status: HttpStatusCode;
  title: string;
};

export function buildErrorMessage(err: Papaparse.ParseError) {
  return `Wystąpił błąd w trakcie analizy pliku w wierszu ${(err.row as number) + 1
    }\nPowód: ${ParsingErrors[err.code as keyof typeof ParsingErrors]}`;
}

export function handleBackendError(e: AxiosError<BackendError | undefined>) {
  if (axios.isCancel(e)) {
    return;
  }
  e = e as AxiosError<BackendError | undefined>;
  if (
    !e.response ||
    !e.response.data ||
    e.response.data.status === HttpStatusCode.InternalServerError
  ) {
    if (e.code === "ERR_NETWORK") {
      toast.error(function() {
        return (
          <div>
            <Typography variant="body1">
              {i18next.t(`backendErrors.titles.Connection Error`)}
            </Typography>
            <Typography variant="body2">
              {i18next.t(`backendErrors.messages.Connection Error`)}
            </Typography>
          </div>
        );
      });
    } else {
      toast.error(function() {
        return (
          <div>
            <Typography variant="body1">
              {i18next.t("backendErrors.titles.Internal Server Error")}
            </Typography>
            <Typography variant="body2">
              {i18next.t("backendErrors.messages.Unknown error")}
            </Typography>
          </div>
        );
      });
    }
  } else {
    toast.error(function() {
      const title = e.response?.data?.title as string;
      const message = e.response?.data?.message as string;
      return (
        <div>
          <Typography variant="body1">
            {/*@ts-ignore*/}
            {i18next.t(`backendErrors.titles.${title}`)}
          </Typography>
          <Typography variant="body2">
            {/*@ts-ignore*/}
            {i18next.t(`backendErrors.messages.${message}`)}
          </Typography>
        </div>
      );
    });
  }
}
