import { expect, test } from "vitest";
import { EventBlockDto, EventBlock } from "../../src/data/useEvent";
import { mapEventBlockDtoToEventBlock } from "../../src/util/converters";
import dayjs from "dayjs";

test("mapEventBlockDtoToEventBlock test success", function() {
  const dto: EventBlockDto = {
    id: "1d7cec74-f176-4bb5-82ed-1065521e8207",
    name: "Blok 1 eventu",
    createdAt: "2025-01-08T22:40:27.747847",
    updatedAt: "2025-01-08T22:40:27.754482",
    eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    active: true,
  };

  const result: EventBlock = mapEventBlockDtoToEventBlock(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
});

test("mapEventBlockDtoToEventBlock test success wrong date format", function() {
  const dto: EventBlockDto = {
    id: "1d7cec74-f176-4bb5-82ed-1065521e8207",
    name: "Blok 1 eventu",
    createdAt: "sigma",
    updatedAt: "boy",
    eventId: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    active: true,
  };

  const result: EventBlock = mapEventBlockDtoToEventBlock(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.updatedAt.isValid()).toBe(false);
});
