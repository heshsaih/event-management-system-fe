import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";

describe("example ui playwright test within vitest", function() {
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

  test("has title", async function() {
    await page.goto("http://localhost:5173/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Uni Project");
  });

  test("go to login pagr", async function() {
    await page.goto("http://localhost:5173/");

    // Click the get started link.
    await page.getByRole("link", { name: "Zaloguj się" }).click();

    // Expects page to have a heading with the name of Installation.
    const expectedUrl = "/login";
    const actualUrl = page.url();
    expect(actualUrl.endsWith(expectedUrl)).toBe(true);
  });
});
