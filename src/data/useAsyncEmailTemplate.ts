import { useEffect, useState } from "react";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { apiWithToken } from "../api/config";
import { EventBlockDto } from "./useEvent";
import { AxiosError } from "axios";
import { Pageable } from "../types";
import { mapFilterParamsToUri } from "../util/converters";
import { BackendError, handleBackendError } from "../util/parsingErrors";

export default function useAsyncEmailTemplate(
  initialState?: AutocompleteOption,
) {
  const [input, setInput] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [componentState, setComponentState] = useState<AutocompleteOption>(
    initialState ?? {
      label: "",
      value: "",
    },
  );

  useEffect(
    function() {
      if (initialState) {
        setComponentState(initialState);
      }
    },
    [initialState],
  );

  const [options, setOptions] = useState<AutocompleteOption[]>();

  useEffect(
    function() {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetch() {
        try {
          setIsFetching(true);
          const response = await apiWithToken.get<Pageable<EventBlockDto>>(
            `/manager/manager-email-templates?${mapFilterParamsToUri({
              size: 5,
              showInactive: false,
              phrase: input,
            })}`,
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
