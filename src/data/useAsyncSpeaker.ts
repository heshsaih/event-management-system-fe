import { useEffect, useState } from "react";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { apiWithToken } from "../api/config";
import { SpeakerBriefDto } from "./useSpeaker";
import { mapFilterParamsToUri } from "../util/converters";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

export default function useAsyncSpeaker(initialState?: AutocompleteOption) {
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
      setInput(initialState.label);
    }
  }, [initialState])

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetch() {
        try {
          setIsFetching(true);
          const response = await apiWithToken.get<SpeakerBriefDto[]>(
            `/manager/speakers?${mapFilterParamsToUri({
              phrase: input,
              size: 5,
            })}`,
            {
              signal: signal,
            },
          );
          setOptions(
            response.data.map(function (e) {
              return {
                label: `${e.titleName ? e.titleName : ""} ${e.firstName} ${e.lastName}`,
                value: e.id,
              };
            }),
          );
        } catch (e) {
          if (axios.isCancel(e)) {
            return;
          }
          if (e instanceof AxiosError && e.status) {
            toast.error(
              `Nie udało się pobrać prelegentów: ${e.response?.data}`,
            );
          }
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
    setInput,
    input,
  };
}
