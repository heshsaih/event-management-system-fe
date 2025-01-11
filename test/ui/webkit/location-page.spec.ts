import {
  Browser,
  BrowserContext,
  expect,
  Page,
  webkit,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { LocationDto } from "../../../src/data/useLocation";
import { RoomDto } from "../../../src/data/useRoom";

const location: LocationDto = {
  id: "9274bddb-d655-4024-bdff-77d13bef968a",
  name: "LODEX B9",
  createdAt: "2025-01-08T22:40:27.68865",
  updatedAt: null,
  active: true,
  buildingNumber: "1",
  street: "Aleje Politechniki",
  city: "Lodz",
  postalCode: "90-924",
  rooms: [
    {
      id: "10857a0b-3423-42c5-a119-c58f6fa45ca2",
      roomNumber: "Sala 1",
      locationId: "9274bddb-d655-4024-bdff-77d13bef968a",
      capacity: 120,
      createdAt: "2025-01-08T22:40:27.690809",
      updatedAt: null,
      active: true,
    },
    {
      id: "debe25cc-0901-4840-a2db-5ec11500dc0a",
      roomNumber: "Sala 2",
      locationId: "9274bddb-d655-4024-bdff-77d13bef968a",
      capacity: 110,
      createdAt: "2025-01-08T22:40:27.691362",
      updatedAt: null,
      active: true,
    },
  ],
};

const room: RoomDto = {
  id: "10857a0b-3423-42c5-a119-c58f6fa45ca2",
  roomNumber: "Sala 1",
  locationId: "9274bddb-d655-4024-bdff-77d13bef968a",
  capacity: 120,
  createdAt: "2025-01-08T22:40:27.690809",
  updatedAt: null,
  active: true,
};

describe("location page ui tests", function() {
  let page: Page;
  let browser: Browser;
  let context: BrowserContext;

  beforeAll(async function() {
    browser = await webkit.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterAll(async function() {
    await browser.close();
  });

  test("check if all of the elements are rendered properly", async () => {
    await page.route(
      `**/api/manager/locations/${location.id}`,
      function(route) {
        route.fulfill({
          json: location,
        });
      },
    );
    await page.goto(
      "http://localhost:5173/manager/locations/9274bddb-d655-4024-bdff-77d13bef968a",
    );
    await expect(page.locator("ol")).toContainText(
      "Strona główna/Lokacje/Lokacja",
    );
    await expect(
      page.getByRole("heading", { name: "Panel zarządzania lokacją" }),
    ).toBeVisible();
    await expect(page.locator("h3")).toContainText("Panel zarządzania lokacją");
    await expect(
      page.getByRole("heading", { name: "Dane o lokacji" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Nazwa" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Adres" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Data utworzenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Data aktualizacji" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Czy aktywna?" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "LODEX B9" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Aleje Politechniki 1, 90-924" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:40:27" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Brak daty aktualizacji" }).first(),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" }).first()).toBeVisible();
    await expect(page.getByLabel("Przycisk do edycji danych")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Pomieszczenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Identyfikator" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Nazwa pomieszczenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Ilość miejsc" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data utworzenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data aktualizacji" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Czy aktywne?" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Opcje" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "10857a0b-3423-42c5-a119-" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Sala 1" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "120" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:40:27" }).nth(1),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Brak daty aktualizacji" }).nth(1),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" }).nth(1)).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "10857a0b-3423-42c5-a119-" })
        .locator("div"),
    ).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "10857a0b-3423-42c5-a119-" })
        .getByLabel("Przycisk do modyfikacji"),
    ).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "10857a0b-3423-42c5-a119-" })
        .getByLabel("Przycisk do skopiowania"),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "debe25cc-0901-4840-a2db-" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Sala 2" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "110" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:40:27" }).nth(2),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Brak daty aktualizacji" }).nth(2),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" }).nth(2)).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "debe25cc-0901-4840-a2db-" })
        .locator("div"),
    ).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "debe25cc-0901-4840-a2db-" })
        .getByLabel("Przycisk do modyfikacji"),
    ).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "debe25cc-0901-4840-a2db-" })
        .getByLabel("Przycisk do skopiowania"),
    ).toBeVisible();
    await expect(page.getByLabel("Przycisk do utworzenia")).toBeVisible();
  });

  test("check if update location form works", async function() {
    await page.route(
      `**/api/manager/locations/${location.id}`,
      function(route) {
        route.fulfill({
          json: location,
        });
      },
    );
    await page.goto(
      "http://localhost:5173/manager/locations/9274bddb-d655-4024-bdff-77d13bef968a",
    );
    await expect(page.getByLabel("Przycisk do edycji danych")).toBeVisible();
    await page.getByLabel("Przycisk do edycji danych").click();
    await expect(page.getByLabel("Nazwa*")).toBeVisible();
    await expect(page.getByLabel("Ulica*")).toBeVisible();
    await expect(page.getByLabel("Numer budynku*")).toBeVisible();
    await expect(page.getByLabel("Kod pocztowy*")).toBeVisible();
    await expect(page.getByLabel("Miasto*")).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toHaveValue("LODEX B9");
    await expect(page.getByLabel("Ulica*")).toHaveValue("Aleje Politechniki");
    await expect(page.getByLabel("Numer budynku*")).toHaveValue("1");
    await expect(page.getByLabel("Kod pocztowy*")).toHaveValue("90-924");
    await expect(page.getByLabel("Miasto*")).toHaveValue("Lodz");
    await expect(
      page.getByLabel("Przycisk do zapisania zmian w"),
    ).toBeVisible();
    await expect(page.getByLabel("Przycisk do odrzucenia zmian")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeChecked();
    await expect(
      page.getByLabel("Przycisk do zapisania zmian w"),
    ).toContainText("Zapisz");
    await expect(page.getByLabel("Przycisk do odrzucenia zmian")).toContainText(
      "Zamknij",
    );
  });

  test("check if add room form works", async function() {
    await page.route(
      `**/api/manager/locations/${location.id}`,
      function(route) {
        route.fulfill({
          json: location,
        });
      },
    );
    await page.goto(
      "http://localhost:5173/manager/locations/9274bddb-d655-4024-bdff-77d13bef968a",
    );
    await expect(page.getByLabel("Przycisk do utworzenia")).toBeVisible();
    await page.getByLabel("Przycisk do utworzenia").click();
    await expect(
      page
        .locator("div")
        .filter({ hasText: "Utwórz pomieszczenieNazwa" })
        .nth(1),
    ).toBeVisible();
    await expect(page.getByRole("heading")).toContainText(
      "Utwórz pomieszczenie",
    );
    await expect(page.getByLabel("Nazwa pomieszczenia*")).toBeVisible();
    await expect(page.getByLabel("Ilość miejsc*")).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby utworzyć")).toBeVisible();
  });

  test("chekc if update room form works", async function() {
    await page.route(
      `**/api/manager/locations/${location.id}`,
      function(route) {
        route.fulfill({
          json: location,
        });
      },
    );
    await page.route(
      `**/api/manager/rooms/${room.id}`,
      function(route) {
        route.fulfill({
          json: room,
        });
      },
    );
    await page.goto(
      "http://localhost:5173/manager/locations/9274bddb-d655-4024-bdff-77d13bef968a",
    );
    await expect(
      page
        .getByRole("row", { name: "10857a0b-3423-42c5-a119-" })
        .getByLabel("Przycisk do modyfikacji"),
    ).toBeVisible();
    await page
      .getByRole("row", { name: "10857a0b-3423-42c5-a119-" })
      .getByLabel("Przycisk do modyfikacji")
      .click();
    await expect(page.getByText("Zaktualizuj pomieszczenieDane")).toBeVisible();
    await expect(page.locator("body")).toContainText(
      "Zaktualizuj pomieszczenie",
    );
    await expect(page.locator("body")).toContainText("Dane pomieszczenia");
    await expect(page.getByLabel("Nazwa pomieszczenia*")).toBeVisible();
    await expect(page.getByLabel("Ilość miejsc*")).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby zapisać zmiany")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByLabel("Nazwa pomieszczenia*")).toHaveValue("Sala 1");
    await expect(page.getByLabel("Ilość miejsc*")).toHaveValue("120");
    await expect(page.getByRole("checkbox")).toBeChecked();
  });
});
