import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { SessionTypeForm } from "../pages/manager/other-page/SessionTypePage";
import { Dayjs } from "dayjs";
import { FilterOptions } from "../components/FilterParams";
import {
  mapFilterParamsToUri,
  mapOtherParamDtoToOtherParam,
} from "../util/converters";
import { apiWithEtag, apiWithToken } from "../api/config";

export type SessionTypeDto = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};

export type SessionType = Omit<SessionTypeDto, "createdAt" | "updatedAt"> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

export type UpdateSessionTypeDto = {
  name: string;
};

export function useSessionType() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingSingle, setIsFetchingSingle] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>();
  const [params, setParams] = useState<FilterOptions>();

  const createSessionType = async function(
    data: SessionTypeForm[],
  ): Promise<SessionTypeDto | undefined> {
    try {
      setIsCreating(true);
      const response = await apiWithToken.post<SessionTypeDto>("/manager/session-types", data);
      toast.success(`Podane typy konferncji zostały utworzone pomyślnie`);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        if (e.status === 400) {
          toast.error(
            `Nie udało się utworzyć typów konferencji: ${e.response?.data}`,
          );
        } else {
          toast.error(`Wystąpił nieoczekiwany błąd: ${e.response?.data}`);
        }
      }
    } finally {
      setIsCreating(false);
    }
  };
  const getAllSessionTypes = async function(filterParams?: FilterOptions) {
    const newParams = {
      ...params,
      ...filterParams,
    };

    const uri = mapFilterParamsToUri(newParams);

    try {
      setIsFetching(true);
      const response = await apiWithToken.get<SessionTypeDto[]>(
        `/manager/session-types?${uri}`,
      );
      setSessionTypes(response.data.map(mapOtherParamDtoToOtherParam) as SessionType[]);
      setParams(newParams);
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się pobrać typów sesji: ${e.response?.data}`);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const updateSessionType = async function(
    id: string,
    data: UpdateSessionTypeDto,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/session-types/${id}`, data);
      toast.success("Typ sesji został zaktualizowany");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(
          `Nie udało się zaktualizować typu sesji: ${e.response?.data}`,
        );
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const getSessionType = async function(
    id: string,
  ): Promise<SessionType | undefined> {
    try {
      setIsFetchingSingle(true);
      const response = await apiWithEtag.get<SessionTypeDto>(
        `/manager/session-types/${id}`,
      );
      return mapOtherParamDtoToOtherParam(response.data) as SessionType;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się pobrać typu sesji: ${e.response?.data}`);
      }
    } finally {
      setIsFetchingSingle(false);
    }
  };

  const changeSessionTypeActive = async function(
    id: string,
    active: boolean
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(`/manager/session-types/${id}/set-active?active=${active}`);
      toast.success("Status typu sesji został zmieniony");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(
          `Nie udało się zmienić statusu typu sesji: ${e.response?.data}`,
        );
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isFetching,
    createSessionType,
    sessionTypes,
    getAllSessionTypes,
    isCreating,
    params,
    isUpdating,
    updateSessionType,
    getSessionType,
    isFetchingSingle,
    changeSessionTypeActive
  };
}
