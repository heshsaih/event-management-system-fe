import {
  Browser,
  BrowserContext,
  expect,
  Page,
  webkit,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { LocationBriefDto } from "../../../src/data/useLocation";
import { Pageable } from "../../../src/types";

const locations: Pageable<LocationBriefDto> = {
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

describe("locations page ui tests", function() {
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

  test("check if all of the elements are rendered correctly", async function() {
    await page.route("**/api/manager/locations?**", function(route) {
      route.fulfill({
        json: locations,
      });
    });
    await page.goto("http://localhost:5173/manager/locations");
    await expect(page.locator("ol")).toContainText(
      "Strona główna/Lokacje/Lokacja",
    );
    await expect(
      page.getByRole("heading", { name: "Panel zarządzania lokacjami" }),
    ).toBeVisible();
    await expect(page.locator("#root")).toContainText(
      "Panel zarządzania lokacjami",
    );
    await expect(
      page.getByRole("button", { name: "Kliknij, aby rozwinąć" }),
    ).toBeVisible();
    await expect(
      page.getByLabel("Przycisk do utworzenia lokacji"),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Nazwa" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Adres" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Czy aktywna?" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data utworzenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data aktualizacji" }),
    ).toBeVisible();
    await expect(
      page.getByLabel("Wpis w liście lokacji o warto"),
    ).toContainText("LODEX B9");
    await expect(
      page.getByLabel("Wpis w liście lokacji o warto"),
    ).toContainText("Aleje Politechniki 1, 90-924 Lodz");
    await expect(
      page.getByLabel("Wpis w liście lokacji o warto"),
    ).toContainText("Tak");
    await expect(
      page.getByLabel("Wpis w liście lokacji o warto"),
    ).toContainText("8.01.2025, 22:40:27");
    await expect(
      page.getByLabel("Wpis w liście lokacji o warto"),
    ).toContainText("Brak daty aktualizacji");
    await expect(
      page.getByText("Ilość wierszy na stronę201-1 z"),
    ).toBeVisible();
  });

  test("check if add location form works correctly", async function() {
    await page.route("**/api/manager/locations?**", function(route) {
      route.fulfill({
        json: locations,
      });
    });
    await page.goto("http://localhost:5173/manager/locations");
    await page.getByLabel("Przycisk do utworzenia lokacji").click();
    await expect(page.getByText("Dodaj lokacjęDane o")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Dodaj lokację" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Dane o budynku" }),
    ).toBeVisible();
    await expect(page.getByLabel("Nazwa budynku*")).toBeVisible();
    await expect(page.getByLabel("Nazwa ulicy*")).toBeVisible();
    await expect(page.getByLabel("Numer budynky*")).toBeVisible();
    await expect(page.getByLabel("Kod pocztowy*")).toBeVisible();
    await expect(page.getByLabel("Miasto*")).toBeVisible();
    await expect(page.getByText("PomieszczeniaBudynek nie")).toBeVisible();
    await expect(
      page.getByLabel("Przycisk do utworzenia pomieszczenia"),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Przycisk do utworzenia lokacji" }),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Budynek nie posiada utworzonych pomieszczeń$/ }),
    ).toBeVisible();
    await page.getByLabel("Nazwa budynku*").click();
    await page.getByLabel("Nazwa budynku*").fill("test building");
    await page.getByLabel("Nazwa ulicy*").click();
    await page.getByLabel("Nazwa ulicy*").fill("test street");
    await page.getByLabel("Numer budynky*").click();
    await page.getByLabel("Numer budynky*").fill("123");
    await page.getByLabel("Kod pocztowy*").click();
    await page.getByLabel("Kod pocztowy*").fill("90-340");
    await page.getByLabel("Miasto*").click();
    await page.getByLabel("Miasto*").fill("city");
    await expect(page.getByLabel("Nazwa ulicy*")).toHaveValue("test street");
    await expect(page.getByLabel("Numer budynky*")).toHaveValue("123");
    await expect(page.getByLabel("Kod pocztowy*")).toHaveValue("90-340");
    await expect(page.getByLabel("Miasto*")).toHaveValue("city");
    await page.getByLabel("Przycisk do utworzenia pomieszczenia").click();
    await page.getByLabel("Nazwa pomieszczenia").click();
    await page.getByLabel("Nazwa pomieszczenia").fill("test room 1");
    await page.getByLabel("Ilość miejsc").click();
    await page.getByLabel("Ilość miejsc").fill("10");
    await page.getByLabel("Przycisk do utworzenia pomieszczenia").click();
    await page.getByLabel("Nazwa pomieszczenia").nth(1).fill("test room 2");
    await page.getByLabel("Nazwa pomieszczenia").nth(1).click();
    await page.getByLabel("Ilość miejsc").nth(1).fill("20");
    await expect(
      page
        .locator("div")
        .filter({
          hasText:
            /^Nazwa pomieszczeniaNazwa pomieszczeniaIlość miejscIlość miejsc$/,
        })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({
          hasText:
            /^Nazwa pomieszczeniaNazwa pomieszczeniaIlość miejscIlość miejsc$/,
        })
        .nth(2),
    ).toBeVisible();
    await page.getByLabel("Przycisk do usunięcia").first().click();
    await expect(page.getByText("Potwierdź akcjęTa akcja")).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby wykonać akcję")).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby odrzucić zmiany")).toBeVisible();
    await page.getByLabel("Kliknij, aby wykonać akcję").click();
  });
});
