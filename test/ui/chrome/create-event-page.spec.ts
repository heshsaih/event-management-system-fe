import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";

const stateAfterStep0 = {
  state: {
    name: "test name",
    descriptionPL: "test description pl",
    descriptionEN: "test description en",
    sessionBlocks: [{ name: "Domyślny blok", color: "#8b0002" }],
    startDate: "2025-01-08T23:00:00.000Z",
    endDate: "2025-01-09T22:59:59.999Z",
    registrationStartDate: "2025-01-08T22:59:59.999Z",
    sessions: [],
    outsidersAllowed: true,
    minutesBetweenSessions: 15,
    surveyManagerEmailTemplateId: { label: "", value: "" },
    sessionSignUpManagerEmailTemplateId: { label: "", value: "" },
    sessionReminderManagerEmailTemplateId: { label: "", value: "" },
  },
  version: 0,
};

const stateAfterStep1 = {
  state: {
    name: "asdsada",
    descriptionPL: "dsasd",
    descriptionEN: "",
    sessionBlocks: [{ name: "Domyślny blok", color: "#8b0002" }],
    startDate: "2025-01-08T23:00:00.000Z",
    endDate: "2025-01-09T22:59:59.999Z",
    registrationStartDate: "2025-01-08T22:59:59.999Z",
    sessions: [
      {
        minutesBeforeSignUpCloses: 15,
        name: "Nowa konferencja",
        descriptionPL: "asdasd",
        descriptionEN: "asdasda",
        startTime: "2025-01-08T23:00:00.000Z",
        endTime: "2025-01-08T23:00:00.000Z",
        sessionBlock: "Domyślny blok",
        maxSeats: 13,
        location: {
          label: "LODEX B9",
          value: "9274bddb-d655-4024-bdff-77d13bef968a",
        },
        room: {
          label: "Sala 1",
          value: "10857a0b-3423-42c5-a119-c58f6fa45ca2",
        },
        speaker: {
          label: "dr inż. Jan Kowalski",
          value: "d3b82f22-68bf-4171-af89-478111ca5c4e",
        },
        sessionType: {
          label: "Wyklad",
          value: "d19c878f-c7a1-4c1d-9aa2-81d11e5bc3c6",
        },
        id: "9222a727-141e-477b-a928-827cbbe7107f",
      },
    ],
    outsidersAllowed: true,
    minutesBetweenSessions: 1,
    surveyManagerEmailTemplateId: { label: "", value: "" },
    sessionSignUpManagerEmailTemplateId: { label: "", value: "" },
    sessionReminderManagerEmailTemplateId: { label: "", value: "" },
  },
  version: 0,
};

const stateAfterStep3 = {
  state: {
    name: "test name",
    descriptionPL: "test description pl",
    descriptionEN: "test description en",
    sessionBlocks: [{ name: "Domyślny blok", color: "#8b0002" }],
    startDate: "2025-01-08T23:00:00.000Z",
    endDate: "2025-01-09T22:59:59.999Z",
    registrationStartDate: "2025-01-08T22:59:59.999Z",
    sessions: [
      {
        minutesBeforeSignUpCloses: 15,
        name: "test session ",
        descriptionPL: "test session desc pl",
        descriptionEN: "test session desc en",
        startTime: "2025-01-08T23:00:00.000Z",
        endTime: "2025-01-08T23:00:00.000Z",
        sessionBlock: "Domyślny blok",
        maxSeats: 10,
        location: {
          label: "LODEX B9",
          value: "9274bddb-d655-4024-bdff-77d13bef968a",
        },
        room: {
          label: "Sala 1",
          value: "10857a0b-3423-42c5-a119-c58f6fa45ca2",
        },
        speaker: {
          label: "dr inż. Jan Kowalski",
          value: "d3b82f22-68bf-4171-af89-478111ca5c4e",
        },
        sessionType: {
          label: "Wyklad",
          value: "d19c878f-c7a1-4c1d-9aa2-81d11e5bc3c6",
        },
        id: "abb147da-1e7e-429a-a57c-eff073a09edd",
      },
    ],
    outsidersAllowed: true,
    minutesBetweenSessions: 15,
    surveyManagerEmailTemplateId: { label: "", value: "" },
    sessionSignUpManagerEmailTemplateId: { label: "", value: "" },
    sessionReminderManagerEmailTemplateId: { label: "", value: "" },
  },
  version: 0,
};

