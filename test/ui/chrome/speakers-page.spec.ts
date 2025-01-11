import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { Pageable } from "../../../src/types";
import { SpeakerBriefDto } from "../../../src/data/useSpeaker";
import { SpeakerTitleDto } from "../../../src/data/useSpeakerTitle";
import { OrganizationDto } from "../../../src/data/useOrganization";

const speakerTitles: Pageable<SpeakerTitleDto> = {
  content: [
    {
      id: "077896ee-839f-4948-ae72-cc46cb94e35a",
      name: "dr inż.",
      createdAt: "2025-01-08T22:40:27.659486",
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
  totalPages: 1,
  totalElements: 1,
  size: 5,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 1,
  first: true,
  empty: false,
};

const organizations: Pageable<OrganizationDto> = {
  content: [
    {
      id: "16bc8353-fee1-4127-9b00-435e107d8d1c",
      name: "POLITECHNIKA ŁODZKA",
      createdAt: "2025-01-08T22:40:27.658406",
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
  totalPages: 1,
  totalElements: 1,
  size: 5,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 1,
  first: true,
  empty: false,
};

const speakers: Pageable<SpeakerBriefDto> = {
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
    pageSize: 20,
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
  totalPages: 1,
  totalElements: 1,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 1,
  first: true,
  empty: false,
};

describe("speakers page ui tests", function() {
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

  test("chekc if all of the elements are rendered properly", async () => {
    await page.route("**/api/manager/speakers**", function(route) {
      route.fulfill({
        json: speakers,
      });
    });
    await page.goto("http://localhost:5173/manager/speakers");
    await expect(page.locator("ol")).toContainText(
      "Strona główna/Prelegenci/Prelegent",
    );
    await expect(page.locator("#root")).toContainText(
      "Panel zarządzania prelegentami",
    );
    await expect(page.getByText("Strona główna/Prelegenci/")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Panel zarządzania prelegentami" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Kliknij, aby rozwinąć" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Dane personalne" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Czy aktywny?" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data utworzenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data aktualizacji" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "dr inż. Jan Kowalski" }),
    ).toBeVisible();
    await expect(page.getByLabel("Wpis w liście prelegentów o")).toContainText(
      "dr inż. Jan Kowalski",
    );
    await expect(page.getByLabel("Wpis w liście prelegentów o")).toContainText(
      "Tak",
    );
    await expect(page.getByLabel("Wpis w liście prelegentów o")).toContainText(
      "8.01.2025, 22:40:27",
    );
    await expect(page.getByLabel("Wpis w liście prelegentów o")).toContainText(
      "Brak daty aktualizacji",
    );
    await expect(
      page.getByText("Ilość wierszy na stronę201-1 z"),
    ).toBeVisible();
    await expect(
      page.getByLabel("Przycisk do utworzenia nowego"),
    ).toBeVisible();
    await page.getByRole("button", { name: "Kliknij, aby rozwinąć" }).click();
    await expect(
      page
        .getByRole("region")
        .locator("div")
        .filter({ hasText: "FrazaFrazaSortowanie po" }),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^FrazaFraza$/ })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Sortowanie po poluSortowanie po polu$/ })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Kierunek sortowaniaKierunek sortowania$/ })
        .first(),
    ).toBeVisible();
    await expect(page.getByText("Wyświetlić nieaktywne?NieTak")).toBeVisible();
    await expect(page.getByLabel("Przycisk do zatwierdzenia")).toBeVisible();
    await expect(page.getByLabel("Przycisk do wyczyszczenia")).toBeVisible();
  });

  test("check if the add speaker form is functional", async function() {
    await page.route("**/api/manager/speaker-titles**", function(route) {
      route.fulfill({
        json: speakerTitles,
      });
    });
    await page.route("**/api/manager/organizations**", function(route) {
      route.fulfill({
        json: organizations,
      });
    });
    await page.goto("http://localhost:5173/manager/speakers");
    await page.getByLabel("Przycisk do utworzenia nowego").click();
    await expect(page.getByText("Utwórz prelegentaImię*Imię*")).toBeVisible();
    await expect(page.getByRole("heading")).toContainText("Utwórz prelegenta");
    await expect(
      page.locator("div").filter({ hasText: "Imię*Imię*" }).nth(3),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: "Nazwisko*Nazwisko*" }).nth(3),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: "Tytuł naukowy*Tytuł naukowy*" })
        .nth(2),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: "Organizacja*Organizacja*" })
        .nth(2),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: "Adres e-mail*Adres e-mail*" })
        .nth(2),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: "Zapasowy adres e-mailZapasowy" })
        .nth(2),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Przycisk do utworzenia nowego" }),
    ).toBeVisible();
    await expect(page.getByLabel("Zamknij okno")).toBeVisible();
    await page.getByLabel("Imię*").click();
    await page.getByLabel("Imię*").fill("name");
    await page.getByLabel("Nazwisko*").click();
    await page.getByLabel("Nazwisko*").fill("last name");
    await page.getByLabel("Tytuł naukowy*").click();
    await page.getByRole("option", { name: "dr inż" }).click();
    await page.getByLabel("Organizacja*").click();
    await page.getByRole("option", { name: "POLITECHNIKA ŁODZKA" }).click();
    await page.getByLabel("Adres e-mail*").click();
    await page.getByLabel("Adres e-mail*").press("ControlOrMeta+a");
    await page.getByLabel("Adres e-mail*").fill("testemial@gmail.com");
    await page.getByLabel("Zapasowy adres e-mail").click();
    await page
      .getByLabel("Zapasowy adres e-mail")
      .fill("testmailbackup@gmail.com");
    await expect(page.getByLabel("Imię*")).toHaveValue("name");
    await expect(page.getByLabel("Nazwisko*")).toHaveValue("last name");
    await expect(
      page.getByRole("combobox", { name: "Tytuł naukowy*" }),
    ).toHaveValue("dr inż.");
    await expect(page.getByLabel("Adres e-mail*")).toHaveValue(
      "testemial@gmail.com",
    );
    await expect(page.getByLabel("Zapasowy adres e-mail")).toHaveValue(
      "testmailbackup@gmail.com",
    );
    await expect(
      page.getByRole("combobox", { name: "Organizacja*" }),
    ).toHaveValue("POLITECHNIKA ŁODZKA");
    await page
      .getByRole("button", { name: "Przycisk do utworzenia nowego" })
      .click();
    await expect(page.getByText("Potwierdź akcjęTa akcja")).toBeVisible();
  });

  test("check if clicking the list entry redirects to the speaker page", async function() {
    await page.route("**/api/manager/speakers**", function(route) {
      route.fulfill({
        json: speakers,
      });
    });
    await page.goto("http://localhost:5173/manager/speakers");
    await page.getByRole("cell", { name: "dr inż. Jan Kowalski" }).click();
    expect(
      page.url().endsWith(`/manager/speakers/${speakers.content[0].id}`),
    ).toBe(true);
  });
});
