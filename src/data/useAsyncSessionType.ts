import { useEffect, useState } from "react";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { apiWithToken } from "../api/config";
import { SpeakerTitleDto } from "./useSpeakerTitle";
import { mapFilterParamsToUri } from "../util/converters";
import { AxiosError } from "axios";
import { Pageable } from "../types";
import { BackendError, handleBackendError } from "../util/parsingErrors";

export default function useAsyncSessionType(initialState?: AutocompleteOption) {
  const [input, setInput] = useState<string>("");
  const [componentState, setComponentState] = useState<AutocompleteOption>(initialState ?? {
    label: "",
    value: "",
  });
  const [options, setOptions] = useState<AutocompleteOption[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(function () {
    if (initialState) {
      setComponentState(initialState);
    }
  }, [initialState])

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetch() {
        try {
          setIsFetching(true);
          const response = await apiWithToken.get<Pageable<SpeakerTitleDto>>(
            `/manager/session-types?${mapFilterParamsToUri({
              size: 5,
              phrase: input,
              showInactive: false
            })}`,
            {
              signal: signal,
            },
          );
          setOptions(
            response.data.content.map(function (e) {
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

      return function () {
        controller.abort();
      };
    },
    [input],
  );

  return {
    setInput,
    componentState,
    setComponentState,
    options,
    isFetching,
  };
}
