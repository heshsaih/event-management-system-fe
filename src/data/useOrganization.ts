import { useState } from "react";
import { SpeakerOrganizationForm } from "../pages/manager/other-page/SpeakerOrganizationPage";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { FilterOptions } from "../components/FilterParams";
import {
  mapFilterParamsToUri,
  mapOtherParamDtoToOtherParam,
} from "../util/converters";
import { apiWithEtag, apiWithToken } from "../api/config";
import { OtherParam, OtherParamDto, Pageable, UpdateOtherParamDto } from "../types";
import { BackendError, handleBackendError } from "../util/parsingErrors";

export type OrganizationDto = OtherParamDto;

export type Organization = OtherParam;

export function useOrganization() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingSingle, setIsFetchingSingle] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<Pageable<Organization>>();
  const [params, setParams] = useState<FilterOptions>();

  const createOrganization = async function(
    data: SpeakerOrganizationForm[],
  ): Promise<OrganizationDto | undefined> {
    try {
      setIsCreating(true);
      const response = await apiWithToken.post<OrganizationDto>(
        "/manager/organizations",
        data,
      );
      toast.success(`Podane organizacje zostały utworzone`);
      return response.data;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsCreating(false);
    }
  };

  const getAllOrganizations = async function(filterParams?: FilterOptions) {
    const newParams = {
      ...params,
      ...filterParams,
    };

    const uri = mapFilterParamsToUri(newParams);

    try {
      setIsFetching(true);
      const response = await apiWithToken.get<Pageable<OrganizationDto>>(
        `/manager/organizations?${uri}`,
      );
      setOrganizations({
        ...response.data,
        content: response.data.content.map(
          mapOtherParamDtoToOtherParam,
        ) as Organization[],
      });
      setParams(newParams);
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const updateOrganization = async function(
    id: string,
    data: UpdateOtherParamDto,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/organizations/${id}`, data);
      toast.success("Organizacja została zaktualizowana");
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const getOrganization = async function(
    id: string,
  ): Promise<Organization | undefined> {
    try {
      setIsFetchingSingle(true);
      const response = await apiWithEtag.get<OrganizationDto>(
        `/manager/organizations/${id}`,
      );
      return mapOtherParamDtoToOtherParam(response.data) as Organization;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetchingSingle(false);
    }
  };

  const changeOrganizationActive = async function(
    id: string,
    active: boolean,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(
        `/manager/organizations/${id}/set-active?active=${active}`,
      );
      toast.success("Status organizacji został zmieniony");
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
    createOrganization,
    getAllOrganizations,
    getOrganization,
    updateOrganization,
    isUpdating,
    isCreating,
    organizations,
    params,
    isFetchingSingle,
    changeOrganizationActive,
  };
}
