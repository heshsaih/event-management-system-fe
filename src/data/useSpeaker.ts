import { useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Dayjs } from "dayjs";
import { FilterOptions } from "../components/FilterParams";
import {
  mapFilterParamsToUri,
  mapSpeakerBriefDtoToSpeakerBrief,
  mapSpeakerDtoToSpeaker,
} from "../util/converters";
import { apiWithEtag, apiWithToken } from "../api/config";
import { SpeakerTitle, SpeakerTitleDto } from "./useSpeakerTitle";
import { Organization, OrganizationDto } from "./useOrganization";
import { EntityDto, Pageable } from "../types";
import { BackendError, handleBackendError } from "../util/parsingErrors";

export type SpeakerBriefDto = Omit<EntityDto, "name"> & {
  firstName: string;
  lastName: string;
  titleName: string;
  email: string;
  backupEmail: string;
  organizationName: string;
};

export type SpeakerBrief = Omit<SpeakerBriefDto, "createdAt" | "updatedAt"> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

export type SpeakerDto = Omit<EntityDto, "name"> & {
  firstName: string;
  lastName: string;
  speakerTitle: SpeakerTitleDto | null;
  email: string;
  backupEmail: string;
  organization: OrganizationDto | null;
};
export type Speaker = Omit<
  SpeakerBriefDto,
  "createdAt" | "updatedAt" | "titleName" | "organizationName"
> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
  titleName: SpeakerTitle | null;
  organizationName: Organization | null;
};

export type CreateSpeakerDto = {
  firstName: string;
  lastName: string;
  email: string;
  backupEmail?: string;
  speakerTitleId?: string;
  organizationId?: string;
};

export type UpdateSpeakerDto = CreateSpeakerDto;

export default function useSpeaker() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [speakers, setSpeakers] = useState<Pageable<SpeakerBrief>>();
  const [speaker, setSpeaker] = useState<Speaker>();
  const [params, setParams] = useState<FilterOptions>();

  const createSpeaker = async function(
    data: CreateSpeakerDto[],
  ): Promise<boolean> {
    try {
      setIsCreating(true);
      await apiWithToken.post("/manager/speakers", data);
      toast.success(`Podani prelegenci zostali utworzeni`);
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const getAllSpeakers = async function(filterParams?: FilterOptions) {
    const newParams = {
      ...params,
      ...filterParams,
    };

    if (newParams.orderBy === "name") {
      newParams.orderBy = "firstName";
    }

    const uri = mapFilterParamsToUri(newParams);

    try {
      setIsFetching(true);
      const response = await apiWithToken.get<Pageable<SpeakerBriefDto>>(
        `/manager/speakers?${uri}`,
      );
      setSpeakers({
        ...response.data,
        content: response.data.content.map(mapSpeakerBriefDtoToSpeakerBrief),
      });
      setParams(newParams);
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const getSpeaker = async function(id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithEtag.get<SpeakerDto>(
        `/manager/speakers/${id}`,
      );
      setSpeaker(mapSpeakerDtoToSpeaker(response.data));
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const updateSpeaker = async function(id: string, data: UpdateSpeakerDto) {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/speakers/${id}`, data);
      toast.success("Prelegent został zaktualizowany");
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const setSpeakerActive = async function(id: string, active: boolean) {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(
        `/manager/speakers/${id}/set-active?active=${active}`,
      );
      toast.success("Prelegent został zaktualizowany");
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
    createSpeaker,
    getAllSpeakers,
    speakers,
    params,
    getSpeaker,
    updateSpeaker,
    speaker,
    isUpdating,
    isCreating,
    setSpeakerActive,
  };
}
