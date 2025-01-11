import { expect, test } from "vitest";
import { SessionDto } from "../../src/data/useSession";
import {
  mapCreateSessionFormToCreateSessionWithEventDto,
  mapSessionDtoToSession,
  mapSessionForParticipantDtoToSessionForParticipant,
} from "../../src/util/converters";
import dayjs from "dayjs";
import {
  SessionForParticipant,
  SessionForParticipantDto,
} from "../../src/data/useEventParticipant";
import { CreateSessionForm } from "../../src/pages/manager/create-event-page/SessionForm";
import { CreateSessionWithEventDto } from "../../src/data/useEvent";

test("mapSessionDtoToSession test success", function() {
  const dto: SessionDto = {
    id: "8d83f597-35e0-44df-86a1-72271e1608e9",
    createdAt: "2025-01-08T22:40:27.748971",
    updatedAt: "2025-01-08T22:40:27.748971",
    active: true,
    sessionName: "Wyklad 1",
    sessionType: {
      id: "d19c878f-c7a1-4c1d-9aa2-81d11e5bc3c6",
      name: "Wyklad",
      createdAt: "2025-01-08T22:40:27.696321",
      updatedAt: null,
      active: true,
    },
    speaker: {
      id: "d3b82f22-68bf-4171-af89-478111ca5c4e",
      createdAt: "2025-01-08T22:40:27.682487",
      updatedAt: null,
      active: true,
      firstName: "Jan",
      lastName: "Kowalski",
      email: "email@gmail.com",
      backupEmail: "backup@gmail.com",
      titleName: "dr inż.",
      organizationName: "POLITECHNIKA ŁODZKA",
    },
    eventBlock: {
      id: "1d7cec74-f176-4bb5-82ed-1065521e8207",
      name: "Blok 1 eventu",
      createdAt: "2025-01-08T22:40:27.747847",
      updatedAt: "2025-01-08T22:40:27.754482",
      eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
      active: true,
    },
    descriptionPl: "Opis wykladu 1",
    descriptionEn: "Description of lecture 1",
    startDate: "2025-01-08T22:50:27.699648",
    endDate: "2025-01-08T23:40:27.699648",
    room: {
      locationId: "9274bddb-d655-4024-bdff-77d13bef968a",
      roomId: "10857a0b-3423-42c5-a119-c58f6fa45ca2",
      locationName: "LODEX B9",
      active: true,
      buildingNumber: "1",
      street: "Aleje Politechniki",
      city: "Lodz",
      postalCode: "90-924",
      roomNumber: "Sala 1",
    },
    eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    maxSeats: 100,
    availableSeats: 100,
    minutesBeforeSignUpCloses: 30,
  };

  const result = mapSessionDtoToSession(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
  expect(result.startDate.isValid()).toBe(true);
  expect(result.endDate.isValid()).toBe(true);
});

test("mapSessionDtoToSession test fail wrong date formats", function() {
  const dto: SessionDto = {
    id: "8d83f597-35e0-44df-86a1-72271e1608e9",
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
    sessionName: "Wyklad 1",
    sessionType: {
      id: "d19c878f-c7a1-4c1d-9aa2-81d11e5bc3c6",
      name: "Wyklad",
      createdAt: "2025-01-08T22:40:27.696321",
      updatedAt: null,
      active: true,
    },
    speaker: {
      id: "d3b82f22-68bf-4171-af89-478111ca5c4e",
      createdAt: "2025-01-08T22:40:27.682487",
      updatedAt: null,
      active: true,
      firstName: "Jan",
      lastName: "Kowalski",
      email: "email@gmail.com",
      backupEmail: "backup@gmail.com",
      titleName: "dr inż.",
      organizationName: "POLITECHNIKA ŁODZKA",
    },
    eventBlock: {
      id: "1d7cec74-f176-4bb5-82ed-1065521e8207",
      name: "Blok 1 eventu",
      createdAt: "2025-01-08T22:40:27.747847",
      updatedAt: "2025-01-08T22:40:27.754482",
      eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
      active: true,
    },
    descriptionPl: "Opis wykladu 1",
    descriptionEn: "Description of lecture 1",
    startDate: "amo",
    endDate: "gus",
    room: {
      locationId: "9274bddb-d655-4024-bdff-77d13bef968a",
      roomId: "10857a0b-3423-42c5-a119-c58f6fa45ca2",
      locationName: "LODEX B9",
      active: true,
      buildingNumber: "1",
      street: "Aleje Politechniki",
      city: "Lodz",
      postalCode: "90-924",
      roomNumber: "Sala 1",
    },
    eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    maxSeats: 100,
    availableSeats: 100,
    minutesBeforeSignUpCloses: 30,
  };

  const result = mapSessionDtoToSession(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.updatedAt.isValid()).toBe(false);
  expect(result.startDate.isValid()).toBe(false);
  expect(result.endDate.isValid()).toBe(false);
});

test("mapSessionForParrticipantDtoToSessionForParticipant test success", function() {
  const dto: SessionForParticipantDto = {
    id: "8d83f597-35e0-44df-86a1-72271e1608e9",
    sessionName: "Wyklad 1",
    sessionType: "Wyklad",
    speaker: {
      firstName: "Jan",
      lastName: "Kowalski",
      titleName: "dr inż.",
      organizationName: "POLITECHNIKA ŁODZKA",
    },
    eventBlock: "Blok 1 eventu",
    startDate: "2025-01-08T22:50:27.699648",
    endDate: "2025-01-08T23:40:27.699648",
    descriptionEn: "Description of lecture 1",
    descriptionPl: "Opis wykladu 1",
    room: {
      locationName: "LODEX B9",
      buildingNumber: "1",
      street: "Aleje Politechniki",
      city: "Lodz",
      postalCode: "90-924",
      roomNumber: "Sala 1",
    },
    eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    maxSeats: 100,
    availableSeats: 100,
    minutesBeforeSignUpCloses: 30,
  };

  const result: SessionForParticipant =
    mapSessionForParticipantDtoToSessionForParticipant(dto);

  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(result.startDate.isValid()).toBe(true);
  expect(result.endDate.isValid()).toBe(true);
});

test("mapSessionForParrticipantDtoToSessionForParticipant test fail wrong date formats", function() {
  const dto: SessionForParticipantDto = {
    id: "8d83f597-35e0-44df-86a1-72271e1608e9",
    sessionName: "Wyklad 1",
    sessionType: "Wyklad",
    speaker: {
      firstName: "Jan",
      lastName: "Kowalski",
      titleName: "dr inż.",
      organizationName: "POLITECHNIKA ŁODZKA",
    },
    eventBlock: "Blok 1 eventu",
    startDate: "sigma",
    endDate: "boy",
    descriptionEn: "Description of lecture 1",
    descriptionPl: "Opis wykladu 1",
    room: {
      locationName: "LODEX B9",
      buildingNumber: "1",
      street: "Aleje Politechniki",
      city: "Lodz",
      postalCode: "90-924",
      roomNumber: "Sala 1",
    },
    eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    maxSeats: 100,
    availableSeats: 100,
    minutesBeforeSignUpCloses: 30,
  };

  const result: SessionForParticipant =
    mapSessionForParticipantDtoToSessionForParticipant(dto);

  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(result.startDate.isValid()).toBe(false);
  expect(result.endDate.isValid()).toBe(false);
});

test("mapCreateSessionFormToCreateSessionWithEventDto test success", function() {
  const dto: Partial<CreateSessionForm> = {
    startTime: dayjs(),
    endTime: dayjs(),
    speaker: {
      label: "",
      value: "test valueee speaker",
    },
    room: {
      label: "",
      value: "test value room",
    },
    sessionType: {
      label: "",
      value: "test value session type",
    },
  };

  const result: CreateSessionWithEventDto =
    mapCreateSessionFormToCreateSessionWithEventDto(dto as CreateSessionForm);

  const mappedStartDate = dayjs(result.startDate);
  const mappedEndDate = dayjs(result.endDate);

  expect(mappedStartDate.isValid()).toBe(true);
  expect(mappedEndDate.isValid()).toBe(true);
  expect(mappedStartDate.get("seconds")).toBe(0);
  expect(mappedEndDate.get("milliseconds")).toBe(0);
  expect(result.speakerId).toEqual(dto.speaker?.value);
  expect(result.roomId).toEqual(dto.room?.value);
  expect(result.sessionTypeId).toEqual(dto.sessionType?.value);
});
