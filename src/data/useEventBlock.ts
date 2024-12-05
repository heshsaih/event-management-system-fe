import { useState } from "react";
import { apiWithToken } from "../api/config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { EventBlockDto } from "./useEvent";

export type CreateEventBlockDto = {
  eventId: string;
  name: string;
};

export default function useEventBlock() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const createBlock = async function (
    data: CreateEventBlockDto[],
  ): Promise<EventBlockDto | undefined> {
    try {
      setIsCreating(true);
      const response = await apiWithToken.post<EventBlockDto>(
        "/manager/event-blocks",
        data,
      );
      toast.success("Blok wydarzenia został utworzony");
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się utworzyć bloku wydarzenia: ${e.name}`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isCreating,
    createBlock,
  };
}
