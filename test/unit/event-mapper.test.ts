import { expect, test } from "vitest";
import {
  Event,
  EventBrief,
  EventBriefDto,
  EventDto,
} from "../../src/data/useEvent";
import {
  mapEventBriefDtoToEventBrief,
  mapEventDtoToEvent,
  mapEventForParticipantBtiefDtoToEventForParticipantBrief,
  mapEventForParticipantDtoToEventForParticipant,
} from "../../src/util/converters";
import dayjs from "dayjs";
import {
  EventForParticipant,
  EventForParticipantBrief,
  EventForParticipantBriefDto,
  EventForParticipantDto,
} from "../../src/data/useEventParticipant";

test("mapEventDtoToEvent test success", function() {
  const dto: EventDto = {
    id: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    createdAt: "2025-01-08T22:40:27.746725",
    updatedAt: "2025-01-08T22:41:05.873585",
    active: true,
    name: "Event 1",
    descriptionEn: "Description of event 1",
    descriptionPl: "Opis eventu 1",
    startDate: "2025-01-08T00:00:00",
    endDate: "2025-01-18T23:59:59.999",
    registrationStartDate: "2025-01-05T00:00:00",
    outsidersAllowed: true,
    minutesBetweenDifferentSessions: 10,
    image: {
      imageName: "Politechnikia Lodzka_003.jpg",
      data: "weeeeee",
    },
    sessionSignUpManagerEmailTemplateId: "76d3355a-1d54-4e87-b4fe-7abbceeec8f6",
    surveyManagerEmailTemplateId: null,
    sessionReminderManagerEmailTemplateId:
      "20d13b67-5df3-4a2d-ae38-8cf40d2bea20",
    eventBlocks: [
      {
        id: "1d7cec74-f176-4bb5-82ed-1065521e8207",
        name: "Blok 1 eventu",
        createdAt: "2025-01-08T22:40:27.747847",
        updatedAt: "2025-01-08T22:40:27.754482",
        eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
        active: true,
      },
      {
        id: "3be6e7d0-3dfb-41b1-8f76-d4bbf6904615",
        name: "Blok 2 eventu",
        createdAt: "2025-01-08T22:40:27.748415",
        updatedAt: "2025-01-08T22:40:27.75612",
        eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
        active: true,
      },
    ],
    sessions: [
      {
        id: "8d83f597-35e0-44df-86a1-72271e1608e9",
        createdAt: "2025-01-08T22:40:27.748971",
        updatedAt: null,
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
      },
      {
        id: "d17493d9-e09d-4c6a-9210-fb3300575af9",
        createdAt: "2025-01-08T22:40:27.749524",
        updatedAt: null,
        active: true,
        sessionName: "Wyklad 2",
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
          id: "3be6e7d0-3dfb-41b1-8f76-d4bbf6904615",
          name: "Blok 2 eventu",
          createdAt: "2025-01-08T22:40:27.748415",
          updatedAt: "2025-01-08T22:40:27.75612",
          eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
          active: true,
        },
        descriptionPl: "Opis wykladu 2",
        descriptionEn: "Description of lecture 2",
        startDate: "2025-01-09T03:40:27.699648",
        endDate: "2025-01-09T05:10:27.699648",
        room: {
          locationId: "9274bddb-d655-4024-bdff-77d13bef968a",
          roomId: "debe25cc-0901-4840-a2db-5ec11500dc0a",
          locationName: "LODEX B9",
          active: true,
          buildingNumber: "1",
          street: "Aleje Politechniki",
          city: "Lodz",
          postalCode: "90-924",
          roomNumber: "Sala 2",
        },
        eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
        maxSeats: 100,
        availableSeats: 100,
        minutesBeforeSignUpCloses: 30,
      },
    ],
  };

  const result: Event = mapEventDtoToEvent(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(dayjs.isDayjs(result.registrationStartDate)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.startDate.isValid()).toBe(true);
  expect(result.endDate.isValid()).toBe(true);
  expect(result.registrationStartDate.isValid()).toBe(true);
});

