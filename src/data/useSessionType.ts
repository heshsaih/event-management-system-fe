import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { SessionTypeForm } from "../pages/manager/other-page/SessionTypePage";
import { FilterOptions } from "../components/FilterParams";
import {
  mapFilterParamsToUri,
  mapOtherParamDtoToOtherParam,
} from "../util/converters";
import { apiWithEtag, apiWithToken } from "../api/config";
import { Entity, EntityDto, Pageable, UpdateOtherParamDto } from "../types";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import i18next from "i18next";

export type SessionTypeDto = EntityDto;

export type SessionType = Entity;

export function useSessionType() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingSingle, setIsFetchingSingle] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [sessionTypes, setSessionTypes] = useState<Pageable<SessionType>>();
  const [params, setParams] = useState<FilterOptions>();

  const findSessionTypeForCSVParsing = async function(
    id: string,
  ): Promise<SessionTypeDto | null> {
    try {
      const response = await apiWithToken.get<SessionTypeDto>(
        `/manager/session-types/${id}`,
      );
      return response.data;
    } catch {
      return null;
    }
  };

  const createSessionType = async function(
    data: SessionTypeForm[],
  ): Promise<SessionTypeDto | undefined> {
    try {
      setIsCreating(true);
      const response = await apiWithToken.post<SessionTypeDto>(
        "/manager/session-types",
        data,
      );
      toast.success(i18next.t("dataHooks.sessionType.createSuccess"));
      return response.data;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
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
      const response = await apiWithToken.get<Pageable<SessionTypeDto>>(
        `/manager/session-types?${uri}`,
      );
      setSessionTypes({
        ...response.data,
        content: response.data.content.map(
          mapOtherParamDtoToOtherParam,
        ) as SessionType[],
      });
      setParams(newParams);
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const updateSessionType = async function(
    id: string,
    data: UpdateOtherParamDto,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/session-types/${id}`, data);
      toast.success(i18next.t("dataHooks.sessionType.updateSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
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
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetchingSingle(false);
    }
  };

  const changeSessionTypeActive = async function(
    id: string,
    active: boolean,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(
        `/manager/session-types/${id}/set-active?active=${active}`,
      );
      toast.success(i18next.t("dataHooks.sessionType.changeActiveSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
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
    changeSessionTypeActive,
    findSessionTypeForCSVParsing
  };
}
