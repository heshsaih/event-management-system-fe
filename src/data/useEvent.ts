import { useState } from "react";
import { Session, SessionDto } from "./useSession";
import { apiWithEtag, apiWithToken } from "../api/config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import {
  mapEventBriefDtoToEventBrief,
  mapEventDtoToEvent,
  mapFilterParamsToUri,
} from "../util/converters";
import { FilterOptions } from "../components/FilterParams";

export type EventBlockDto = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  eventId: string;
  active: boolean;
};

export type EventBlock = Omit<EventBlockDto, "createdAt" | "updatedAt"> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

export type EventDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  name: string;
  descriptionEn: string;
  descriptionPl: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  outsidersAllowed: boolean;
  minutesBetweenDifferentSessions: number;
  image: {
    imageName: string;
    data: string;
  };
  signUpManagerEmailTemplateId: string;
  surveyManagerEmailTemplateId: string;
  eventBlocks: EventBlockDto[];
  sessions: SessionDto[];
};

export type Event = Omit<
  EventDto,
  | "createdAt"
  | "updatedAt"
  | "eventBlocks"
  | "sessions"
  | "startDate"
  | "endDate"
  | "registrationStartDate"
> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  registrationStartDate: Dayjs;
  eventBlocks: EventBlock[];
  sessions: Session[];
};

export type CreateSessionWithEventDto = {
  sessionName: string;
  descriptionPl: string;
  descriptionEn?: string;
  startDate: string;
  endDate: string;
  speakerId: string;
  roomId: string;
  sessionTypeId: string;
  eventBlockName: string;
  maxSeats: number;
};

export type CreateEventDto = {
  image: {
    imageName: string;
    data: string;
  };
  name: string;
  descriptionPl: string;
  descriptionEn?: string;
  eventBlocksNames: string[];
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  outsidersAllowed: boolean;
  minutesBetweenDifferentSessions: number;
  surveyManagerEmailTemplateId: string;
  signUpManagerEmailTemplateId: string;
  sessions: CreateSessionWithEventDto[];
};

export type EventBriefDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  name: string;
  descriptionEn?: string;
  descriptionPl: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  outsidersAllowed: boolean;
  minutesBetweenDifferentSessions: number;
  image: {
    imageName: string;
    data: string;
  };
};

export type UpdateEventDto = {
  image: {
    imageName: string;
    data: string;
  };
  name: string;
  descriptionPl: string;
  descriptionEn?: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  outsidersAllowed: boolean;
  minutesBetweenDifferentSessions: number;
  signUpManagerEmailTemplateId: string;
  surveyManagerEmailTemplateId: string;
};

export type EventBrief = Omit<
  EventBriefDto,
  "createdAt" | "updatedAt" | "registrationStartDate" | "startDate" | "endDate"
> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
  registrationStartDate: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
};

export default function useEvent() {
  const [params, setParams] = useState<FilterOptions>();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [event, setEvent] = useState<Event>();
  const [events, setEvents] = useState<EventBrief[]>();

  const createEvent = async function(
    data: CreateEventDto,
  ): Promise<string | undefined> {
    try {
      setIsCreating(true);
      const response = await apiWithToken.post<{ id: string }>(
        `/manager/events`,
        data,
      );
      toast.success(`Wydarzenie \"${data.name}\" zostało utworzone`);
      return response.data.id;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się utworzyć wydarzenia: ${e.response?.data}`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const getAllEvents = async function(filterParams?: FilterOptions) {
    const newParams = {
      ...params,
      ...filterParams,
    };
    const uri = mapFilterParamsToUri(newParams);
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<EventDto[]>(
        `/manager/events?${uri}`,
      );
      setEvents(response.data.map(mapEventBriefDtoToEventBrief));
      setParams(newParams);
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się pobrać wydarzeń: ${e.response?.data}`);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const getEvent = async function(id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithEtag.get<EventDto>(`/manager/events/${id}`);
      setEvent(mapEventDtoToEvent(response.data));
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się pobrać wydarzenia: ${e.response?.data}`);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const updateEvent = async function(
    id: string,
    data: UpdateEventDto,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/events/${id}`, data);
      toast.success("Wydarzenie zostało zaktualizowane");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(`Nie udało się pobrać wydarzenia: ${e.response?.data}`);
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const changeEventActive = async function(
    id: string,
    active: boolean,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(
        `/manager/events/${id}/set-active?active=${active}`,
      );
      toast.success("Status wydarzenia został zmieniony");
      return true;
    } catch (e) {
      if (e instanceof AxiosError && e.status) {
        toast.error(
          `Nie udało się zmienić statusu wydarzenia: ${e.response?.data}`,
        );
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    event,
    createEvent,
    getEvent,
    isFetching,
    isCreating,
    getAllEvents,
    params,
    events,
    updateEvent,
    isUpdating,
    changeEventActive
  };
}

export type UseEventObject = ReturnType<typeof useEvent>;