describe("create event page ui tests", function() {
  let page: Page;
  let browser: Browser;
  let context: BrowserContext;

  beforeAll(async function() {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterAll(async function() {
    await browser.close();
  });

  test("check if step 1 is rendered properly", async () => {
    await page.goto("http://localhost:5173/manager/events/create?step=0");
    await expect(page.getByText("Strona główna/Wydarzenia/Stwó")).toBeVisible();
    await expect(
      page.getByText(
        "1Dane o wydarzeniu2Konferencje3Powiadomienia mailowe4Podsumowanie",
      ),
    ).toBeVisible();
    await expect(page.locator("#root")).toContainText(
      "1Dane o wydarzeniu2Konferencje3Powiadomienia mailowe4Podsumowanie",
    );
    await expect(page.locator("h3")).toContainText("Dane o wydarzeniu");
    await expect(page.getByLabel("Nazwa*")).toBeVisible();
    await expect(page.getByLabel("Opis w wersji polskiej*")).toBeVisible();
    await expect(
      page
        .getByLabel("Pole tekstowe z opisem wydarzenia w wersji polskiej")
        .locator("div"),
    ).toBeVisible();
    await expect(
      page
        .getByLabel("Pole tekstowe z opisem wydarzenia w wersji angielskiej")
        .locator("div"),
    ).toBeVisible();
    await expect(page.getByLabel("Przerwa czasowa pomiędzy")).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Data rozpoczęcia\*Data rozpoczęcia\*$/ })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Data zakończenia\*Data zakończenia\*$/ })
        .first(),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Data rozpoczęcia zapisów\*$/ }),
    ).toBeVisible();
    await expect(
      page.getByText("Wstęp dla uczestników spoza Politechniki?*NieTak"),
    ).toBeVisible();
    await expect(page.getByLabel("Przycisk do wczytania danych")).toBeVisible();
    await expect(page.getByLabel("Wczytaj dane z pliku")).toBeVisible();
    await expect(
      page.getByLabel("Przycisk do przejścia do nast"),
    ).toBeVisible();
  });

  test("check if validation fails", async function() {
    await page.goto("http://localhost:5173/manager/events/create?step=0");
    await page.getByLabel("Przycisk do przejścia do nast").click();
    await expect(page.locator("form")).toContainText(
      "Nazwa wydarzenia musi być dłuższa niż 2 znaki",
    );
    await expect(page.locator("form")).toContainText(
      "Opis wydarzenia w wersji polskiej musi być dłuższy niż 2 znaki",
    );
    expect(
      await page.getByLabel("Przycisk do przejścia do nast").isDisabled(),
    ).toBe(true);
  });

  test("fill the step 0 and continue", async function() {
    await page.goto("http://localhost:5173/manager/events/create?step=0");
    await page.getByLabel("Nazwa*").click();
    await page.getByLabel("Nazwa*").fill("test name");
    await page.getByLabel("Opis w wersji polskiej*").click();
    await page
      .getByLabel("Opis w wersji polskiej*")
      .fill("test description pl");
    await page.getByLabel("Opis w wersji angielskiej").click();
    await page
      .getByLabel("Opis w wersji angielskiej")
      .fill("test description en");
    await page.getByLabel("Przerwa czasowa pomiędzy").click();
    await page.getByLabel("Przerwa czasowa pomiędzy").fill("15");
    await page.getByLabel("Przycisk do przejścia do nast").click();
    expect(page.url().endsWith("/manager/events/create?step=1")).toBe(true);
  });

  test("check if step 2 is rendered properly", async function() {
    await page.addInitScript(function() {
      window.localStorage.setItem(
        "createEventStore",
        JSON.stringify(stateAfterStep0),
      );
    });
    await page.goto("http://localhost:5173/manager/events/create?step=1");
    await expect(page.locator("ol")).toContainText(
      "Strona główna/Wydarzenia/Stwórz wydarzenie",
    );
    await expect(
      page.getByText(
        "Dane o wydarzeniu2Konferencje3Powiadomienia mailowe4Podsumowanie",
      ),
    ).toBeVisible();
    await expect(page.locator("#root")).toContainText(
      "Dane o wydarzeniu2Konferencje3Powiadomienia mailowe4Podsumowanie",
    );
    await expect(page.locator("#root")).toContainText("Dodaj konferencje");
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Wydarzenie nie posiada żadnych konferencji$/ }),
    ).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby wyświetlić")).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby wrócić do")).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby przejść do")).toBeVisible();
    await expect(page.getByLabel("Przycisk do usunięcia")).toBeVisible();
    await expect(page.getByLabel("Przycisk do utworzenia nowej")).toBeVisible();
    await expect(page.getByLabel("Przycisk do wczytania danych")).toBeVisible();
  });

  test("check if buttons in step 2 are functional", async function() {
    await page.addInitScript(function() {
      window.localStorage.setItem(
        "createEventStore",
        JSON.stringify(stateAfterStep0),
      );
    });
    await page.goto("http://localhost:5173/manager/events/create?step=1");
    await page.getByLabel("Przycisk do utworzenia nowej").click();
    await expect(
      page.getByRole("button", { name: "Nowa konferencja" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Nowa konferencja" }).click();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Nazwa\*Nazwa\*$/ })
        .first(),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Opis w wersji polskiej*Opis w wersji polskiej*Opis w wersji polskiej musi być d",
      ),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({
          hasText: /^Opis w wersji angielskiejOpis w wersji angielskiej$/,
        })
        .first(),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Typ konferencji*Typ konferencji*Typ konferencji jest wymagany",
      ),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Blok wydarzenia$/ }),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Lokacja\*$/ }),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Pomieszczenie\*$/ }),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Prelegent\*$/ }),
    ).toBeVisible();
    await expect(page.getByLabel("Ilość miejsc*")).toBeVisible();
    await expect(
      page
        .getByRole("region")
        .locator("div")
        .filter({ hasText: "Czas zakończenia zapisów" })
        .nth(1),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Data rozpoczęcia\*Data rozpoczęcia\*$/ })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Data zakończeniaData zakończenia$/ })
        .first(),
    ).toBeVisible();
    await expect(
      page.getByLabel("Przycisk do usunięcia konferencji"),
    ).toBeVisible();
    await page.getByLabel("Przycisk do usunięcia konferencji").click();
    await expect(page.getByText("Potwierdź akcjęTa akcja")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Potwierdź akcję" }),
    ).toBeVisible();
    await expect(page.getByRole("heading")).toContainText("Potwierdź akcję");
    await expect(page.getByRole("paragraph")).toContainText(
      "Ta akcja spowoduje zmiany w danych. Czy chcesz kontynuować?",
    );
    await expect(page.getByLabel("Kliknij, aby wykonać akcję")).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby odrzucić zmiany")).toBeVisible();
    await page.getByLabel("Kliknij, aby wykonać akcję").click();
    await page.getByLabel("Przycisk do utworzenia nowej").click();
    await page
      .getByLabel("Przycisk do usunięcia wszystkich konferencji z wydarzenia")
      .click();
    await page.getByLabel("Kliknij, aby wykonać akcję").click();
    await page.getByLabel("Przycisk do wczytania danych").click();
    await expect(page.getByText("Wczytaj dane konferencjiPrzyk")).toBeVisible();
  });

  test("fill the step 2 and continue", async function() {
    await page.addInitScript(function() {
      window.localStorage.setItem(
        "createEventStore",
        JSON.stringify(stateAfterStep0),
      );
    });
    await page.route("**/api/manager/session-types**", function(route) {
      route.fulfill({
        json: {
          content: [
            {
              id: "d19c878f-c7a1-4c1d-9aa2-81d11e5bc3c6",
              name: "Wyklad",
              createdAt: "2025-01-08T22:40:27.696321",
              updatedAt: null,
              active: true,
            },
          ],
          pageable: {
            pageNumber: 0,
            pageSize: 5,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false,
            },
            offset: 0,
            paged: true,
            unpaged: false,
          },
          last: true,
          totalElements: 1,
          totalPages: 1,
          first: true,
          size: 5,
          number: 0,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false,
          },
          numberOfElements: 1,
          empty: false,
        },
      });
    });
    await page.route("**/api/manager/locations**", function(route) {
      route.fulfill({
        json: {
          content: [
            {
              id: "9274bddb-d655-4024-bdff-77d13bef968a",
              name: "LODEX B9",
              createdAt: "2025-01-08T22:40:27.68865",
              updatedAt: null,
              active: true,
              buildingNumber: "1",
              street: "Aleje Politechniki",
              city: "Lodz",
              postalCode: "90-924",
            },
          ],
          pageable: {
            pageNumber: 0,
            pageSize: 5,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false,
            },
            offset: 0,
            paged: true,
            unpaged: false,
          },
          last: true,
          totalElements: 1,
          totalPages: 1,
          first: true,
          size: 5,
          number: 0,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false,
          },
          numberOfElements: 1,
          empty: false,
        },
      });
    });
    await page.route("**/api/manager/speakers**", function(route) {
      route.fulfill({
        json: {
          content: [
            {
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
          ],
          pageable: {
            pageNumber: 0,
            pageSize: 5,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false,
            },
            offset: 0,
            paged: true,
            unpaged: false,
          },
          last: true,
          totalElements: 1,
          totalPages: 1,
          first: true,
          size: 5,
          number: 0,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false,
          },
          numberOfElements: 1,
          empty: false,
        },
      });
    });
    await page.route("**/api/manager/locations/**", function(route) {
      route.fulfill({
        json: {
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
        },
      });
    });
    await page.goto("http://localhost:5173/manager/events/create?step=1");
    await page.getByLabel("Przycisk do utworzenia nowej").click();
    await page.getByRole("button", { name: "Nowa konferencja" }).click();
    await page.getByLabel("Opis w wersji polskiej*").click();
    await page.getByLabel("Nazwa*").click();
    await page.getByLabel("Nazwa*").press("ControlOrMeta+a");
    await page.getByLabel("Nazwa*").fill("test session ");
    await page.getByLabel("Nazwa*").press("Tab");
    await page
      .getByLabel("Opis w wersji polskiej*")
      .fill("test session desc pl");
    await page.getByLabel("Opis w wersji polskiej*").press("Tab");
    await page
      .getByLabel("Opis w wersji angielskiej")
      .fill("test session desc en");
    await page.getByLabel("Opis w wersji angielskiej").press("Tab");
    await page.getByLabel("Typ konferencji*").click();
    await page.getByRole("combobox", { name: "Typ konferencji*" }).click();
    await page.getByLabel("Typ konferencji*").click();
    await page.getByRole("option", { name: "Wyklad" }).click();
    await page.getByLabel("Lokacja*").click();
    await page.getByRole("option", { name: "LODEX B9" }).click();
    await page.getByLabel("Pomieszczenie*").click();
    await page.getByRole("option", { name: "Sala 1" }).click();
    await page.getByLabel("Prelegent*").click();
    await page.getByRole("option", { name: "dr inż. Jan Kowalski" }).click();
    await page.getByLabel("Ilość miejsc*").click();
    await page.getByLabel("Ilość miejsc*").fill("10");
    await page.getByLabel("Przycisk do zapisu danych").click();
    await page.getByLabel("Kliknij, aby wykonać akcję").click();
    await page.getByLabel("Kliknij, aby przejść do").click();
  });

  test("check if step 3 is rendered properly", async function() {
    await page.addInitScript(function() {
      window.localStorage.setItem(
        "createEventStore",
        JSON.stringify(stateAfterStep1),
      );
    });
    await page.goto("http://localhost:5173/manager/events/create?step=2");
    await expect(page.getByText("Strona główna/Wydarzenia/Stwó")).toBeVisible();
    await expect(page.locator("ol")).toContainText(
      "Strona główna/Wydarzenia/Stwórz wydarzenie",
    );
    await expect(page.locator("#root")).toContainText(
      "Dane o wydarzeniuKonferencje3Powiadomienia mailowe4Podsumowanie",
    );
    await expect(page.locator("h3")).toContainText(
      "Zmień powiadomienia mailowe dla wydarzenia",
    );
    await expect(
      page.getByText(
        "Powiadomienie o zapisaniu się na wydarzenieDomyślneWybranePowiadomienie o",
      ),
    ).toBeVisible();
    await expect(page.locator("form")).toContainText(
      "Powiadomienie o zapisaniu się na wydarzenie",
    );
    await expect(page.locator('input[name="\\:r3\\:"]').first()).toBeVisible();
    await expect(page.locator('input[name="\\:r3\\:"]').nth(1)).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({
          hasText:
            /^Powiadomienie o zapisaniu sięPowiadomienie o zapisaniu się$/,
        })
        .first(),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Prośba o wypełnienie ankiety po wydarzeniuBrakWybraneProśba o wypełnienie",
      ),
    ).toBeVisible();
    await expect(page.locator("form")).toContainText(
      "Prośba o wypełnienie ankiety po wydarzeniu",
    );
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Brak$/ })
        .getByRole("radio"),
    ).toBeVisible();
    await expect(page.locator('input[name="\\:r9\\:"]').nth(1)).toBeVisible();
    await expect(page.locator("form")).toContainText(
      "Prośba o wypełnienie ankiety po wydarzeniuProśba o wypełnienie ankiety po wydarzeniu",
    );
    await expect(
      page.locator("form > div:nth-child(2) > div:nth-child(3)"),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Przypomnienie o nadchodzącym wydarzeniuDomyślneWybraneProśba o wypełnienie",
      ),
    ).toBeVisible();
    await expect(page.locator("form")).toContainText(
      "Prośba o wypełnienie ankiety po wydarzeniuProśba o wypełnienie ankiety po wydarzeniu",
    );
    await expect(page.locator('input[name="\\:rf\\:"]').first()).toBeVisible();
    await expect(page.locator('input[name="\\:rf\\:"]').nth(1)).toBeVisible();
    await expect(
      page.locator("div:nth-child(3) > div:nth-child(3)"),
    ).toBeVisible();
    await expect(
      page.getByLabel(
        "Przycisk do przejścia do poprzedniego etapu tworzenia wydarzenia",
      ),
    ).toBeVisible();
    await expect(
      page.getByLabel(
        "Przycisk do przejścia do kolejnego etapu tworzenia wydarzenia",
      ),
    ).toBeVisible();
  });

  test("fill step 3 and continue", async function() {
    await page.addInitScript(function() {
      window.localStorage.setItem(
        "createEventStore",
        JSON.stringify(stateAfterStep1),
      );
    });
    await page.goto("http://localhost:5173/manager/events/create?step=2");
    await page
      .getByLabel(
        "Przycisk do przejścia do kolejnego etapu tworzenia wydarzenia",
      )
      .click();
    expect(page.url().endsWith("/manager/events/create?step=3")).toBe(true);
  });

  test("check if summary is rendered properly and has all of the fields", async function() {
    await page.addInitScript(function() {
      window.localStorage.setItem(
        "createEventStore",
        JSON.stringify(stateAfterStep3),
      );
    });
    await page.goto("http://localhost:5173/manager/events/create?step=3");
    expect(page.url().endsWith("?step=3")).toBe(true)
    await expect(page.locator("ol")).toContainText(
      "Strona główna/Wydarzenia/Stwórz wydarzenie",
    );
    await expect(page.locator("#root")).toContainText(
      "Dane o wydarzeniuKonferencjePowiadomienia mailowe4Podsumowanie",
    );
    await expect(page.locator("h3")).toContainText("Podsumowanie");
    await expect(page.locator("#root")).toContainText("Dane wydarzenia");
    await expect(page.locator("#root")).toContainText("Nazwa wydarzenia");
    await expect(page.locator("#root")).toContainText("test name");
    await expect(page.locator("#root")).toContainText(
      "Opis wydarzenia w wersji polskiej",
    );
    await expect(page.locator("#root")).toContainText("test description pl");
    await expect(page.locator("#root")).toContainText(
      "Opis wydarzenia w wersji angielskiej",
    );
    await expect(page.locator("#root")).toContainText("test description en");
    await expect(page.locator("#root")).toContainText(
      "Data rozpoczęcia wydarzenia",
    );
    await expect(page.locator("#root")).toContainText(
      "Data zakończenia wydarzenia",
    );
    await expect(page.locator("#root")).toContainText(
      "Data rozpoczęcia zapisów",
    );
    await expect(page.locator("#root")).toContainText(
      "Wstęp dla uczestników spoza Politechniki",
    );
    await expect(page.locator("#root")).toContainText("Tak");
    await expect(page.locator("#root")).toContainText(
      "Odstęp czasowy pomiędzy konferencjami (w minutach)",
    );
    await expect(page.locator("#root")).toContainText("15");
    await expect(page.locator("#root")).toContainText("Konferencje");
    await expect(
      page.getByRole("columnheader", { name: "Nazwa" }),
    ).toBeVisible();
    await expect(page.locator("thead")).toContainText("Nazwa");
    await expect(page.locator("#root")).toContainText("test session");
    await expect(page.locator("thead")).toContainText("Opis w wersji polskiej");
    await expect(page.locator("#root")).toContainText("test session desc pl");
    await expect(page.locator("thead")).toContainText(
      "Opis w wersji angielskiej",
    );
    await expect(page.locator("#root")).toContainText("test session desc en");
    await expect(page.locator("thead")).toContainText("Typ konferencji");
    await expect(page.locator("#root")).toContainText("Wyklad");
    await expect(page.locator("thead")).toContainText("Blok wydarzenia");
    await expect(page.locator("#root")).toContainText("Domyślny blok");
    await expect(page.locator("thead")).toContainText("Prelegent");
    await expect(page.locator("#root")).toContainText("dr inż. Jan Kowalski");
    await expect(page.locator("thead")).toContainText("Lokalizacja");
    await expect(page.locator("#root")).toContainText("LODEX B9, Sala 1");
    await expect(page.locator("thead")).toContainText("Ilość miejsc");
    await expect(page.locator("#root")).toContainText("10");
    await expect(page.locator("thead")).toContainText("Data rozpoczęcia");
    await expect(page.locator("thead")).toContainText("Data zakończenia");
    await expect(
      page.getByRole("heading", { name: "Powiadomienia mailowe" }),
    ).toBeVisible();
    await expect(page.locator("#root")).toContainText("Powiadomienia mailowe");
    await expect(page.locator("#root")).toContainText(
      "Powiadomienie o zapisaniu się na wydarzenie",
    );
    await expect(page.locator("#root")).toContainText("Domyślne powiadomienie");
    await expect(page.locator("#root")).toContainText(
      "Prośba o wypełnienie ankiety po wydarzeniu",
    );
    await expect(page.locator("#root")).toContainText(
      "Brak szablonu powiadomienia",
    );
    await expect(page.locator("#root")).toContainText(
      "Przypomnienie o nadchodzącym wydarzeniu",
    );
    await expect(page.locator("#root")).toContainText("Domyślne powiadomienie");
    await expect(page.getByLabel("Przycisk do powrotu do")).toBeVisible();
    await expect(page.getByLabel("Przycisk do utworzenia")).toBeVisible();
  });
});
