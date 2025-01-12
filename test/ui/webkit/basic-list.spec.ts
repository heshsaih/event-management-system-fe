import {
  Browser,
  BrowserContext,
  expect,
  Page,
  webkit,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { Pageable } from "../../../src/types";
import { LocationBriefDto } from "../../../src/data/useLocation";

const locationsNoFilters: Pageable<LocationBriefDto> = {
  content: [
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test1",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: true,
      buildingNumber: "1test",
      street: "1test",
      city: "1test",
      postalCode: "11-111",
    },
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test2",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: true,
      buildingNumber: "2test",
      street: "2test",
      city: "2test",
      postalCode: "22-222",
    },
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test3",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: false,
      buildingNumber: "3test",
      street: "3test",
      city: "3test",
      postalCode: "33-333",
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
  totalElements: 3,
  totalPages: 1,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 3,
  first: true,
  empty: false,
};

const locationsNoInactive: Pageable<LocationBriefDto> = {
  content: [
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test1",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: true,
      buildingNumber: "1test",
      street: "1test",
      city: "1test",
      postalCode: "11-111",
    },
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test2",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: true,
      buildingNumber: "2test",
      street: "2test",
      city: "2test",
      postalCode: "22-222",
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
  totalElements: 2,
  totalPages: 1,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 2,
  first: true,
  empty: false,
};

