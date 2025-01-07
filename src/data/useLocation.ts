import { Room, RoomDto } from "./useRoom";
import { useState } from "react";
import { apiWithEtag, apiWithToken } from "../api/config";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  mapFilterParamsToUri,
  mapLocationBriefDtoToLocationBrief,
  mapLocationDtoToLocation,
} from "../util/converters";
import { FilterOptions } from "../components/FilterParams";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { Entity, EntityDto, Pageable } from "../types";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import i18next from "i18next";

export type LocationDto = EntityDto & {
  buildingNumber: string;
  street: string;
  city: string;
  postalCode: string;
  rooms: RoomDto[];
};

export type UpdateLocationDto = Omit<
  LocationDto,
  "rooms" | "createdAt" | "updatedAt" | "id" | "active"
>;

export type Location = Entity & {
  buildingNumber: string;
  street: string;
  city: string;
  postalCode: string;
  rooms: Room[];
};

export type LocationBriefDto = Omit<LocationDto, "rooms">;
export type LocationBrief = Omit<Location, "rooms">;

export type CreateRoomWithLocationDto = {
  roomNumber: string;
  capacity: number;
};

export type CreateLocationDto = {
  name: string;
  buildingNumber: string;
  street: string;
  city: string;
  postalCode: string;
  rooms: CreateRoomWithLocationDto[];
};

export default function useLocation() {
  const [params, setParams] = useState<FilterOptions>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>();
  const [locations, setLocations] = useState<Pageable<LocationBrief>>();

  const findLocationForCSVParsing = async function(
    id: string,
  ): Promise<LocationDto | null> {
    try {
      const response = await apiWithToken.get<LocationDto>(
        `/manager/locations/${id}`,
      );
      return response.data; 
    } catch {
      return null;
    }
  };

  const createLocation = async function(
    data: CreateLocationDto[],
  ): Promise<LocationBriefDto | undefined> {
    try {
      setIsFetching(true);
      const response = await apiWithToken.post<LocationBriefDto>(
        "/manager/locations",
        data,
      );
      toast.success(i18next.t("dataHooks.location.createSuccess"));
      return response.data;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const getLocation = async function(id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithEtag.get<LocationDto>(
        `/manager/locations/${id}`,
      );
      setLocation(mapLocationDtoToLocation(response.data));
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const retrieveRoomOptions = async function(
    id: string,
  ): Promise<AutocompleteOption[] | undefined> {
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<LocationDto>(
        `/manager/locations/${id}`,
      );
      return response.data.rooms.map(function(e) {
        return {
          label: e.roomNumber,
          value: e.id,
        };
      });
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const getAllLocations = async function(filterParams?: FilterOptions) {
    const newParams = {
      ...params,
      ...filterParams,
    };
    const uri = mapFilterParamsToUri(newParams);
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<Pageable<LocationDto>>(
        `/manager/locations?${uri}`,
      );
      setLocations({
        ...response.data,
        content: response.data.content.map(mapLocationBriefDtoToLocationBrief),
      });
      setParams(newParams);
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const updateLocation = async function(id: string, data: UpdateLocationDto) {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/locations/${id}`, data);
      toast.success(i18next.t("dataHooks.location.updateSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const changeLocationActive = async function(id: string, active: boolean) {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(
        `/manager/locations/${id}/set-active?active=${active}`,
      );
      toast.success(i18next.t("dataHooks.location.changeActiveSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    location,
    locations,
    isFetching,
    getLocation,
    getAllLocations,
    params,
    updateLocation,
    isUpdating,
    retrieveRoomOptions,
    createLocation,
    changeLocationActive,
    findLocationForCSVParsing,
  };
}
