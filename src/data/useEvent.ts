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
import { Entity, EntityDto, Pageable } from "../types";
import { BackendError, handleBackendError } from "../util/parsingErrors";

export type EventBlockDto = EntityDto & {
  eventId: string;
};

export type EventBlock = Entity & {
  eventId: string;
};

export type EventDto = EntityDto & {
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
  signUpEmailTemplateId: string;
  surveyEmailTemplateId: string;
  eventBlocks: EventBlockDto[];
  sessions: SessionDto[];
};

export type Event = Entity & {
  descriptionEn: string;
  descriptionPl: string;
  startDate: Dayjs;
  endDate: Dayjs;
  registrationStartDate: Dayjs;
  outsidersAllowed: boolean;
  minutesBetweenDifferentSessions: number;
  eventBlocks: EventBlock[];
  sessions: Session[];
  image: {
    imageName: string;
    data: string;
  };
  signUpEmailTemplateId: string;
  surveyEmailTemplateId: string;
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
  sessionSignUpManagerEmailTemplateId: string;
  sessionReminderManagerEmailTemplateId: string;
  sessions: CreateSessionWithEventDto[];
};

export type EventBriefDto = EntityDto & {
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
};

export type EventBrief = Entity & {
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
  const [events, setEvents] = useState<Pageable<EventBrief>>();

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
      handleBackendError(e as AxiosError<BackendError | undefined>);
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
      const response = await apiWithToken.get<Pageable<EventDto>>(
        `/manager/events?${uri}`,
      );
      setEvents({
        ...response.data,
        content: response.data.content.map(mapEventBriefDtoToEventBrief),
      });
      setParams(newParams);
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
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
      handleBackendError(e as AxiosError<BackendError | undefined>);
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
      handleBackendError(e as AxiosError<BackendError | undefined>);
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
      handleBackendError(e as AxiosError<BackendError | undefined>);
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
    changeEventActive,
  };
}

export type UseEventObject = ReturnType<typeof useEvent>;
