import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { apiWithEtag, apiWithToken } from "../api/config";
import { Entity, EntityDto } from "../types";
import { BackendError, handleBackendError } from "../util/parsingErrors";

export type RoomDto = Omit<EntityDto, "name"> & {
  roomNumber: string;
  locationId: string;
  capacity: number;
};

export type Room = Omit<Entity, "name"> & {
  roomNumber: string;
  locationId: string;
  capacity: number;
};

export type UpdateRoomDto = {
  roomNumber: string;
  capacity: number;
};

export type CreateRoomDto = {
  locationId: string;
  roomNumber: string;
  capacity: number;
};

export default function useRoom() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [room, setRoom] = useState<Room>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const getRoom = async function(id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithEtag.get<RoomDto>(`/manager/rooms/${id}`);
      setRoom({
        ...response.data,
        createdAt: dayjs(response.data.createdAt),
        updatedAt: dayjs(response.data.updatedAt),
      });
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const updateRoom = async function(id: string, data: UpdateRoomDto) {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/rooms/${id}`, data);
      toast.success("Pomieszczenie zostało zaktualizowane pomyślnie");
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const changeRoomActive = async function(id: string, active: boolean) {
    try {
      setIsFetching(true);
      await apiWithEtag.patch(
        `/manager/rooms/${id}/set-active?active=${active}`,
      );
      toast.success("Status pomieszczenia został zmieniony");
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsFetching(false);
    }
  };

  const createRoom = async function(
    data: CreateRoomDto[],
  ): Promise<RoomDto | undefined> {
    try {
      setIsCreating(true);
      const response = await apiWithToken.post<RoomDto>(`/manager/rooms`, data);
      toast.success("Podane pomieszczenia zostały utworzone");
      return response.data;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isFetching,
    getRoom,
    updateRoom,
    changeRoomActive,
    isUpdating,
    room,
    createRoom,
    isCreating,
  };
}
