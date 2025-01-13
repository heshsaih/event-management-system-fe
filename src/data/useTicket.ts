import { useState } from "react";
import { apiWithEtag } from "../api/config";
import toast from "react-hot-toast";
import i18next from "i18next";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import { AxiosError } from "axios";

export default function useTicket() {
  const [isPerforming, setIsPerforming] = useState<boolean>(false);

  const signOutParticipant = async function(
    ticketId: string,
  ): Promise<boolean> {
    try {
      setIsPerforming(true);
      await apiWithEtag.delete(`/manager/tickets/${ticketId}`);
      toast.success(i18next.t("dataHooks.ticket.signOutSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError>);
      return false;
    } finally {
      setIsPerforming(false);
    }
  };

  return {
    isPerforming,
    signOutParticipant,
  };
}
