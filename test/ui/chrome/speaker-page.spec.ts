import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { SpeakerDto } from "../../../src/data/useSpeaker";

const speaker: SpeakerDto = {
  id: "d3b82f22-68bf-4171-af89-478111ca5c4e",
  createdAt: "2025-01-08T22:40:27.682487",
  updatedAt: null,
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

describe("speaker page ui tests", function() {
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

  test("check if all of the elements are rendered properly", async () => {
    await page.route(`**/api/manager/speakers/${speaker.id}`, function(route) {
      route.fulfill({
        json: speaker,
      });
    });
    await page.goto(
      "http://localhost:5173/manager/speakers/d3b82f22-68bf-4171-af89-478111ca5c4e",
    );
    await expect(page.locator("ol")).toContainText(
      "Strona główna/Prelegenci/Prelegent",
    );
    await expect(page.locator("h3")).toContainText(
      "Panel zarządzania prelegentem",
    );
    await expect(page.getByText("Strona główna/Prelegenci/")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Panel zarządzania prelegentem" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Dane o prelegencie" }),
    ).toBeVisible();
    await expect(page.getByRole("rowgroup")).toContainText("Identyfikator");
    await expect(page.getByRole("rowgroup")).toContainText(
      "d3b82f22-68bf-4171-af89-478111ca5c4e",
    );
    await expect(page.getByRole("rowgroup")).toContainText("Dane personalne");
    await expect(page.getByRole("rowgroup")).toContainText(
      "dr inż. Jan Kowalski",
    );
    await expect(page.getByRole("rowgroup")).toContainText("Adres e-mail");
    await expect(page.getByRole("rowgroup")).toContainText("email@gmail.com");
    await expect(page.getByRole("rowgroup")).toContainText(
      "Zapasowy adres e-mail",
    );
    await expect(page.getByRole("rowgroup")).toContainText("backup@gmail.com");
    await expect(page.getByRole("rowgroup")).toContainText("Organizacja");
    await expect(page.getByRole("rowgroup")).toContainText(
      "POLITECHNIKA ŁODZKA",
    );
    await expect(page.getByRole("rowgroup")).toContainText("Data utworzenia");
    await expect(page.getByRole("rowgroup")).toContainText(
      "8.01.2025, 22:40:27",
    );
    await expect(page.getByRole("rowgroup")).toContainText("Data aktualizacji");
    await expect(page.getByRole("rowgroup")).toContainText(
      "Brak daty aktualizacji",
    );
    await expect(page.getByRole("rowgroup")).toContainText("Czy aktywny?");
    await expect(page.getByRole("rowgroup")).toContainText("Tak");
    await expect(page.getByLabel("Przycisk do edycji danych")).toBeVisible();
    await expect(page.getByLabel("Przycisk do skopiowania")).toBeVisible();
  });

  test("check if editing speaker is displayed correctly", async function() {
    await page.route(`**/api/manager/speakers/${speaker.id}`, function(route) {
      route.fulfill({
        json: speaker,
      });
    });
    await page.goto(
      "http://localhost:5173/manager/speakers/d3b82f22-68bf-4171-af89-478111ca5c4e",
    );
    await page.getByLabel("Przycisk do edycji danych").click();
    await expect(page.getByLabel("Imię*")).toBeVisible();
    await expect(page.getByLabel("Nazwisko*")).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Tytuł naukowy$/ }),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Organizacja$/ }),
    ).toBeVisible();
    await expect(page.getByLabel("Adres e-mail*")).toBeVisible();
    await expect(page.getByLabel("Zapasowy adres e-mail")).toBeVisible();
    await expect(page.getByLabel("Przycisk do zapisu zmian w")).toContainText(
      "Zapisz",
    );
    await expect(page.getByLabel("Przycisk do odrzucenia zmian")).toContainText(
      "Anuluj",
    );
    await expect(
      page.getByRole("heading", { name: "Aktywność" }),
    ).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeChecked();
  });
});
