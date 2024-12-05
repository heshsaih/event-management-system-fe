import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";
import { apiWithEtag, apiWithToken } from "../api/config";

export type RoomDto = {
  id: string;
  roomNumber: string;
  locationId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  capacity: number;
};

export type Room = Omit<RoomDto, "createdAt" | "updatedAt"> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
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

  const getRoom = async function (id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithEtag.get<RoomDto>(`/manager/rooms/${id}`);
      setRoom({
        ...response.data,
        createdAt: dayjs(response.data.createdAt),
        updatedAt: dayjs(response.data.updatedAt),
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(`Nie udało się pobrać pomieszczenia: ${e.response?.data}`);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const updateRoom = async function (id: string, data: UpdateRoomDto) {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/rooms/${id}`, data);
      toast.success("Pomieszczenie zostało zaktualizowane pomyślnie");
      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          `Nie udało się zaktualizować pomieszczenia: ${e.response?.data}`,
        );
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const changeRoomActive = async function (id: string, active: boolean) {
    try {
      setIsFetching(true);
      await apiWithEtag.patch(
        `/manager/rooms/${id}/set-active?active=${active}`,
      );
      toast.success("Status pomieszczenia został zmieniony");
      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          `Nie udało się zmienić statusu pomieszczenia: ${e.response?.data}`,
        );
      }
      return false;
    } finally {
      setIsFetching(false);
    }
  };

  const createRoom = async function (data: CreateRoomDto[]): Promise<RoomDto | undefined> {
    try {
      setIsCreating(true);
      const response = await apiWithToken.post<RoomDto>(`/manager/rooms`, data);
      toast.success("Podane pomieszczenia zostały utworzone");
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(`Nie udało się utworzyć pomieszczeń: ${e.response?.data}`);
      }
    } finally {
      setIsFetching(false);
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
    isCreating
  };
}
