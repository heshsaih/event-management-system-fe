import { useEffect, useState } from "react";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { apiWithToken } from "../api/config";
import { LocationBriefDto } from "./useLocation";
import { mapFilterParamsToUri } from "../util/converters";
import axios, { AxiosError } from "axios";

export default function useAsyncLocations(initialState?: AutocompleteOption) {
  const [input, setInput] = useState<string>("");
  const [componentState, setComponentState] = useState<AutocompleteOption>(initialState ?? {
    label: "",
    value: ""
  });
  const [options, setOptions] = useState<AutocompleteOption[]>();
  const [isFetching, setIsFetching] = useState<boolean>();

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;
      async function fetch() {
        try {
          setIsFetching(true);
          const response = await apiWithToken.get<LocationBriefDto[]>(
            `/manager/locations?${mapFilterParamsToUri({ phrase: input, size: 5 })}`,
            {
              signal: signal,
            },
          );
          setOptions(
            response.data.map(function (e) {
              return {
                label: e.name,
                value: e.id,
              };
            }),
          );
        } catch (e) {
          if (axios.isCancel(e)) {
            return;
          }
          if (e instanceof AxiosError && e.status) {
            console.error(e);
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
    input
  };
}
