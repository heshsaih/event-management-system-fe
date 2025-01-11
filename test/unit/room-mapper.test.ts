import { expect, test } from "vitest";
import { Room, RoomDto } from "../../src/data/useRoom";
import { mapRoomDtoToRoom } from "../../src/util/converters";
import dayjs from "dayjs";

test("mapRoomDtotoRoom test success", function() {
  const dto: RoomDto = {
    id: "10857a0b-3423-42c5-a119-c58f6fa45ca2",
    roomNumber: "Sala 1",
    locationId: "9274bddb-d655-4024-bdff-77d13bef968a",
    capacity: 120,
    createdAt: "2025-01-08T22:40:27.690809",
    updatedAt: "2025-01-08T22:40:27.690809",
    active: true,
  };

  const result: Room = mapRoomDtoToRoom(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
});


test("mapRoomDtotoRoom test fail wrong date formats", function() {
  const dto: RoomDto = {
    id: "10857a0b-3423-42c5-a119-c58f6fa45ca2",
    roomNumber: "Sala 1",
    locationId: "9274bddb-d655-4024-bdff-77d13bef968a",
    capacity: 120,
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
  };

  const result: Room = mapRoomDtoToRoom(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.updatedAt.isValid()).toBe(false);
});
