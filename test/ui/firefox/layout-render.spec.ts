import {
  Browser,
  BrowserContext,
  expect,
  firefox,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";

describe("layout render test", function() {
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

  test("check if all of the elements are rendered", async () => {
    await page.goto("http://localhost:5173/");
    await expect(page.getByText("Wydarzenia PŁZaloguj się")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Wydarzenia PŁ" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Zaloguj się" })).toBeVisible();
    await expect(page.getByText("Strona głównaStrona głó")).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Strona główna$/ }),
    ).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: "Politechnika Łódzkaul. Ż" })
        .nth(1),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Politechnika Łódzka" }),
    ).toBeVisible();
    await expect(page.getByText("ul. Żeromskiego 11690-924 Łód")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Centrum E-Learningu" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Strona główna CEL PŁLokalizacjaGodziny pracyPomoc techniczna WIKAMPbok@edu.p.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Przydatne linki" }),
    ).toBeVisible();
    await expect(page.getByText("Strona główna PŁBiblioteka PŁ")).toBeVisible();
  });

  test("check if sidepanel is function", async function() {
    await page.goto("http://localhost:5173/");
    await expect(page.getByLabel("Przycisk otwierający panel")).toBeVisible();
    await page.getByLabel("Przycisk otwierający panel").click();
//    await expect(
//      page
//        .locator("div")
//        .filter({
//          hasText:
//            "Użytkownik nieuwierzytelniony",
//        })
//        .nth(0),
//    ).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby zamknąć panel")).toBeVisible();
    await page.getByLabel("Kliknij, aby zamknąć panel").click();
  });
});
