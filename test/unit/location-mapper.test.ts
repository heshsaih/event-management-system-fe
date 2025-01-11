import { test, expect } from "vitest";
import {
  Location,
  LocationBrief,
  LocationBriefDto,
  LocationDto,
} from "../../src/data/useLocation";
import { mapLocationBriefDtoToLocationBrief, mapLocationDtoToLocation } from "../../src/util/converters";
import dayjs from "dayjs";

test("mapLocationDtoToLocation test success", function() {
  const dto: LocationDto = {
    id: "9274bddb-d655-4024-bdff-77d13bef968a",
    name: "LODEX B9",
    createdAt: "2025-01-08T22:40:27.68865",
    updatedAt: "2025-01-08T22:40:27.68865",
    active: true,
    buildingNumber: "1",
    street: "Aleje Politechniki",
    city: "Lodz",
    postalCode: "90-924",
    rooms: [],
  };

  const result: Location = mapLocationDtoToLocation(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
});

test("mapLocationDtoToLocation test fail wrong date format", function() {
  const dto: LocationDto = {
    id: "9274bddb-d655-4024-bdff-77d13bef968a",
    name: "LODEX B9",
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
    buildingNumber: "1",
    street: "Aleje Politechniki",
    city: "Lodz",
    postalCode: "90-924",
    rooms: [],
  };

  const result: Location = mapLocationDtoToLocation(dto);
  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.updatedAt.isValid()).toBe(false);
});

test("mapLocationBriefDtoToLocationBrief test success", function() {
  const dto: LocationBriefDto = {
    id: "9274bddb-d655-4024-bdff-77d13bef968a",
    name: "LODEX B9",
    createdAt: "2025-01-08T22:40:27.68865",
    updatedAt: "2025-01-08T22:40:27.68865",
    active: true,
    buildingNumber: "1",
    street: "Aleje Politechniki",
    city: "Lodz",
    postalCode: "90-924",
  };

  const result: LocationBrief = mapLocationBriefDtoToLocationBrief(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
});

test("mapLocationBriefDtoToLocationBrief test fail wrong date formats", function() {
  const dto: LocationBriefDto = {
    id: "9274bddb-d655-4024-bdff-77d13bef968a",
    name: "LODEX B9",
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
    buildingNumber: "1",
    street: "Aleje Politechniki",
    city: "Lodz",
    postalCode: "90-924",
  };

  const result: LocationBrief = mapLocationBriefDtoToLocationBrief(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.updatedAt.isValid()).toBe(false);
});
