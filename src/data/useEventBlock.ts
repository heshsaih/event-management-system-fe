import { useState } from "react";
import { apiWithToken } from "../api/config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { EventBlockDto } from "./useEvent";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import i18next from "i18next";

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
      toast.success(i18next.t("dataHooks.eventBlock.createSuccess"));
      return response.data;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isCreating,
    createBlock,
  };
}
