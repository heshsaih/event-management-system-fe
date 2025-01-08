import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  mapEventForParticipantBtiefDtoToEventForParticipantBrief,
  mapEventForParticipantDtoToEventForParticipant,
  mapSessionForParticipantDtoToSessionForParticipant,
} from "../util/converters";
import { apiWithToken } from "../api/config";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import { AxiosError } from "axios";

export type TicketDto = {};

export type Ticket = {};

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

export default function useEventParticipant() {
  const [events, setEvents] = useState<EventForParticipantBrief[]>();
  const [event, setEvent] = useState<EventForParticipant>();
  const [sessions, setSessions] = useState<SessionForParticipant[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingSessions, setIsFetchingSessions] = useState<boolean>(false);

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
        const response = await apiWithToken.get<SessionForParticipantDto[]>(
          `/open/events/${event.id}/sessions`,
        );
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
  };
}
