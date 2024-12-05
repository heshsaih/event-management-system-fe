import dayjs from "dayjs";
import { ParsedToken } from "../data/useAccountStore";
import {
  Location,
  LocationBrief,
  LocationBriefDto,
  LocationDto,
} from "../data/useLocation";
import { Room, RoomDto } from "../data/useRoom";
import { FilterOptions } from "../components/FilterParams";
import {
  Speaker,
  SpeakerBrief,
  SpeakerBriefDto,
  SpeakerDto,
  UpdateSpeakerDto,
} from "../data/useSpeaker";
import { SpeakerTitle, SpeakerTitleDto } from "../data/useSpeakerTitle";
import { Organization, OrganizationDto } from "../data/useOrganization";
import { SessionType, SessionTypeDto } from "../data/useSessionType";
import {
  CreateEventDto,
  CreateSessionWithEventDto,
  Event,
  EventBlock,
  EventBlockDto,
  EventBrief,
  EventBriefDto,
  EventDto,
  UpdateEventDto,
} from "../data/useEvent";
import {
  CreateSessionDto,
  Session,
  SessionDto,
  UpdateSessionDto,
} from "../data/useSession";
import { CreateEventStore } from "../data/useCreateEventStore";
import { CreateSessionForm } from "../pages/manager/create-event-page/SessionForm";
import { UpdateEventSchema } from "../pages/manager/event-page/UpdateEventForm";
import { AddSessionSchema } from "../components/AddSessionForm";
import { UpdateSpeakerFormType } from "../pages/manager/speaker-page/UpdateSpeakerForm";
import { UpdateSessionSchema } from "../pages/manager/event-page/UpdateSessionForm";

export function arrayBufferToBase64(array: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(array);
  bytes.forEach(function (byte) {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
}

export function base64ToArrayBuffer(string: string): ArrayBuffer {
  const binaryString = atob(string);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

export function parseToken(token: string): ParsedToken {
  const claims = token.split(".")[1];
  const decodedToken = atob(claims);
  return JSON.parse(decodedToken);
}

export function mapRoomDtoToRoom(dto: RoomDto): Room {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
  };
}

export function mapLocationDtoToLocation(dto: LocationDto): Location {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
    rooms: dto.rooms.map(mapRoomDtoToRoom),
  };
}

export function mapLocationBriefDtoToLocationBrief(
  dto: LocationBriefDto,
): LocationBrief {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
  };
}

export function mapSpeakerBriefDtoToSpeakerBrief(
  dto: SpeakerBriefDto,
): SpeakerBrief {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
  };
}

export function mapSpeakerDtoToSpeaker(dto: SpeakerDto): Speaker {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
    titleName: mapOtherParamDtoToOtherParam(dto.speakerTitle),
    organizationName: mapOtherParamDtoToOtherParam(dto.organization),
  };
}

export function mapFilterParamsToUri(params: FilterOptions): string {
  return `phrase=${params.phrase ?? ""}&page=${params.page ?? 0}&size=${params.size ?? 20}&showInactive=${params.showInactive ?? true}&direction=${params.direction ?? "desc"}&orderBy=${params.orderBy ?? "createdAt"}`;
}

export function mapOtherParamDtoToOtherParam(
  dto: SpeakerTitleDto | OrganizationDto | SessionTypeDto | null,
): SpeakerTitle | Organization | SessionType | null {
  if (dto === null) {
    return null;
  }
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
  };
}

export function mapEventBlockDtoToEventBlock(dto: EventBlockDto): EventBlock {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
  };
}

export function mapSessionDtoToSession(dto: SessionDto): Session {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
    startDate: dayjs(dto.startDate),
    endDate: dayjs(dto.endDate),
    speaker: mapSpeakerBriefDtoToSpeakerBrief(dto.speaker),
    sessionType: mapOtherParamDtoToOtherParam(dto.sessionType) as SessionType,
    eventBlock: mapEventBlockDtoToEventBlock(dto.eventBlock),
  };
}

export function mapEventDtoToEvent(dto: EventDto): Event {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
    startDate: dayjs(dto.startDate),
    endDate: dayjs(dto.endDate),
    registrationStartDate: dayjs(dto.registrationStartDate),
    eventBlocks: dto.eventBlocks.map(mapEventBlockDtoToEventBlock),
    sessions: dto.sessions.map(mapSessionDtoToSession),
    image: {
      imageName: dto.image.imageName,
      data: dto.image.data,
    },
  };
}

