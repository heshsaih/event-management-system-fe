import { useEffect, useState } from "react";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { apiWithToken } from "../api/config";
import { mapFilterParamsToUri } from "../util/converters";
import { AxiosError } from "axios";
import { SpeakerTitleDto } from "./useSpeakerTitle";
import { Pageable } from "../types";
import { BackendError, handleBackendError } from "../util/parsingErrors";

export default function useAsyncSpeakerTitle(initialState?: AutocompleteOption) {
  const [componentState, setComponentState] = useState<AutocompleteOption>(initialState ?? {
    label: "",
    value: "",
  });
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<AutocompleteOption[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetch() {
        try {
          setIsFetching(true);
          const response = await apiWithToken.get<Pageable<SpeakerTitleDto>>(
            `/manager/speaker-titles?${mapFilterParamsToUri({
              phrase: input,
              size: 5,
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
    options,
    isFetching,
    componentState,
    setComponentState,
    input,
    setInput,
    setOptions
  };
}
