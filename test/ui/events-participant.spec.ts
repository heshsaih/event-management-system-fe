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

describe("events page for participants tests", function() {
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

  test("check rendered elements", async () => {
    await page.route("**/api/open/events", function(route) {
      route.fulfill({
        json: events,
      });
    });
    await page.goto("http://localhost:5173/events");
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Strona główna\/Wydarzenia\/Wydarzenie$/ }),
    ).toBeVisible();
    await expect(page.locator("ol")).toContainText(
      "Strona główna/Wydarzenia/Wydarzenie",
    );
    await expect(
      page.getByRole("heading", { name: "Wydarzenia", exact: true }),
    ).toBeVisible();
    await expect(page.locator("#root")).toContainText("Wydarzenia");
    await expect(
      page.getByRole("heading", { name: "Nadchodzące wydarzenia" }),
    ).toBeVisible();
    await expect(page.locator("h4")).toContainText("Nadchodzące wydarzenia");
    await expect(page.getByRole("button", { name: "Event" })).toBeVisible();
    await expect(page.locator("#root")).toContainText("Event 1");
    await page.getByRole("button", { name: "Event" }).click();
    await expect(
      page.getByText(
        "Nazwa wydarzeniaEvent 1Data rozpoczęcia20.12.2024Data zakończenia22.12.2024Wyś",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Nazwa wydarzenia" }),
    ).toBeVisible();
    await expect(page.getByRole("rowgroup")).toContainText("Nazwa wydarzenia");
    await expect(
      page.getByRole("cell", { name: "Data rozpoczęcia" }),
    ).toBeVisible();
    await expect(page.getByRole("rowgroup")).toContainText("Data rozpoczęcia");
    await expect(
      page.getByRole("cell", { name: "Data zakończenia" }),
    ).toBeVisible();
    await expect(page.getByRole("rowgroup")).toContainText("Data zakończenia");
    await expect(page.getByRole("cell", { name: "Event" })).toBeVisible();
    await expect(page.getByRole("rowgroup")).toContainText("Event 1");
    await expect(page.getByRole("cell", { name: "20.12.2024" })).toBeVisible();
    await expect(page.getByRole("rowgroup")).toContainText("20.12.2024");
    await expect(page.getByRole("cell", { name: "22.12.2024" })).toBeVisible();
    await expect(page.getByRole("rowgroup")).toContainText("22.12.2024");
    await expect(page.getByLabel("Kliknij, aby dowiedzieć się")).toBeVisible();
  }, 10000);

  test("check if more details' button for event entry is functional", async function() {

    await page.route("**/api/open/events", function(route) {
      route.fulfill({
        json: events,
      });
    });
    await page.goto("http://localhost:5173/events");
    await page.getByRole("button", { name: "Event" }).click();
    await page.getByLabel("Kliknij, aby dowiedzieć się").click();
    expect(page.url().endsWith("/events/0ed2c9d1-da55-4590-b30f-6668aaef5138"))
  });
});