export function mapCreateSessionFormToCreateSessionWithEventDto(
  data: CreateSessionForm,
): CreateSessionWithEventDto {
  return {
    sessionName: data.name,
    descriptionPl: data.descriptionPL,
    descriptionEn: data.descriptionEN,
    startDate: data.startTime.toISOString(),
    endDate: data.endTime.toISOString(),
    speakerId: data.speaker.value,
    roomId: data.room.value,
    sessionTypeId: data.sessionType.value,
    eventBlockName: data.sessionBlock,
    maxSeats: data.maxSeats,
  };
}

export function mapEventDataToCreateEventDto(
  data: CreateEventStore,
): CreateEventDto {
  return {
    image: {
      imageName: data.image?.name as string,
      data: data.image?.data as string,
    },
    name: data.name,
    descriptionPl: data.descriptionPL,
    descriptionEn: data.descriptionEN,
    eventBlocksNames: Array.from(
      new Set(
        data.sessions.map(function (e) {
          return e.sessionBlock;
        }),
      ),
    ),
    startDate: data.startDate.toISOString(),
    endDate: data.endDate.toISOString(),
    registrationStartDate: data.registrationStartDate.toISOString(),
    outsidersAllowed: data.outsidersAllowed,
    minutesBetweenDifferentSessions: data.minutesBetweenSessions,
    surveyManagerEmailTemplateId: "0b2d5602-43e2-46ad-a694-058873001aca",
    signUpManagerEmailTemplateId: "c9c02f48-c4c4-4482-adc3-eb633a0965ae",
    sessions: data.sessions.map(
      mapCreateSessionFormToCreateSessionWithEventDto,
    ),
  };
}

export function mapEventBriefDtoToEventBrief(dto: EventBriefDto): EventBrief {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
    startDate: dayjs(dto.startDate),
    endDate: dayjs(dto.endDate),
    registrationStartDate: dayjs(dto.registrationStartDate),
  };
}

export function mapUpdateEventSchemaToUpdateEventDto(
  data: UpdateEventSchema,
): UpdateEventDto {
  return {
    name: data.name,
    descriptionPl: data.descriptionPl,
    descriptionEn: data.descriptionEn,
    startDate: data.startDate.toISOString(),
    outsidersAllowed: data.outsidersAllowed,
    endDate: data.endDate.toISOString(),
    registrationStartDate: data.registrationStartDate.toISOString(),
    signUpManagerEmailTemplateId: "",
    surveyManagerEmailTemplateId: "",
    minutesBetweenDifferentSessions: data.minutesBetweenSessions,
    image: data.image,
  };
}

export function mapAddSessionSchemaToCreateSessionDto(
  data: AddSessionSchema & { eventId: string },
): CreateSessionDto {
  return {
    eventId: data.eventId,
    sessionTypeId: data.sessionType.value,
    speakerId: data.speaker.value,
    roomId: data.room.value,
    eventBlockId: data.eventBlock.value,
    sessionName: data.sessionName,
    descriptionPl: data.descriptionPl,
    descriptionEn: data.descriptionEn,
    startDate: data.startDate.toISOString(),
    endDate: data.endDate.toISOString(),
    maxSeats: data.maxSeats,
  };
}

export function mapUpdateSpeakerFormTypeToUpdateSpeakerDto(
  data: UpdateSpeakerFormType,
): UpdateSpeakerDto {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    organizationId: data.organization.value,
    speakerTitleId: data.speakerTitle.value,
    email: data.email,
    backupEmail: data.backupEmail,
  };
}

export function mapUpdateSessionSchemaToUpdateSessionDto(
  data: UpdateSessionSchema,
): UpdateSessionDto {
  return {
    sessionName: data.sessionName,
    sessionTypeId: data.sessionType.value,
    speakerId: data.speaker.value,
    roomId: data.room.value,
    eventBlockId: data.eventBlock.value,
    descriptionPl: data.descriptionPl,
    descriptionEn: data.descriptionEn,
    startDate: data.startDate.toISOString(),
    endDate: data.endDate.toISOString(),
    maxSeats: data.maxSeats,
  };
}