const locationsFilteredByPhrase: Pageable<LocationBriefDto> = {
  content: [
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test1",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: true,
      buildingNumber: "1test",
      street: "1test",
      city: "1test",
      postalCode: "11-111",
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

const locationsSorted: Pageable<LocationBriefDto> = {
  content: [
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test1",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: true,
      buildingNumber: "1test",
      street: "1test",
      city: "1test",
      postalCode: "11-111",
    },
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test2",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: true,
      buildingNumber: "2test",
      street: "2test",
      city: "2test",
      postalCode: "22-222",
    },
    {
      id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
      name: "test3",
      createdAt: "2024-12-22T20:50:11.142513",
      updatedAt: "2024-12-22T20:50:11.142513",
      active: false,
      buildingNumber: "3test",
      street: "3test",
      city: "3test",
      postalCode: "33-333",
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
  totalElements: 3,
  totalPages: 1,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 3,
  first: true,
  empty: false,
};

describe("ui test of the manager's list page (locations, speakers etc.), locations as an example", function() {
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

  test("check if all of the page elements including list entries are rendered", async function() {
    await page.route("**/api/manager/locations?**", function(route) {
      route.fulfill({ json: locationsNoFilters });
    });
    await page.goto("http://localhost:5173/manager/locations");
    await expect(page.getByText("Strona główna/Lokacje/Lokacja")).toBeVisible();
    await expect(
      page.getByText(
        "Strona główna/Lokacje/LokacjaPanel zarządzania lokacjami",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Panel zarządzania lokacjami" }),
    ).toBeVisible();
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
    await expect(page.getByRole("cell", { name: "test1" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "test2" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "test3" })).toBeVisible();
    await expect(page.getByText("Ilość wierszy na stronę")).toBeVisible();
  });

  test("check if the filter accordion is functional", async function() {
    await page.goto("http://localhost:5173/manager/locations");
    await expect(
      page
        .getByRole("region")
        .locator("div")
        .filter({ hasText: "FrazaFrazaSortowanie po" }),
    ).not.toBeVisible();
    await page.getByRole("button", { name: "Kliknij, aby rozwinąć" }).click();
    await expect(
      page
        .getByRole("region")
        .locator("div")
        .filter({ hasText: "FrazaFrazaSortowanie po" }),
    ).toBeVisible();
    await expect(page.getByLabel("Fraza")).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Sortowanie po polu$/ }),
    ).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Kierunek sortowania$/ }),
    ).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByLabel("Przycisk do zatwierdzenia")).toBeVisible();
    await expect(page.getByLabel("Przycisk do wyczyszczenia")).toBeVisible();
    await page.getByLabel("Fraza").click();
    await page.getByLabel("Fraza").fill("some text");
    await expect(page.getByLabel("Fraza")).toHaveValue("some text");
    await page.getByLabel("Sortowanie po polu").click();
    await page.getByRole("option", { name: "Nazwa" }).click();
    await expect(
      page.getByRole("combobox", { name: "Sortowanie po polu" }),
    ).toHaveValue("Nazwa");
    await page.getByRole("combobox", { name: "Sortowanie po polu" }).click();
    await page.getByRole("option", { name: "Data aktualizacji" }).click();
    await expect(
      page.getByRole("combobox", { name: "Sortowanie po polu" }),
    ).toHaveValue("Data aktualizacji");
    await page.getByRole("combobox", { name: "Sortowanie po polu" }).click();
    await page.getByRole("option", { name: "Data aktualizacji" }).click();
    await page.getByLabel("Kierunek sortowania").click();
    await page.getByRole("option", { name: "Malejąco" }).click();
    await expect(
      page.getByRole("combobox", { name: "Kierunek sortowania" }),
    ).toHaveValue("Malejąco");
    await page.getByRole("combobox", { name: "Kierunek sortowania" }).click();
    await page.getByRole("option", { name: "Malejąco" }).click();
    await expect(page.getByRole("checkbox")).toBeChecked();
    await page.getByRole("checkbox").click();
    await expect(page.getByRole("checkbox")).not.toBeChecked();
    await page.getByLabel("Przycisk do wyczyszczenia").click();
    await expect(
      page
        .getByRole("region")
        .locator("div")
        .filter({ hasText: "FrazaFrazaSortowanie po" }),
    ).not.toBeVisible();
    await page.getByRole("button", { name: "Kliknij, aby rozwinąć" }).click();
    await expect(page.getByLabel("Fraza")).toBeEmpty();
    await expect(page.getByRole("checkbox")).toBeChecked();
    await page.getByLabel("Fraza").click();
    await page.getByLabel("Fraza").fill("some text");
    await page.getByLabel("Przycisk do zatwierdzenia").click();
    await expect(
      page
        .getByRole("region")
        .locator("div")
        .filter({ hasText: "FrazaFrazaSortowanie po" }),
    ).not.toBeVisible();
  });

  test("check if filtering by show inactive works", async function() {
    await page.route("**/api/manager/locations?**", function(route) {
      route.fulfill({ json: locationsNoFilters });
    });
    await page.route(
      "**/api/manager/locations?**showInactive=false**",
      function(route) {
        route.fulfill({ json: locationsNoInactive });
      },
    );

    await page.goto("http://localhost:5173/manager/locations");
    await expect(page.getByRole("cell", { name: "test1" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "test2" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "test3" })).toBeVisible();

    await page.getByRole("button", { name: "Kliknij, aby rozwinąć" }).click();
    await page.getByRole("checkbox").uncheck();
    await page.getByLabel("Przycisk do zatwierdzenia").click();
    await expect(page.getByRole("cell", { name: "test1" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "test2" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "test3" })).not.toBeVisible();
  });

  test("check if filtering by phrase works", async function() {
    await page.route("**/api/manager/locations?**", function(route) {
      route.fulfill({ json: locationsNoFilters });
    });
    await page.route(
      "**/api/manager/locations?**phrase=test1**",
      function(route) {
        route.fulfill({ json: locationsFilteredByPhrase });
      },
    );
    await page.goto("http://localhost:5173/manager/locations");
    await page.getByRole("button", { name: "Kliknij, aby rozwinąć" }).click();
    await page.getByLabel("Fraza").click();
    await page.getByLabel("Fraza").fill("test1");
    await page.getByLabel("Przycisk do zatwierdzenia").click();
    await expect(page.getByRole("cell", { name: "test1" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "test2" })).not.toBeVisible();
    await expect(page.getByRole("cell", { name: "test3" })).not.toBeVisible();
  });

  test("check if sorting works", async function() {
    await page.route("**/api/manager/locations?**", function(route) {
      route.fulfill({ json: locationsNoFilters });
    });
    await page.route(
      "**/api/manager/locations?**orderBy=name**direction=asc**",
      function(route) {
        route.fulfill({ json: locationsSorted });
      },
    );
    await page.goto("http://localhost:5173/manager/locations");
    await page.getByRole("button", { name: "Kliknij, aby rozwinąć" }).click();
    await page.getByLabel("Sortowanie po polu").click();
    await page.getByRole("option", { name: "Nazwa" }).click();
    await page.getByLabel("Kierunek sortowania").click();
    await page.getByRole("option", { name: "Rosąco" }).click();
    await page.getByLabel("Przycisk do zatwierdzenia").click();

    const elements = page.locator("tr>td:first-child");
    const textFromElements = await elements.allTextContents();
    const expected = ["test1", "test2", "test3"];

    expect(textFromElements).toEqual(expected);
  });
});
