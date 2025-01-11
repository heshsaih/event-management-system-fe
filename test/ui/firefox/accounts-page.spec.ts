import {
  Browser,
  BrowserContext,
  expect,
  firefox,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { Pageable } from "../../../src/types";
import { AccountDto } from "../../../src/data/useAccount";
import { Role } from "../../../src/data/useAccountStore";

const accounts: Pageable<AccountDto> = {
  content: [
    {
      id: "db5f268a-307e-4d5a-9eee-e1f3e98bfe25",
      createdAt: "2025-01-08T22:57:17.280874",
      updatedAt: "2025-01-08T22:58:07.550463",
      active: true,
      email: null,
      firstName: null,
      lastName: null,
      accountType: "GOOGLE",
      lastSuccessfulLogin: "2025-01-08T22:58:07.5416",
      externalId: "1",
      roles: [Role.PARTICIPANT],
    },
    {
      id: "f97ca3e0-9b71-4c02-ae5a-de0cdddbb3c2",
      createdAt: "2025-01-08T22:48:24.222052",
      updatedAt: "2025-01-08T22:48:24.246456",
      active: true,
      email: null,
      firstName: null,
      lastName: null,
      accountType: "GOOGLE",
      lastSuccessfulLogin: "2025-01-08T22:48:24.222052",
      externalId: "2",
      roles: [Role.PARTICIPANT],
    },
    {
      id: "f9f29bed-0dab-44f0-b7b0-c00a8cd264d7",
      createdAt: "2025-01-08T22:40:27.645332",
      updatedAt: null,
      active: true,
      email: "participantbonzo@gmail.com",
      firstName: "Uczestnik",
      lastName: "Bonzo",
      accountType: "GOOGLE",
      lastSuccessfulLogin: null,
      externalId: "3",
      roles: [Role.PARTICIPANT],
    },
    {
      id: "d791d767-e834-4612-a6da-d6298a1e8501",
      createdAt: "2025-01-08T22:40:27.632624",
      updatedAt: null,
      active: true,
      email: "manager@gmail.com",
      firstName: "Tiger",
      lastName: "Bonzo",
      accountType: "GOOGLE",
      lastSuccessfulLogin: null,
      externalId: "4",
      roles: [Role.MANAGER],
    },
    {
      id: "14074f6a-2d76-4c3a-819e-ba67f3c949fa",
      createdAt: "2025-01-08T22:40:27.599424",
      updatedAt: null,
      active: true,
      email: "tigerbonzobenc@gmail.com",
      firstName: "Tiger",
      lastName: "Bonzo",
      accountType: "GOOGLE",
      lastSuccessfulLogin: null,
      externalId: "5",
      roles: [Role.ADMIN],
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
  totalElements: 5,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 5,
  first: true,
  empty: false,
};

const account: AccountDto = {
  id: "db5f268a-307e-4d5a-9eee-e1f3e98bfe25",
  createdAt: "2025-01-08T22:57:17.280874",
  updatedAt: "2025-01-08T22:58:07.550463",
  active: true,
  email: null,
  firstName: null,
  lastName: null,
  accountType: "GOOGLE",
  lastSuccessfulLogin: "2025-01-08T22:58:07.5416",
  externalId: "1",
  roles: [Role.PARTICIPANT],
};

describe("accounts page ui tests", function() {
  let page: Page;
  let browser: Browser;
  let context: BrowserContext;

  beforeAll(async function() {
    browser = await firefox.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterAll(async function() {
    await browser.close();
  });

  test("check if all of the elements are rendered correctly", async () => {
    await page.route("**/api/administrator/accounts**", function(route) {
      route.fulfill({
        json: accounts,
      });
    });
    await page.goto("http://localhost:5173/admin/accounts");
    await expect(page.getByText("Strona główna/Użytkownicy/Uż")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Panel zarządzania uż" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Kliknij, aby rozwinąć" }),
    ).toBeVisible();
    await page.getByRole("columnheader", { name: "Dane personalne" }).click();
    await expect(
      page.getByRole("columnheader", { name: "Dane personalne" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Rodzaj konta" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Czas ostatniej udanej próby" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "22:57:17" })).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data utworzenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data aktualizacji" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Czy aktywny?" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Brak danych" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "GOOGLE" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:58:07" }).first(),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "22:57:17" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:58:07" }).nth(1),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" }).first()).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Brak danych" }).nth(1),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "GOOGLE" }).nth(1),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:48:24" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:48:24" }).nth(1),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:48:24" }).nth(2),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" }).nth(1)).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Uczestnik Bonzo" }),
    ).toBeVisible();
    await expect(
      page
        .getByLabel("Wpis w liście użytkowników o wartości Uczestnik Bonzo")
        .getByRole("cell", { name: "GOOGLE" }),
    ).toBeVisible();
    await expect(
      page
        .getByLabel("Wpis w liście użytkowników o wartości Uczestnik Bonzo")
        .getByRole("cell", { name: "Brak daty" })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .getByLabel("Wpis w liście użytkowników o wartości Uczestnik Bonzo")
        .getByRole("cell", { name: "22:40:27" }),
    ).toBeVisible();
    await expect(
      page
        .getByLabel("Wpis w liście użytkowników o wartości Uczestnik Bonzo")
        .getByRole("cell", { name: "Brak daty" })
        .nth(1),
    ).toBeVisible();
    await expect(
      page
        .getByLabel("Wpis w liście użytkowników o wartości Uczestnik Bonzo")
        .getByRole("cell", { name: "Tak" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Tiger Bonzo" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "GOOGLE" }).nth(3),
    ).toBeVisible();
    await expect(
      page.locator("tr:nth-child(4) > td:nth-child(3)"),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:40:27" }).nth(1),
    ).toBeVisible();
    await expect(
      page.locator("tr:nth-child(4) > td:nth-child(5)"),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" }).nth(3)).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Tiger Bonzo" }).nth(1),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "GOOGLE" }).nth(4),
    ).toBeVisible();
    await expect(
      page.locator("tr:nth-child(5) > td:nth-child(3)"),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:40:27" }).nth(2),
    ).toBeVisible();
    await expect(
      page.locator("tr:nth-child(5) > td:nth-child(5)"),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" }).nth(4)).toBeVisible();
    await expect(
      page.getByText("Ilość wierszy na stronę201-5 z"),
    ).toBeVisible();
  });

  test("check if clicking on the table entry navigates to the account page", async function() {
    await page.route("**/api/administrator/accounts**", function(route) {
      route.fulfill({
        json: accounts,
      });
    });
    await page.route(
      `**/api/administrator/accounts/${account.id}`,
      function(route) {
        route.fulfill({
          json: account,
        });
      },
    );
    await page.goto("http://localhost:5173/admin/accounts");
    await expect(
      page.getByRole("cell", { name: "Brak danych" }).first(),
    ).toBeVisible();
    await page.getByRole("cell", { name: "Brak danych" }).first().click();
    expect(page.url().endsWith(`/admin/accounts/${account.id}`));
  });
});
