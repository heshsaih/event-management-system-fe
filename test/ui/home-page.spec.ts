import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  Page,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { EventForParticipantDto } from "../../src/data/useEventParticipant";

const events: EventForParticipantDto[] = [
  {
    id: "0ed2c9d1-da55-4590-b30f-6668aaef5138",
    name: "Event 1",
    descriptionPl: "Opis eventu 1",
    startDate: "2024-12-20T20:50:11.142513",
    endDate: "2024-12-22T20:50:11.142513",
    image: {
      imageName: "test.png",
      data: "sdjasodksahdiouashdaskhdkjqsahdjk",
    },
    outsidersAllowed: true,
  },
];

describe("ui test for the home page", function() {
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

  test("check if all of the components got rendered", async () => {
    await page.route("**/api/open/events", function(route) {
      route.fulfill({
        json: events,
      });
    });
    await page.goto("http://localhost:5173/");
    await page.getByRole("heading", { name: "Strona główna" }).click();
    await expect(page.locator("#root")).toContainText("Strona główna");
    await expect(
      page.getByText("Event 1Opis eventu 1Więcej").nth(1),
    ).toBeVisible();
    await expect(
      page.getByLabel("Przycisk do wyświetlenia").nth(1),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Nadchodzące wydarzenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Event 1", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Event 1", exact: true }).click();
    await expect(
      page.getByText(
        "Nazwa wydarzeniaEvent 1Data rozpoczęcia20.12.2024Data zakończenia22.12.2024Wyś",
      ),
    ).toBeVisible();
    await expect(page.getByLabel("Kliknij, aby dowiedzieć się")).toBeVisible();
  });

  test("check if navigation buttons work", async function() {
    await page.goto("http://localhost:5173/");
    await page.getByLabel("Przycisk do wyświetlenia").nth(1).click();
    expect(page.url().endsWith("/events/0ed2c9d1-da55-4590-b30f-6668aaef5138"))
    await page.goto("http://localhost:5173/");
    await page.getByRole("button", { name: "Event 1", exact: true }).click();
    expect(page.url().endsWith("/events/0ed2c9d1-da55-4590-b30f-6668aaef5138"))
    await page.getByLabel("Kliknij, aby dowiedzieć się").click();
  });
});
