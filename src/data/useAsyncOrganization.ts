import { useEffect, useState } from "react";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { apiWithToken } from "../api/config";
import { mapFilterParamsToUri } from "../util/converters";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { OrganizationDto } from "./useOrganization";

export default function useAsyncOrganization(initialState?: AutocompleteOption) {
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<AutocompleteOption[]>();
  const [componentState, setComponentState] = useState<AutocompleteOption>(initialState ?? {
    label: "",
    value: ""
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetch() {
        try {
          setIsFetching(true);
          const response = await apiWithToken.get<OrganizationDto[]>(
            `/manager/organizations?${mapFilterParamsToUri({
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
            toast.error(
              `Nie udało się pobrać organizacji: ${e.response?.data}`,
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
    input,
    setInput,
    setOptions
  };
}
