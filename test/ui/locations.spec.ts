import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { LocationBriefDto } from "../../src/data/useLocation";
import { Pageable } from "../../src/types";

const locations: Pageable<LocationBriefDto> = {
  content: [
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test123",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: true,
      buildingNumber: "test123",
      street: "test123",
      city: "test123",
      postalCode: "13-131",
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
  totalElements: 1,
  totalPages: 1,
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

describe("ui tests for manager's locations page", function() {
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

  test("check if locations' list displays something", async function() {
    await page.route("**/api/manager/locations?**", function(route) {
      route.fulfill({
        json: locations,
      });
    });
    await page.goto("http://localhost:5173/manager/locations");
    await expect(
      page.getByRole("cell", { name: "test123", exact: true }),
    ).toBeVisible();
    await expect(page.locator("tbody")).toContainText("test123");
    await expect(page.locator("tbody")).toContainText(
      "test123 test123, 13-131 test123",
    );
    await expect(page.locator("tbody")).toContainText("Tak");
    await expect(page.locator("tbody")).toContainText("22.12.2024, 20:50:11");
    await expect(page.locator("tbody")).toContainText("22.12.2024, 20:50:11");
  });
});
