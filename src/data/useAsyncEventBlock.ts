import { useEffect, useState } from "react";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { apiWithToken } from "../api/config";
import { EventBlockDto } from "./useEvent";
import axios, { AxiosError } from "axios";

export default function useAsyncEventBlock(
  eventId: string,
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

  useEffect(function () {
    if (initialState) {
      setComponentState(initialState);
    }
  }, [initialState])

  const [options, setOptions] = useState<AutocompleteOption[]>();

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetch() {
        try {
          setIsFetching(true);
          const response = await apiWithToken.get<EventBlockDto[]>(
            `/manager/event-blocks/event/${eventId}`,
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
    input,
    setInput,
    componentState,
    setComponentState,
    isFetching,
    options,
  };
}
