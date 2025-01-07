import { useEffect, useState } from "react";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { apiWithToken } from "../api/config";
import { EventBlockDto } from "./useEvent";
import { AxiosError } from "axios";
import { EmailTemplateType, Pageable } from "../types";
import { mapFilterParamsToUri } from "../util/converters";
import { BackendError, handleBackendError } from "../util/parsingErrors";

export default function useAsyncEmailTemplate(
  initialState?: AutocompleteOption,
  type?: EmailTemplateType,
) {
  const [input, setInput] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [componentState, setComponentState] = useState<AutocompleteOption>(
    initialState ?? {
      label: "",
      value: "",
    },
  );

  const [options, setOptions] = useState<AutocompleteOption[]>();

  useEffect(
    function() {
      const controller = new AbortController();
      const signal = controller.signal;
      let emailType: string;
      switch (type) {
        case "SURVEY":
          emailType = "/survey-templates";
          break;
        case "SESSION_REMINDER":
          emailType = "/session-reminder-templates";
          break;
        case "SESSION_SIGN_UP":
          emailType = "/session-sign-up-templates";
          break;
        default:
          emailType = "";
      }

      async function fetch() {
        try {
          setIsFetching(true);
          console.log("sigma")
          const response = await apiWithToken.get<Pageable<EventBlockDto>>(
            `/manager/manager-email-templates${emailType}?${mapFilterParamsToUri(
              {
                size: 5,
                showInactive: false,
                phrase: input,
              },
            )}`,
            {
              signal: signal,
            },
          );
          setOptions(
            response.data.content.map(function(e) {
              return {
                label: e.name,
                value: e.id,
              };
            }),
          );
        } catch (e) {
          handleBackendError(e as AxiosError<BackendError | undefined>);
        } finally {
          setIsFetching(false);
        }
      }

      fetch();

      return function() {
        controller.abort();
      };
    },
    [input],
  );

  return {
    input,
    setInput,
    componentState,
    setComponentState,
    isFetching,
    options,
  };
}
