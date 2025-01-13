import dayjs from "dayjs";
import { ParsedToken } from "../data/useAccountStore";
import {
  CreateLocationDto,
  CreateRoomWithLocationDto,
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
import { SessionType } from "../data/useSessionType";
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
import { OtherParam, OtherParamDto } from "../types";
import { EmailTemplate, EmailTemplateDto } from "../data/useEmailNotification";
import { LocationForm } from "../components/AddLocationForm";
import {
  EventForParticipant,
  EventForParticipantBrief,
  EventForParticipantBriefDto,
  EventForParticipantDto,
  SessionForParticipant,
  SessionForParticipantDto,
  Ticket,
  TicketDto,
} from "../data/useEventParticipant";
import { Account, AccountDto } from "../data/useAccount";

export function arrayBufferToBase64(array: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(array);
  bytes.forEach(function(byte) {
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

export function parseToken(token: string): ParsedToken | undefined {
  try {
    const claims = token.split(".")[1];
    const decodedToken = atob(claims);
    const parsedToken = JSON.parse(decodedToken) as ParsedToken;
    if (
      !parsedToken.family_name ||
      !parsedToken.given_name ||
      !parsedToken.exp ||
      !parsedToken.iat ||
      !parsedToken.iss ||
      !parsedToken.sub ||
      !parsedToken.email ||
      !parsedToken.authorities ||
      !parsedToken.external_id
    ) {
      return undefined;
    }
    return parsedToken;
  } catch (e) {
    console.error(e);
    return undefined;
  }
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

export function mapLocationFormToCreateLocationDto(
  data: LocationForm,
): CreateLocationDto {
  return {
    name: data.name,
    buildingNumber: data.buildingNumber,
    street: data.street,
    city: data.city,
    postalCode: data.postalCode,
    rooms: data.rooms.map(function(e): CreateRoomWithLocationDto {
      return {
        roomNumber: e.roomNumber,
        capacity: e.capacity,
      };
    }),
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

export function mapFilterParamsToUri(params?: FilterOptions): string {
  return `phrase=${params?.phrase ?? ""}&page=${params?.page ?? 0}&size=${params?.size ?? 20}&showInactive=${params?.showInactive ?? true}&direction=${params?.direction ?? "desc"}&orderBy=${params?.orderBy ?? "createdAt"}`;
}

export function mapOtherParamDtoToOtherParam(
  dto: OtherParamDto | null,
): OtherParam | null {
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
  let desc: string | null = null;
  
  if (data.descriptionEN && data.descriptionEN.length > 0) {
    desc = data.descriptionEN;
  }

  return {
    sessionName: data.name,
    descriptionPl: data.descriptionPL,
    descriptionEn: desc,
    startDate: data.startTime
      .set("seconds", 0)
      .set("milliseconds", 0)
      .toISOString(),
    endDate: data.endTime
      .set("seconds", 0)
      .set("milliseconds", 0)
      .toISOString(),
    speakerId: data.speaker.value,
    roomId: data.room.value,
    sessionTypeId: data.sessionType.value,
    eventBlockName: data.sessionBlock,
    maxSeats: data.maxSeats,
    minutesBeforeSignUpCloses: data.minutesBeforeSignUpCloses,
  };
}

export function mapEventDataToCreateEventDto(
  data: CreateEventStore,
): CreateEventDto {
  let desc: string | null = null;
  
  if (data.descriptionEN && data.descriptionEN.length > 0) {
    desc = data.descriptionEN;
  }

  return {
    image: {
      imageName: data.image?.name as string,
      data: data.image?.data as string,
    },
    name: data.name,
    descriptionPl: data.descriptionPL,
    descriptionEn: desc,
    eventBlocksNames: Array.from(
      new Set(
        data.sessions.map(function(e) {
          return e.sessionBlock;
        }),
      ),
    ),
    startDate: data.startDate
      .set("hours", 1)
      .set("minutes", 0)
      .set("seconds", 0)
      .set("milliseconds", 0)
      .toISOString(),
    endDate: data.endDate
      .set("hours", 24)
      .set("minutes", 59)
      .set("seconds", 59)
      .set("milliseconds", 999)
      .toISOString(),
    registrationStartDate: data.registrationStartDate
      .set("hours", 1)
      .set("minutes", 0)
      .set("seconds", 0)
      .set("milliseconds", 0)
      .toISOString(),
    outsidersAllowed: data.outsidersAllowed,
    minutesBetweenDifferentSessions: data.minutesBetweenSessions,
    surveyManagerEmailTemplateId:
      data.surveyManagerEmailTemplateId.value.length === 0
        ? null
        : data.surveyManagerEmailTemplateId.value,
    sessionSignUpManagerEmailTemplateId:
      data.sessionSignUpManagerEmailTemplateId.value.length === 0
        ? null
        : data.sessionSignUpManagerEmailTemplateId.value,
    sessionReminderManagerEmailTemplateId:
      data.sessionReminderManagerEmailTemplateId.value.length === 0
        ? null
        : data.sessionReminderManagerEmailTemplateId.value,
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
  let desc: string | null = null;

  if (data.descriptionEn && data.descriptionEn.length > 0) {
    desc = data.descriptionEn;
  }

  return {
    name: data.name,
    descriptionPl: data.descriptionPl,
    descriptionEn: desc,
    startDate: data.startDate
      .set("hour", 1)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0)
      .toISOString(),
    outsidersAllowed: data.outsidersAllowed,
    endDate: data.endDate
      .set("hour", 24)
      .set("minute", 59)
      .set("second", 59)
      .set("millisecond", 999)
      .toISOString(),
    registrationStartDate: data.registrationStartDate
      .set("hour", 1)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0)
      .toISOString(),
    minutesBetweenDifferentSessions: data.minutesBetweenSessions,
    image: data.image,
    surveyManagerEmailTemplateId: data.surveyTemplateId,
    sessionReminderManagerEmailTemplateId: data.reminderTemplateId,
    sessionSignUpManagerEmailTemplateId: data.signUpTemplateId,
  };
}

export function mapEventToUpdateEventDtoForMailTemplateUpdate(
  event: Event,
): UpdateEventDto {
  return {
    name: event.name,
    descriptionPl: event.descriptionPl,
    descriptionEn: event.descriptionEn,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate.toISOString(),
    registrationStartDate: event.registrationStartDate.toISOString(),
    minutesBetweenDifferentSessions: event.minutesBetweenDifferentSessions,
    image: event.image,
    surveyManagerEmailTemplateId: event.surveyManagerEmailTemplateId,
    sessionSignUpManagerEmailTemplateId:
      event.sessionSignUpManagerEmailTemplateId,
    sessionReminderManagerEmailTemplateId:
      event.sessionReminderManagerEmailTemplateId,
    outsidersAllowed: event.outsidersAllowed,
  };
}

export function mapAddSessionSchemaToCreateSessionDto(
  data: AddSessionSchema & { eventId: string },
): CreateSessionDto {
  let desc: string | null = null;

  if (data.descriptionEn && data.descriptionEn.length > 0) {
    desc = data.descriptionEn;
  }

  return {
    eventId: data.eventId,
    sessionTypeId: data.sessionType.value,
    speakerId: data.speaker.value,
    roomId: data.room.value,
    eventBlockId: data.eventBlock.value,
    sessionName: data.sessionName,
    descriptionPl: data.descriptionPl,
    descriptionEn: desc,
    startDate: data.startDate
      .set("seconds", 0)
      .set("milliseconds", 0)
      .toISOString(),
    endDate: data.endDate
      .set("seconds", 0)
      .set("milliseconds", 0)
      .toISOString(),

    maxSeats: data.maxSeats,
    minutesBeforeSignUpCloses: data.minutesBeforeSignUpCloses,
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
  let desc: string | null = null;

  if (data.descriptionEn && data.descriptionEn.length > 0) {
    desc = data.descriptionEn;
  }

  return {
    sessionName: data.sessionName,
    sessionTypeId: data.sessionType.value,
    speakerId: data.speaker.value,
    roomId: data.room.value,
    eventBlockId: data.eventBlock.value,
    descriptionPl: data.descriptionPl,
    descriptionEn: desc,
    startDate: data.startDate
      .set("seconds", 0)
      .set("milliseconds", 0)
      .toISOString(),
    endDate: data.endDate
      .set("seconds", 0)
      .set("milliseconds", 0)
      .toISOString(),
    maxSeats: data.maxSeats,
    minutesBeforeSignUpCloses: data.minutesBeforeSignUpCloses,
  };
}

export function mapEmailTemplateDtoToEmailTemplate(
  dto: EmailTemplateDto,
): EmailTemplate {
  return {
    ...dto,
    createdAt: dayjs(dto.createdAt),
    updatedAt: dayjs(dto.updatedAt),
  };
}

export function mapEventForParticipantBtiefDtoToEventForParticipantBrief(
  data: EventForParticipantBriefDto,
): EventForParticipantBrief {
  return {
    ...data,
    startDate: dayjs(data.startDate),
    endDate: dayjs(data.endDate),
  };
}

export function mapSessionForParticipantDtoToSessionForParticipant(
  data: SessionForParticipantDto,
): SessionForParticipant {
  return {
    ...data,
    startDate: dayjs(data.startDate),
    endDate: dayjs(data.endDate),
    ticket: mapTicketDtoToTicket(data.ticket),
  };
}

export function mapTicketDtoToTicket(
  data: TicketDto | undefined | null,
): Ticket | undefined | null {
  if (data === undefined || data === null) {
    return data;
  }
  return {
    ...data,
    createdAt: dayjs(data.createdAt),
  };
}

export function mapEventForParticipantDtoToEventForParticipant(
  data: EventForParticipantDto,
): EventForParticipant {
  return {
    ...data,
    startDate: dayjs(data.startDate),
    endDate: dayjs(data.endDate),
  };
}

export function mapAccountDtoToAccount(data: AccountDto): Account {
  return {
    ...data,
    createdAt: dayjs(data.createdAt),
    updatedAt: dayjs(data.updatedAt),
    lastSuccessfulLogin: dayjs(data.lastSuccessfulLogin),
  };
}
