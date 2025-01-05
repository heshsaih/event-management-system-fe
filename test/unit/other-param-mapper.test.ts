import {expect, test} from "vitest"
import { SpeakerTitle, SpeakerTitleDto } from "../../src/data/useSpeakerTitle";
import dayjs from "dayjs";
import { mapOtherParamDtoToOtherParam } from "../../src/util/converters";

test("date mapping for other param success path", function () {
  const dto: SpeakerTitleDto = {
    id: "",
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    name: "test name",
    active: true
  };
  const result: SpeakerTitle = mapOtherParamDtoToOtherParam(dto) as SpeakerTitle;

  expect(result).not.toBeNull();
  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
});

test("date mapping for other param success dto is null", function () {
  const dto = null; 
  const result = mapOtherParamDtoToOtherParam(dto);

  expect(result).toBe(null);
});

test("date mapping for other param success wrong date formats", function () {
  const dto: SpeakerTitleDto = {
    id: "",
    createdAt: "not a date",
    updatedAt: "not a date either",
    name: "test name",
    active: true
  };
  const result: SpeakerTitle = mapOtherParamDtoToOtherParam(dto) as SpeakerTitle;

  expect(result).not.toBeNull();
  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.updatedAt.isValid()).toBe(false);
});
