import { useState } from "react";
import { SpeakerOrganizationForm } from "../pages/manager/other-page/SpeakerOrganizationPage";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { FilterOptions } from "../components/FilterParams";
import {
  mapFilterParamsToUri,
  mapOtherParamDtoToOtherParam,
} from "../util/converters";
import { apiWithEtag, apiWithToken } from "../api/config";

export type OrganizationDto = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};

export type Organization = Omit<OrganizationDto, "createdAt" | "updatedAt"> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

export type UpdateOrganizationDto = {
  name: string;
};

export function useOrganization() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingSingle, setIsFetchingSingle] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<Organization[]>();
  const [params, setParams] = useState<FilterOptions>();

  const createOrganization = async function(
    data: SpeakerOrganizationForm[],
  ): Promise<OrganizationDto | undefined> {
    try {
      setIsCreating(true);
      const response = await apiWithToken.post<OrganizationDto>("/manager/organizations", data);
      toast.success(`Podane organizacje zostały utworzone`);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        if (e.status === 400) {
          toast.error(
            `Nie udało się utworzyć organizacji: ${e.response?.data}`,
          );
        } else {
          toast.error(`Wystąpił nieoczekiwany błąd: ${e.response?.data}`);
        }
      }
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
      const response = await apiWithToken.get<OrganizationDto[]>(
        `/manager/organizations?${uri}`,
      );
      setOrganizations(response.data.map(mapOtherParamDtoToOtherParam) as Organization[]);
      setParams(newParams);
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        if (e.status === 400) {
          toast.error(`Nie udało się pobrać organizacji: ${e.response?.data}`);
        } else {
          toast.error(`Wystąpił nieoczekiwany błąd: ${e.response?.data}`);
        }
      }
    } finally {
      setIsFetching(false);
    }
  };

  const updateOrganization = async function(
    id: string,
    data: UpdateOrganizationDto,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/organizations/${id}`, data);
      toast.success("Organizacja została zaktualizowana");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        if (e.status === 400) {
          toast.error(
            `Nie udało się zaktualizować organizacji: ${e.response?.data}`,
          );
        } else {
          toast.error(`Wystąpił nieoczekiwany błąd: ${e.response?.data}`);
        }
      }
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
      if (e instanceof AxiosError && e.status) {
        if (e.status === 400) {
          toast.error(`Nie udało się pobrać organizacji: ${e.response?.data}`);
        } else {
          toast.error(`Wystąpił nieoczekiwany błąd: ${e.response?.data}`);
        }
      }
    } finally {
      setIsFetchingSingle(false);
    }
  };

  const changeOrganizationActive = async function(
    id: string,
    active: boolean
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(`/manager/organizations/${id}/set-active?active=${active}`);
      toast.success("Status organizacji został zmieniony");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        if (e.status === 400) {
          toast.error(
            `Nie udało się zmienić statusu organizacji: ${e.response?.data}`,
          );
        } else {
          toast.error(`Wystąpił nieoczekiwany błąd: ${e.response?.data}`);
        }
      }
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
    changeOrganizationActive
  };
}
