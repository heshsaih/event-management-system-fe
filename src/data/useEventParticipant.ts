import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  mapEventForParticipantBtiefDtoToEventForParticipantBrief,
  mapEventForParticipantDtoToEventForParticipant,
  mapFilterParamsToUri,
  mapSessionForParticipantDtoToSessionForParticipant,
} from "../util/converters";
import { apiWithEtag, apiWithToken } from "../api/config";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import i18next from "i18next";
import { Pageable } from "../types";
import { FilterOptions } from "../components/FilterParams";

export enum TicketTime {
  PAST = "past",
  FUTURE = "future",
}

export type TicketDto = {
  id: string;
  accountId: string;
  sessionId: string;
  eventId: string;
  sessionName: string;
  reserve: boolean;
  active: boolean;
  createdAt: string;
};

export type Ticket = Omit<TicketDto, "createdAt"> & {
  createdAt: Dayjs;
};

export type EventForParticipantBriefDto = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  descriptionPl: string;
  descriptionEn?: string;
  outsidersAllowed: boolean;
  minutesBetweenDifferentSessions: number;
  image: {
    imageName: string;
    data: string;
  };
};

export type EventForParticipantBrief = Omit<
  EventForParticipantBriefDto,
  "startDate" | "endDate"
> & {
  startDate: Dayjs;
  endDate: Dayjs;
};

export type EventForParticipantDto = {
  id: string;
  name: string;
  descriptionPl: string;
  descriptionEn?: string;
  startDate: string;
  endDate: string;
  outsidersAllowed: boolean;
  image: {
    imageName: string;
    data: string;
  };
};

export type EventForParticipant = Omit<
  EventForParticipantDto,
  "startDate" | "endDate"
> & {
  startDate: Dayjs;
  endDate: Dayjs;
};

export type SessionForParticipantDto = {
  id: string;
  sessionName: string;
  descriptionPl: string;
  descriptionEn?: string;
  sessionType: string;
  speaker: {
    firstName: string;
    lastName: string;
    titleName: string;
    organizationName: string;
  };
  eventBlock: string;
  startDate: string;
  endDate: string;
  room: {
    locationName: string;
    buildingNumber: string;
    street: string;
    city: string;
    postalCode: string;
    roomNumber: string;
  };
  eventId: string;
  maxSeats: number;
  availableSeats: number;
  minutesBeforeSignUpCloses: number;
  ticket?: TicketDto | null;
};

export type SessionForParticipant = Omit<
  SessionForParticipantDto,
  "startDate" | "endDate" | "ticket"
> & {
  startDate: Dayjs;
  endDate: Dayjs;
  ticket?: Ticket | null;
};

export default function useEventParticipant(isParticipant?: boolean) {
  const [events, setEvents] = useState<EventForParticipantBrief[]>();
  const [event, setEvent] = useState<EventForParticipant>();
  const [sessions, setSessions] = useState<SessionForParticipant[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingSessions, setIsFetchingSessions] = useState<boolean>(false);
  const [isFetchingSession, setIsFetchingSession] = useState<boolean>(false);
  const [session, setSession] = useState<SessionForParticipant>();
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Pageable<SessionForParticipant>>();
  const [params, setParams] = useState<FilterOptions>({
    orderBy: "createdAt"
  });

  const getAllEvents = async function() {
    try {
      setIsFetching(true);
      const response =
        await apiWithToken.get<EventForParticipantBriefDto[]>(`/open/events`);
      setEvents(
        response.data.map(
          mapEventForParticipantBtiefDtoToEventForParticipantBrief,
        ),
      );
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError>);
    } finally {
      setIsFetching(false);
    }
  };

  const getEvent = async function(id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<EventForParticipantDto>(
        `/open/events/${id}`,
      );
      setEvent(mapEventForParticipantDtoToEventForParticipant(response.data));
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError>);
    } finally {
      setIsFetching(false);
    }
  };

  const getSessions = async function() {
    if (event) {
      try {
        setIsFetchingSessions(true);
        let uri: string;
        if (isParticipant) {
          uri = `/participant/event/${event.id}/sessions`;
        } else {
          uri = `/open/events/${event.id}/sessions`;
        }
        const response =
          await apiWithToken.get<SessionForParticipantDto[]>(uri);
        setSessions(
          response.data.map(mapSessionForParticipantDtoToSessionForParticipant),
        );
      } catch (e) {
        handleBackendError(e as AxiosError<BackendError>);
      } finally {
        setIsFetchingSessions(false);
      }
    }
  };

  const getSession = async function(id: string) {
    try {
      setIsFetchingSession(true);
      const response = await apiWithEtag.get<SessionForParticipantDto>(
        `/participant/sessions/${id}`,
      );
      setSession(
        mapSessionForParticipantDtoToSessionForParticipant(response.data),
      );
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError>);
    } finally {
      setIsFetchingSession(false);
    }
  };

  const signIn = async function(sessionId: string): Promise<boolean> {
    try {
      setIsSigning(true);
      await apiWithEtag.post(`/participant/sessions/${sessionId}/ticket`);
      toast.success(i18next.t("dataHooks.eventParticipant.signInSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError>);
      return false;
    } finally {
      setIsSigning(false);
    }
  };

  const signOut = async function(ticketId: string): Promise<boolean> {
    try {
      setIsSigning(true);
      await apiWithToken.delete(`/participant/sessions/${ticketId}/ticket`);
      toast.success(i18next.t("dataHooks.eventParticipant.signOutSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError>);
      return false;
    } finally {
      setIsSigning(false);
    }
  };

  const getTickets = async function(type: TicketTime, filterOptions?: FilterOptions) {
    const newOptions = {
      ...params,
      ...filterOptions,
    };
    const uri = mapFilterParamsToUri(newOptions).replace("name", "sessionName");
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<
        Pageable<SessionForParticipantDto>
      >(`/participant/sessions/${type}?${uri}`);
      setTickets({
        ...response.data,
        content: response.data.content.map(
          mapSessionForParticipantDtoToSessionForParticipant,
        ),
      });
      setParams(newOptions);
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError>);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(
    function() {
      if (event) {
        getSessions();
      }
    },
    [event],
  );

  return {
    events,
    event,
    sessions,
    isFetching,
    isFetchingSessions,
    getAllEvents,
    getEvent,
    getSession,
    session,
    isFetchingSession,
    signIn,
    isSigning,
    setSession,
    getSessions,
    signOut,
    getTickets,
    tickets,
    params,
  };
}
