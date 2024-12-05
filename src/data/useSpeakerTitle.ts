import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { SpeakerTitleForm } from "../pages/manager/other-page/SpeakerTitlePage";
import { FilterOptions } from "../components/FilterParams";
import {
  mapFilterParamsToUri,
  mapOtherParamDtoToOtherParam,
} from "../util/converters";
import { Dayjs } from "dayjs";
import { apiWithEtag, apiWithToken } from "../api/config";

export type SpeakerTitleDto = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};

export type SpeakerTitle = Omit<SpeakerTitleDto, "createdAt" | "updatedAt"> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

export type UpdateSpeakerTitleDto = {
  name: string;
};

export function useSpeakerTitle() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingSingle, setIsFetchingSingle] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [speakers, setSpeakers] = useState<SpeakerTitle[]>();
  const [params, setParams] = useState<FilterOptions>();

  const createSpeakerTitle = async function (
    data: SpeakerTitleForm[],
  ): Promise<SpeakerTitleDto | undefined> {
    try {
      setIsCreating(true);
      const response = await apiWithToken.post<SpeakerTitleDto>(
        "/manager/speaker-titles",
        data,
      );
      toast.success(`Podane tytuły prelegentów zostały utworzone pomyślnie`);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        if (e.status === 400) {
          toast.error(
            `Nie udało się utworzyć tytułu prelegenta: ${e.response?.data}`,
          );
        } else {
          toast.error(`Wystąpił nieoczekiwany błąd: ${e.response?.data}`);
        }
      }
    } finally {
      setIsCreating(false);
    }
  };

  const getAllSpeakerTitles = async function (filterParams?: FilterOptions) {
    const newParams = {
      ...params,
      ...filterParams,
    };

    const uri = mapFilterParamsToUri(newParams);

    try {
      setIsFetching(true);
      const response = await apiWithToken.get<SpeakerTitleDto[]>(
        `/manager/speaker-titles?${uri}`,
      );
      setSpeakers(
        response.data.map(mapOtherParamDtoToOtherParam) as SpeakerTitle[],
      );
      setParams(newParams);
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(
          `Nie udało się pobrać tytułów prelegentów: ${e.response?.data}`,
        );
      }
    } finally {
      setIsFetching(false);
    }
  };

  const updateSpeakerTitle = async function (
    id: string,
    data: UpdateSpeakerTitleDto,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/speaker-titles/${id}`, data);
      toast.success("Tytuł prelegenta został zaktualizowany");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(
          `Nie udało się zaktualizować tytułu prelegenta: ${e.response?.data}`,
        );
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const getSpeakerTitle = async function (
    id: string,
  ): Promise<SpeakerTitle | undefined> {
    try {
      setIsFetchingSingle(true);
      const response = await apiWithEtag.get<SpeakerTitleDto>(
        `/manager/speaker-titles/${id}`,
      );
      return mapOtherParamDtoToOtherParam(response.data) as SpeakerTitle;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(
          `Nie udało się pobrać tytułu prelegenta: ${e.response?.data}`,
        );
      }
    } finally {
      setIsFetchingSingle(false);
    }
  };

  const changeSpeakerTitleActive = async function (
    id: string,
    active: boolean,
  ) {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(
        `/manager/speaker-titles/${id}/set-active?active=${active}`,
      );
      toast.success("Status tytułu prelegenta został zmieniony");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(
          `Nie udało się zmienić statusu tytułu prelegenta: ${e.response?.data}`,
        );
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isFetching,
    createSpeakerTitle,
    speakers,
    getAllSpeakerTitles,
    isCreating,
    params,
    isUpdating,
    updateSpeakerTitle,
    getSpeakerTitle,
    isFetchingSingle,
    changeSpeakerTitleActive,
  };
}
