import {
  Browser,
  BrowserContext,
  expect,
  Page,
  webkit,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import {
  EventForParticipantDto,
  SessionForParticipantDto,
} from "../../../src/data/useEventParticipant";

const event: EventForParticipantDto = {
  id: "beea2fca-9158-4ba1-9c9c-3e2b723ce021",
  name: "Event 1",
  descriptionPl: "Opis eventu 1",
  descriptionEn: "Description of event 1",
  startDate: "2025-01-08T00:00:00",
  endDate: "2025-01-18T23:59:59.999",
  outsidersAllowed: true,
  image: {
    imageName: "test.png",
    data: "dasjkdhakjdha",
  },
};

const sessions: SessionForParticipantDto[] = [
  {
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
  },
  {
    id: "d17493d9-e09d-4c6a-9210-fb3300575af9",
    sessionName: "Wyklad 2",
    sessionType: "Wyklad",
    speaker: {
      firstName: "Jan",
      lastName: "Kowalski",
      titleName: "dr inż.",
      organizationName: "POLITECHNIKA ŁODZKA",
    },
    eventBlock: "Blok 2 eventu",
    startDate: "2025-01-09T03:40:27.699648",
    endDate: "2025-01-09T05:10:27.699648",
    descriptionEn: "Description of lecture 2",
    descriptionPl: "Opis wykladu 2",
    room: {
      locationName: "LODEX B9",
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
];

describe("generated ui playwright test within vitest", function() {
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
      "**/api/open/events/beea2fca-9158-4ba1-9c9c-3e2b723ce021",
      function(route) {
        route.fulfill({
          json: event,
        });
      },
    );
    await page.route(
      "**/api/open/events/beea2fca-9158-4ba1-9c9c-3e2b723ce021/sessions",
      function(route) {
        route.fulfill({
          json: sessions,
        });
      },
    );
    await page.goto(
      "http://localhost:5173/events/beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    );
    await expect(page.locator("#root")).toContainText("Podgląd wydarzenia");
    await expect(page.getByText("Strona główna/Wydarzenia/")).toBeVisible();
    await expect(page.getByText("Informacje o wydarzeniuNazwa")).toBeVisible();
    await expect(page.locator("#root")).toContainText(
      "Informacje o wydarzeniu",
    );
    await expect(page.getByRole("rowgroup")).toContainText("Nazwa wydarzenia");
    await expect(page.getByRole("rowgroup")).toContainText("Event 1");
    await expect(page.getByRole("rowgroup")).toContainText(
      "Opis w wersji polskiej",
    );
    await expect(page.getByRole("rowgroup")).toContainText("Opis eventu 1");
    await expect(page.getByRole("rowgroup")).toContainText(
      "Opis w wersji angielskiej",
    );
    await expect(page.getByRole("rowgroup")).toContainText(
      "Description of event 1",
    );
    await expect(page.getByRole("rowgroup")).toContainText("Data rozpoczęcia");
    await expect(page.getByRole("rowgroup")).toContainText("08.01.2025");
    await expect(page.getByRole("rowgroup")).toContainText("Data zakończenia");
    await expect(page.getByRole("rowgroup")).toContainText("18.01.2025");
    await expect(page.locator("#root")).toContainText("Konferencje");
    await expect(
      page.getByRole("button", { name: "Wyklad 1 - Wyklad Ilość" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Wyklad 2 - Wyklad Ilość" }),
    ).toBeVisible();
    await expect(page.locator("#root")).toContainText("Wyklad 1 - Wyklad");
    await expect(page.locator("#root")).toContainText("Wyklad 2 - Wyklad");
    await expect(
      page.getByRole("heading", { name: "Podgląd konferencji" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Kliknij, aby wyświetlić wszystkie konferencje w tym wydarzeniuKonferencje06 -",
      ),
    ).toBeVisible();
  });

  test("check if sessions are rendered properly", async function() {
    await page.route(
      "**/api/open/events/beea2fca-9158-4ba1-9c9c-3e2b723ce021",
      function(route) {
        route.fulfill({
          json: event,
        });
      },
    );
    await page.route(
      "**/api/open/events/beea2fca-9158-4ba1-9c9c-3e2b723ce021/sessions",
      function(route) {
        route.fulfill({
          json: sessions,
        });
      },
    );
    await page.goto(
      "http://localhost:5173/events/beea2fca-9158-4ba1-9c9c-3e2b723ce021",
    );
    await expect(
      page.getByRole("button", { name: "Wyklad 1 - Wyklad Ilość" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Wyklad 2 - Wyklad Ilość" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Wyklad 1 - Wyklad Ilość" }).click();
    await expect(
      page.locator(".MuiAccordionDetails-root").first(),
    ).toBeVisible();
    await expect(page.locator("#root")).toContainText("Opis w wersji polskiej");
    await expect(page.locator("#root")).toContainText("Opis wykladu 1");
    await expect(page.locator("#root")).toContainText(
      "Opis w wersji angielskiej",
    );
    await expect(page.locator("#root")).toContainText(
      "Description of lecture 1",
    );
    await expect(page.locator("#root")).toContainText("Data rozpoczęcia");
    await expect(page.locator("#root")).toContainText("08.01.2025, 22:50");
    await expect(page.locator("#root")).toContainText("Data zakończenia");
    await expect(page.locator("#root")).toContainText("08.01.2025, 23:40");
    await expect(page.locator("#root")).toContainText(
      "Miejsce odbywania konferencji",
    );
    await expect(page.locator("#root")).toContainText(
      "Pomieszczenie Sala 1, budynek LODEX B9",
    );
    await expect(page.locator("#root")).toContainText("Adres lokacji");
    await expect(page.locator("#root")).toContainText(
      "Aleje Politechniki 1, 90-924 Lodz",
    );
    await expect(page.locator("#root")).toContainText("Ilość miejsc");
    await expect(page.locator("#root")).toContainText("100");
    await expect(page.locator("#root")).toContainText("Pozostałe miejsca");
    await expect(page.locator("#root")).toContainText("100");
    await expect(page.locator("#root")).toContainText("Blok wydarzenia");
    await expect(page.locator("#root")).toContainText("Blok 1 eventu");
    await expect(page.locator("#root")).toContainText("Prelegent");
    await expect(page.locator("#root")).toContainText("dr inż. Jan Kowalski");
    await page.getByRole("button", { name: "Wyklad 2 - Wyklad Ilość" }).click();
    await expect(
      page.locator(
        "div:nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root",
      ),
    ).toBeVisible();
    await expect(page.locator("#root")).toContainText("Opis w wersji polskiej");
    await expect(page.locator("#root")).toContainText("Opis wykladu 2");
    await expect(page.locator("#root")).toContainText(
      "Opis w wersji angielskiej",
    );
    await expect(page.locator("#root")).toContainText(
      "Description of lecture 2",
    );
    await expect(page.locator("#root")).toContainText("Data rozpoczęcia");
    await expect(page.locator("#root")).toContainText("09.01.2025, 03:40");
    await expect(page.locator("#root")).toContainText("Data zakończenia");
    await expect(page.locator("#root")).toContainText("09.01.2025, 05:10");
    await expect(page.locator("#root")).toContainText(
      "Miejsce odbywania konferencji",
    );
    await expect(page.locator("#root")).toContainText(
      "Pomieszczenie Sala 2, budynek LODEX B9",
    );
    await expect(page.locator("#root")).toContainText("Adres lokacji");
    await expect(page.locator("#root")).toContainText(
      "Aleje Politechniki 1, 90-924 Lodz",
    );
    await expect(page.locator("#root")).toContainText("Ilość miejsc");
    await expect(page.locator("#root")).toContainText("100");
    await expect(page.locator("#root")).toContainText("Pozostałe miejsca");
    await expect(page.locator("#root")).toContainText("100");
    await expect(page.locator("#root")).toContainText("Blok wydarzenia");
    await expect(page.locator("#root")).toContainText("Blok 2 eventu");
    await expect(page.locator("#root")).toContainText("Prelegent");
    await expect(page.locator("#root")).toContainText("dr inż. Jan Kowalski");
  });
});