test("mapEventDtoToEvent test fail wrong date formats", function() {
  const dto: EventDto = {
    id: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
    name: "Event 1",
    descriptionEn: "Description of event 1",
    descriptionPl: "Opis eventu 1",
    startDate: "amo",
    endDate: "gus",
    registrationStartDate: "eeeeeeeeee",
    outsidersAllowed: true,
    minutesBetweenDifferentSessions: 10,
    image: {
      imageName: "Politechnikia Lodzka_003.jpg",
      data: "weeeeee",
    },
    sessionSignUpManagerEmailTemplateId: "76d3355a-1d54-4e87-b4fe-7abbceeec8f6",
    surveyManagerEmailTemplateId: null,
    sessionReminderManagerEmailTemplateId:
      "20d13b67-5df3-4a2d-ae38-8cf40d2bea20",
    eventBlocks: [
      {
        id: "1d7cec74-f176-4bb5-82ed-1065521e8207",
        name: "Blok 1 eventu",
        createdAt: "2025-01-08T22:40:27.747847",
        updatedAt: "2025-01-08T22:40:27.754482",
        eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
        active: true,
      },
      {
        id: "3be6e7d0-3dfb-41b1-8f76-d4bbf6904615",
        name: "Blok 2 eventu",
        createdAt: "2025-01-08T22:40:27.748415",
        updatedAt: "2025-01-08T22:40:27.75612",
        eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
        active: true,
      },
    ],
    sessions: [
      {
        id: "8d83f597-35e0-44df-86a1-72271e1608e9",
        createdAt: "2025-01-08T22:40:27.748971",
        updatedAt: null,
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
      },
      {
        id: "d17493d9-e09d-4c6a-9210-fb3300575af9",
        createdAt: "2025-01-08T22:40:27.749524",
        updatedAt: null,
        active: true,
        sessionName: "Wyklad 2",
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
          id: "3be6e7d0-3dfb-41b1-8f76-d4bbf6904615",
          name: "Blok 2 eventu",
          createdAt: "2025-01-08T22:40:27.748415",
          updatedAt: "2025-01-08T22:40:27.75612",
          eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
          active: true,
        },
        descriptionPl: "Opis wykladu 2",
        descriptionEn: "Description of lecture 2",
        startDate: "2025-01-09T03:40:27.699648",
        endDate: "2025-01-09T05:10:27.699648",
        room: {
          locationId: "9274bddb-d655-4024-bdff-77d13bef968a",
          roomId: "debe25cc-0901-4840-a2db-5ec11500dc0a",
          locationName: "LODEX B9",
          active: true,
          buildingNumber: "1",
          street: "Aleje Politechniki",
          city: "Lodz",
          postalCode: "90-924",
          roomNumber: "Sala 2",
        },
        eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
        maxSeats: 100,
        availableSeats: 100,
        minutesBeforeSignUpCloses: 30,
      },
    ],
  };

  const result: Event = mapEventDtoToEvent(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(dayjs.isDayjs(result.registrationStartDate)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.startDate.isValid()).toBe(false);
  expect(result.endDate.isValid()).toBe(false);
  expect(result.registrationStartDate.isValid()).toBe(false);
});

