import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { AccountDto } from "../../../src/data/useAccount";
import { Role } from "../../../src/data/useAccountStore";

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
  externalId: "2137",
  roles: [Role.PARTICIPANT],
};

describe("account page ui tests", function() {
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

  test("check if all of the elements are rendered correctly", async () => {
    await page.route(
      `**/api/administrator/accounts/${account.id}`,
      function(route) {
        route.fulfill({
          json: account,
        });
      },
    );
    await page.goto(
      "http://localhost:5173/admin/accounts/db5f268a-307e-4d5a-9eee-e1f3e98bfe25",
    );
    await expect(page.getByText("Strona główna/Użytkownicy/Uż")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Panel zarządzania uż" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Informacje o użytkowniku" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Dane personalne" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Adres e-mail" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Rodzaj konta" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Zewnętrzny identyfikator" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Ostatnia udana próba logowania" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Data utworzenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Data aktualizacji" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Czy aktywny?" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Brak danych" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Brak danych" }).nth(1),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "GOOGLE" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "2137" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:58:07" }).first(),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "22:57:17" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "22:58:07" }).nth(1),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Role" })).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Nazwa roli" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Czy posiadana?" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Akcja" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Uczestnik" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" }).nth(1)).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Przycisk do odebrania roli uż" }),
    ).toBeVisible();
    await expect(
      page.getByLabel("Przycisk do odebrania roli uż"),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Zarządca" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Nie" }).first()).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Przycisk do przyznania roli u" }).first(),
    ).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "Zarządca Nie Przycisk do" })
        .getByLabel("Przycisk do przyznania roli u"),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Administrator" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Nie" }).nth(1)).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Przycisk do przyznania roli u" }).nth(1),
    ).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "Administrator Nie Przycisk do" })
        .getByLabel("Przycisk do przyznania roli u"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Aktywność" }),
    ).toBeVisible();
    await expect(page.getByText("Czy aktywny?*")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeChecked();
  });
});
