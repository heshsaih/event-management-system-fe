import { expect, test } from "vitest";
import {
  Speaker,
  SpeakerBrief,
  SpeakerBriefDto,
  SpeakerDto,
} from "../../src/data/useSpeaker";
import {
  mapSpeakerBriefDtoToSpeakerBrief,
  mapSpeakerDtoToSpeaker,
} from "../../src/util/converters";
import dayjs from "dayjs";

test("mapSpeakerBriefDtoToSpeakerBrief test success", function() {
  const dto: SpeakerBriefDto = {
    id: "d3b82f22-68bf-4171-af89-478111ca5c4e",
    createdAt: "2025-01-08T22:40:27.682487",
    updatedAt: "2025-01-08T22:40:27.682487",
    active: true,
    firstName: "Jan",
    lastName: "Kowalski",
    email: "email@gmail.com",
    backupEmail: "backup@gmail.com",
    titleName: "dr inż.",
    organizationName: "POLITECHNIKA ŁODZKA",
  };

  const result: SpeakerBrief = mapSpeakerBriefDtoToSpeakerBrief(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
});

test("mapSpeakerBriefDtoToSpeakerBrief test fail wrong date formats", function() {
  const dto: SpeakerBriefDto = {
    id: "d3b82f22-68bf-4171-af89-478111ca5c4e",
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
    firstName: "Jan",
    lastName: "Kowalski",
    email: "email@gmail.com",
    backupEmail: "backup@gmail.com",
    titleName: "dr inż.",
    organizationName: "POLITECHNIKA ŁODZKA",
  };

  const result: SpeakerBrief = mapSpeakerBriefDtoToSpeakerBrief(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.updatedAt.isValid()).toBe(false);
});

test("mapSpeakerDtoToSpeaker test success", function() {
  const dto: SpeakerDto = {
    id: "d3b82f22-68bf-4171-af89-478111ca5c4e",
    createdAt: "2025-01-08T22:40:27.682487",
    updatedAt: "2025-01-08T22:40:27.682487",
    active: true,
    firstName: "Jan",
    lastName: "Kowalski",
    email: "email@gmail.com",
    backupEmail: "backup@gmail.com",
    speakerTitle: {
      id: "077896ee-839f-4948-ae72-cc46cb94e35a",
      name: "dr inż.",
      createdAt: "2025-01-08T22:40:27.659486",
      updatedAt: null,
      active: true,
    },
    organization: {
      id: "16bc8353-fee1-4127-9b00-435e107d8d1c",
      name: "POLITECHNIKA ŁODZKA",
      createdAt: "2025-01-08T22:40:27.658406",
      updatedAt: null,
      active: true,
    },
  };

  const result: Speaker = mapSpeakerDtoToSpeaker(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
});

test("mapSpeakerDtoToSpeaker test fail wrong date formats", function() {
  const dto: SpeakerDto = {
    id: "d3b82f22-68bf-4171-af89-478111ca5c4e",
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
    firstName: "Jan",
    lastName: "Kowalski",
    email: "email@gmail.com",
    backupEmail: "backup@gmail.com",
    speakerTitle: {
      id: "077896ee-839f-4948-ae72-cc46cb94e35a",
      name: "dr inż.",
      createdAt: "2025-01-08T22:40:27.659486",
      updatedAt: null,
      active: true,
    },
    organization: {
      id: "16bc8353-fee1-4127-9b00-435e107d8d1c",
      name: "POLITECHNIKA ŁODZKA",
      createdAt: "2025-01-08T22:40:27.658406",
      updatedAt: null,
      active: true,
    },
  };

  const result: Speaker = mapSpeakerDtoToSpeaker(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.updatedAt.isValid()).toBe(false);
});
