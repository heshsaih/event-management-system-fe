import dayjs, { Dayjs } from "dayjs";
import { SpeakerBrief, SpeakerBriefDto } from "./useSpeaker";
import { useState } from "react";
import { apiWithEtag, apiWithToken } from "../api/config";
import { mapFilterParamsToUri, mapSessionDtoToSession } from "../util/converters";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { SessionType, SessionTypeDto } from "./useSessionType";
import { EventBlock, EventBlockDto } from "./useEvent";
import { Entity, EntityDto, Pageable } from "../types";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import i18next from "i18next";
import { FilterOptions } from "../components/FilterParams";

export type ManagerTicketEntryDto = {
  id: string;
  accountId: string;
  accountEmail: string;
  accountFirstName: string;
  accountLastName: string;
  externalId: string;
  sessionId: string;
  eventId: string;
  sessionName: string;
  reserve: boolean;
  active: boolean;
  createdAt: string;
};

export type ManagerTicketEntry = Omit<ManagerTicketEntryDto, "createdAt"> & {
  createdAt: Dayjs;
};

export type RoomInfo = {
  roomId: string;
  locationName: string;
  active: boolean;
  buildingNumber: string;
  street: string;
  city: string;
  postalCode: string;
  roomNumber: string;
  locationId: string;
};

export type SessionBriefDto = Omit<EntityDto, "name"> & {
  sessionName: string;
  sessionType: string;
  speaker: SpeakerBriefDto;
  eventBlock: string;
  startDate: string;
  endDate: string;
  room: RoomInfo;
  eventId: string;
  maxSeats: number;
  availableSeats: number;
};

export type SessionBrief = Omit<
  SessionBriefDto,
  "createdAt" | "updatedAt" | "speaker" | "startDate" | "endDate"
> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
  speaker: SpeakerBrief;
  startDate: Dayjs;
  endDate: Dayjs;
};

export type SessionDto = Omit<EntityDto, "name"> & {
  sessionName: string;
  sessionType: SessionTypeDto;
  speaker: SpeakerBriefDto;
  eventBlock: EventBlockDto;
  descriptionPl: string;
  descriptionEn: string;
  startDate: string;
  endDate: string;
  room: RoomInfo;
  eventId: string;
  maxSeats: number;
  availableSeats: number;
  minutesBeforeSignUpCloses: number;
};

export type Session = Omit<Entity, "name"> & {
  sessionName: string;
  sessionType: SessionType;
  speaker: SpeakerBrief;
  eventBlock: EventBlock;
  descriptionPl: string;
  descriptionEn: string;
  startDate: Dayjs;
  endDate: Dayjs;
  room: RoomInfo;
  eventId: string;
  maxSeats: number;
  availableSeats: number;
  minutesBeforeSignUpCloses: number;
};

export type CreateSessionDto = {
  eventId: string;
  sessionTypeId: string;
  speakerId: string;
  roomId: string;
  eventBlockId: string;
  sessionName: string;
  descriptionPl: string;
  descriptionEn: string | null;
  startDate: string;
  endDate: string;
  maxSeats: number;
  minutesBeforeSignUpCloses: number;
};

export type UpdateSessionDto = {
  sessionName: string;
  sessionTypeId: string;
  speakerId: string;
  roomId: string;
  eventBlockId: string;
  descriptionPl: string;
  descriptionEn: string | null;
  startDate: string;
  endDate: string;
  maxSeats: number;
  minutesBeforeSignUpCloses: number;
};

export default function useSession() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [session, setSession] = useState<Session>();
  const [tickets, setTickets] = useState<Pageable<ManagerTicketEntry>>();
  const [params, setParams] = useState<FilterOptions>();
  const [isSending, setIsSending] = useState<boolean>(false)

  const createSession = async function(data: CreateSessionDto[]) {
    try {
      setIsCreating(true);
      await apiWithToken.post("/manager/sessions", data);
      toast.success(i18next.t("dataHooks.session.createSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsCreating(false);
    }
  };

  const getSession = async function(id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithEtag.get<SessionDto>(
        `/manager/sessions/${id}`,
      );
      setSession(mapSessionDtoToSession(response.data));
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const updateSession = async function(
    id: string,
    data: UpdateSessionDto,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/sessions/${id}`, data);
      toast.success(i18next.t("dataHooks.session.updateSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const setSessionActive = async function(
    id: string,
    active: boolean,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(
        `/manager/sessions/${id}/set-active?active=${active}`,
      );
      toast.success(i18next.t("dataHooks.session.changeActiveSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const getParticipants = async function(sessionId: string, filterOptions?: FilterOptions) {
    const newFilterOptions = {
      ...params,
      ...filterOptions
    };
    const uri = mapFilterParamsToUri(newFilterOptions);
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<Pageable<ManagerTicketEntryDto>>(
        `/manager/sessions/${sessionId}/tickets?${uri}`,
      );
      setTickets({
        ...response.data,
        content: response.data.content.map(function(e) {
          return {
            ...e,
            createdAt: dayjs(e.createdAt),
          };
        }),
      });
      setParams(newFilterOptions);
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const sendParticipantListToSpeaker = async function(sessionId: string): Promise<boolean> {
    try {
      setIsSending(true);
      await apiWithEtag.post(`/manager/sessions/${sessionId}/send-participant-list-to-speaker`);
      toast.success(i18next.t("dataHooks.session.sendParticipantListSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError>);
      return false;
    } finally {
      setIsSending(false);
    }
  }

  return {
    isFetching,
    session,
    getSession,
    createSession,
    isCreating,
    updateSession,
    isUpdating,
    setSessionActive,
    getParticipants,
    tickets,
    setTickets,
    params,
    isSending,
    sendParticipantListToSpeaker
  };
}
