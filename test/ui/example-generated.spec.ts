import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";

describe("generated ui playwright test within vitest", function() {
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

  test("test", async () => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("button").click();
    await page.getByRole("link", { name: "Zarządzanie wydarzeniami" }).click();
    await expect(
      page.getByRole("heading", { name: "Panel podglądu wydarzeń" }),
    ).toBeVisible();
  });
});
