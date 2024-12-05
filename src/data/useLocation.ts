import { Dayjs } from "dayjs";
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

export type LocationDto = {
  id: string;
  name: string;
  active: boolean;
  buildingNumber: string;
  street: string;
  city: string;
  postalCode: string;
  rooms: RoomDto[];
  createdAt: string;
  updatedAt: string;
};

export type UpdateLocationDto = Omit<
  LocationDto,
  "rooms" | "createdAt" | "updatedAt" | "id" | "active"
>;

export type Location = Omit<
  LocationDto,
  "createdAt" | "updatedAt" | "rooms"
> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
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
  const [locations, setLocations] = useState<LocationBrief[]>();

  const createLocation = async function (
    data: CreateLocationDto[],
  ): Promise<LocationBriefDto | undefined> {
    try {
      setIsFetching(true);
      const response = await apiWithToken.post<LocationBriefDto>("/manager/locations", data);
      toast.success(`Lokacja została utworzona pomyślnie`);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.status) {
          if (e.status === 400) {
            toast.error(`Błędnie podane dane: ${e.response?.data}`);
          } else {
            toast.error(`Wystąpił nieoczekiwany błąd: ${e.response?.data}`);
          }
        }
      }
    } finally {
      setIsFetching(false);
    }
  };

  const getLocation = async function (id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithEtag.get<LocationDto>(
        `/manager/locations/${id}`,
      );
      setLocation(mapLocationDtoToLocation(response.data));
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się pobrać lokacji: ${e.response?.data}`);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const retrieveRoomOptions = async function (
    id: string,
  ): Promise<AutocompleteOption[] | undefined> {
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<LocationDto>(
        `/manager/locations/${id}`,
      );
      return response.data.rooms.map(function (e) {
        return {
          label: e.roomNumber,
          value: e.id,
        };
      });
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się pobrać lokacji: ${e.response?.data}`);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const getAllLocations = async function (filterParams?: FilterOptions) {
    const newParams = {
      ...params,
      ...filterParams,
    };
    const uri = mapFilterParamsToUri(newParams);
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<LocationDto[]>(
        `/manager/locations?${uri}`,
      );
      setLocations(response.data.map(mapLocationBriefDtoToLocationBrief));
      setParams(newParams);
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się pobrać lokacji: ${e.response?.data}`);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const updateLocation = async function (id: string, data: UpdateLocationDto) {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/locations/${id}`, data);
      toast.success("Lokacja zaktualizowana pomyśłnie");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się zaktualizować lokacji: ${e.response?.data}`);
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const changeLocationActive = async function (id: string, active: boolean) {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(`/manager/locations/${id}/set-active?active=${active}`);
      toast.success("Status lokacji został zmieniony pomyśłnie");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się zmienić statusu lokacji: ${e.response?.data}`);
      }
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
    changeLocationActive
  };
}