test("mapEventBriefDtoToEventBrief test success", function() {
  const dto: EventBriefDto = {
    id: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    createdAt: "2025-01-08T22:40:27.746725",
    updatedAt: "2025-01-08T22:41:05.873585",
    active: true,
    name: "Event 1",
    descriptionEn: "Description of event 1",
    startDate: "2025-01-08T00:00:00",
    descriptionPl: "Opis eventu 1",
    endDate: "2025-01-18T23:59:59.999",
    registrationStartDate: "2025-01-05T00:00:00",
    outsidersAllowed: true,
    minutesBetweenDifferentSessions: 10,
    image: {
      imageName: "Politechnikia Lodzka_003.jpg",
      data: "weeeeeeeee",
    },
  };

  const result: EventBrief = mapEventBriefDtoToEventBrief(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(dayjs.isDayjs(result.registrationStartDate)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.startDate.isValid()).toBe(true);
  expect(result.endDate.isValid()).toBe(true);
  expect(result.registrationStartDate.isValid()).toBe(true);
});

test("mapEventBriefDtoToEventBrief test fail wrong date formats", function() {
  const dto: EventBriefDto = {
    id: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
    name: "Event 1",
    descriptionEn: "Description of event 1",
    startDate: "amo",
    descriptionPl: "Opis eventu 1",
    endDate: "gus",
    registrationStartDate: "eeeeeeeeeeeeee",
    outsidersAllowed: true,
    minutesBetweenDifferentSessions: 10,
    image: {
      imageName: "Politechnikia Lodzka_003.jpg",
      data: "weeeeeeeee",
    },
  };

  const result: EventBrief = mapEventBriefDtoToEventBrief(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(dayjs.isDayjs(result.registrationStartDate)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.startDate.isValid()).toBe(false);
  expect(result.endDate.isValid()).toBe(false);
  expect(result.registrationStartDate.isValid()).toBe(false);
});

test("mapEventForParticipantBriefDtoToEventForParticipantBrief test success", function() {
  const dto: EventForParticipantBriefDto = {
    id: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    name: "Event 1",
    startDate: "2025-01-08T00:00:00",
    endDate: "2025-01-18T23:59:59.999",
    descriptionEn: "Description of event 1",
    descriptionPl: "Opis eventu 1",
    outsidersAllowed: true,
    minutesBetweenDifferentSessions: 10,
    image: {
      imageName: "Politechnikia Lodzka_003.jpg",
      data: "weeeeeeee",
    },
  };

  const result: EventForParticipantBrief =
    mapEventForParticipantBtiefDtoToEventForParticipantBrief(dto);

  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(result.startDate.isValid()).toBe(true);
  expect(result.endDate.isValid()).toBe(true);
});

test("mapEventForParticipantBriefDtoToEventForParticipantBrief test fail wrong date formats", function() {
  const dto: EventForParticipantBriefDto = {
    id: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    name: "Event 1",
    startDate: "sigma",
    endDate: "boy",
    descriptionEn: "Description of event 1",
    descriptionPl: "Opis eventu 1",
    outsidersAllowed: true,
    minutesBetweenDifferentSessions: 10,
    image: {
      imageName: "Politechnikia Lodzka_003.jpg",
      data: "weeeeeeee",
    },
  };

  const result: EventForParticipantBrief =
    mapEventForParticipantBtiefDtoToEventForParticipantBrief(dto);

  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(result.startDate.isValid()).toBe(false);
  expect(result.endDate.isValid()).toBe(false);
});

test("mapEventForParticipantDtoToEvnetForParticipant test success", function() {
  const dto: EventForParticipantDto = {
    id: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    name: "Event 1",
    descriptionEn: "Description of event 1",
    descriptionPl: "Opis eventu 1",
    startDate: "2025-01-08T00:00:00",
    endDate: "2025-01-18T23:59:59.999",
    outsidersAllowed: true,
    image: {
      imageName: "Politechnikia Lodzka_003.jpg",
      data: "weeeeeeeeeeeeeeeee",
    },
  };

  const result: EventForParticipant =
    mapEventForParticipantDtoToEventForParticipant(dto);

  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(result.startDate.isValid()).toBe(true);
  expect(result.endDate.isValid()).toBe(true);
});

test("mapEventForParticipantDtoToEvnetForParticipant test fail wrong date formats", function() {
  const dto: EventForParticipantDto = {
    id: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    name: "Event 1",
    descriptionEn: "Description of event 1",
    descriptionPl: "Opis eventu 1",
    startDate: "sigma",
    endDate: "boy",
    outsidersAllowed: true,
    image: {
      imageName: "Politechnikia Lodzka_003.jpg",
      data: "weeeeeeeeeeeeeeeee",
    },
  };

  const result: EventForParticipant =
    mapEventForParticipantDtoToEventForParticipant(dto);

  expect(dayjs.isDayjs(result.startDate)).toBe(true);
  expect(dayjs.isDayjs(result.endDate)).toBe(true);
  expect(result.startDate.isValid()).toBe(false);
  expect(result.endDate.isValid()).toBe(false);
});
