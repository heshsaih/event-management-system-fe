import {
  Browser,
  BrowserContext,
  expect,
  Page,
  webkit,
} from "@playwright/test";
import { afterAll, beforeAll, describe, test } from "vitest";
import { Pageable } from "../../../src/types";
import { SpeakerTitleDto } from "../../../src/data/useSpeakerTitle";
import { OrganizationDto } from "../../../src/data/useOrganization";
import { SessionTypeDto } from "../../../src/data/useSessionType";
import { EmailTemplateDto } from "../../../src/data/useEmailNotification";

const speakerTitle: SpeakerTitleDto = {
  id: "077896ee-839f-4948-ae72-cc46cb94e35a",
  name: "dr inż.",
  createdAt: "2025-01-08T22:40:27.659486",
  updatedAt: null,
  active: true,
};

const organization: OrganizationDto = {
  id: "16bc8353-fee1-4127-9b00-435e107d8d1c",
  name: "POLITECHNIKA ŁODZKA",
  createdAt: "2025-01-08T22:40:27.658406",
  updatedAt: null,
  active: true,
};

const sessionType: SessionTypeDto = {
  id: "d19c878f-c7a1-4c1d-9aa2-81d11e5bc3c6",
  name: "Wyklad",
  createdAt: "2025-01-08T22:40:27.696321",
  updatedAt: null,
  active: true,
};

const emailTemplate: EmailTemplateDto = {
  id: "55027501-8be7-4f0d-bb04-d75c64bcfa00",
  templateType: "GLOBAL",
  name: "GLOBAL_TICKET_IS_NOW_NOT_RESERVE",
  subject: "Trafiono na listę główną",
  contentPrefix: "Trafiono na listę główną sesji: ",
  contentSuffix: "Zapraszamy ponownie",
  createdAt: "2025-01-08T22:40:27.752299",
  updatedAt: null,
  active: true,
};

const emailTemplates: Pageable<EmailTemplateDto> = {
  content: [
    {
      id: "55027501-8be7-4f0d-bb04-d75c64bcfa00",
      templateType: "GLOBAL",
      name: "GLOBAL_TICKET_IS_NOW_NOT_RESERVE",
      subject: "Trafiono na listę główną",
      contentPrefix: "Trafiono na listę główną sesji: ",
      contentSuffix: "Zapraszamy ponownie",
      createdAt: "2025-01-08T22:40:27.752299",
      updatedAt: null,
      active: true,
    },
    {
      id: "dee0b937-11d2-46e6-b33d-3c94d4b35a74",
      templateType: "GLOBAL",
      name: "GLOBAL_TICKET_IS_NOW_CANCELLED",
      subject: "Anulowano rezerwację",
      contentPrefix: "Anulowano rezerwację na sesję: ",
      contentSuffix: "Zapraszamy ponownie",
      createdAt: "2025-01-08T22:40:27.752299",
      updatedAt: null,
      active: true,
    },
    {
      id: "5f9738be-ff75-4d70-9543-60523f5a5783",
      templateType: "GLOBAL",
      name: "GLOBAL_TICKET_IS_NOW_RESERVE",
      subject: "Trafiono na listę rezerwową",
      contentPrefix: "Trafiono na listę rezerwową sesji: ",
      contentSuffix: "Zapraszamy ponownie",
      createdAt: "2025-01-08T22:40:27.751731",
      updatedAt: null,
      active: true,
    },
    {
      id: "7dbdd2e4-6354-485d-a7ce-d789ee473785",
      templateType: "GLOBAL",
      name: "GLOBAL_SIGN_OUT_TEMPLATE",
      subject: "Wypisanie z sesji",
      contentPrefix: "Wypisano z sesji",
      contentSuffix: "Zapraszamy ponownie",
      createdAt: "2025-01-08T22:40:27.751183",
      updatedAt: null,
      active: true,
    },
    {
      id: "20d13b67-5df3-4a2d-ae38-8cf40d2bea20",
      templateType: "SESSION_REMINDER",
      name: "DEFAULT_SESSION_REMINDER",
      subject: "Przypomnienie o jutrzejszych sesjach",
      contentPrefix: "Przypominamy o jutrzejszych sesjach: ",
      contentSuffix: "Zapraszamy ponownie",
      createdAt: "2025-01-08T22:40:27.699098",
      updatedAt: null,
      active: true,
    },
    {
      id: "76d3355a-1d54-4e87-b4fe-7abbceeec8f6",
      templateType: "SESSION_SIGN_UP",
      name: "DEFAULT_SESSION_SIGN_UP",
      subject: "Zapisy na sesje",
      contentPrefix: "Zapisano na sesje: ",
      contentSuffix: "Zapraszamy ponownie",
      createdAt: "2025-01-08T22:40:27.697398",
      updatedAt: null,
      active: true,
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
  totalElements: 6,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 6,
  first: true,
  empty: false,
};

const sessionTypes: Pageable<SessionTypeDto> = {
  content: [
    {
      id: "d19c878f-c7a1-4c1d-9aa2-81d11e5bc3c6",
      name: "Wyklad",
      createdAt: "2025-01-08T22:40:27.696321",
      updatedAt: null,
      active: true,
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

const organizations: Pageable<OrganizationDto> = {
  content: [
    {
      id: "16bc8353-fee1-4127-9b00-435e107d8d1c",
      name: "POLITECHNIKA ŁODZKA",
      createdAt: "2025-01-08T22:40:27.658406",
      updatedAt: null,
      active: true,
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

const speakerTitles: Pageable<SpeakerTitleDto> = {
  content: [
    {
      id: "077896ee-839f-4948-ae72-cc46cb94e35a",
      name: "dr inż.",
      createdAt: "2025-01-08T22:40:27.659486",
      updatedAt: null,
      active: true,
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

describe("other parameteres page ui tests", function() {
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

  test("check if all of the elements are rendered correctly", async () => {
    await page.route("**/api/manager/speaker-titles**", function(route) {
      route.fulfill({
        json: speakerTitles,
      });
    });
    await page.goto("http://localhost:5173/manager/other");
    await expect(page.locator("ol")).toContainText(
      "Strona główna/Pozostałe parametry",
    );
    await expect(
      page.getByRole("heading", { name: "Konfiguracja pozostałych" }),
    ).toBeVisible();
    await expect(page.locator("#root")).toContainText(
      "Konfiguracja pozostałych parametrów",
    );
    await expect(
      page.getByRole("tab", { name: "Tytuły prelegentów" }),
    ).toBeVisible();
    await expect(
      page.getByRole("tab", { name: "Organizacje prelegentów" }),
    ).toBeVisible();
    await expect(
      page.getByRole("tab", { name: "Typy konferencji" }),
    ).toBeVisible();
    await expect(
      page.getByRole("tab", { name: "Powiadomienia mailowe" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Tytuły prelegentów" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Dodaj tytuł" }),
    ).toBeVisible();
    await expect(page.getByLabel("Nazwa nowego tytułu*")).toBeVisible();
    await expect(
      page.getByLabel("Przycisk do utworzenia nowego"),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Kliknij, aby rozwinąć" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Nazwa" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data utworzenia" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Data aktualizacji" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Czy aktywny?" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "dr inż" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "22:40:27" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Brak daty aktualizacji" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Tak" })).toBeVisible();
    await expect(
      page.getByText("Ilość wierszy na stronę201-1 z"),
    ).toBeVisible();
  });

  test("check if switching the pages work", async function() {
    await page.route("**/api/manager/speaker-titles**", function(route) {
      route.fulfill({
        json: speakerTitles,
      });
    });
    await page.route("**/api/manager/organizations**", function(route) {
      route.fulfill({
        json: organizations,
      });
    });
    await page.route("**/api/manager/session-types**", function(route) {
      route.fulfill({
        json: sessionTypes,
      });
    });
    await page.route(
      "**/api/manager/manager-email-templates**",
      function(route) {
        route.fulfill({
          json: emailTemplates,
        });
      },
    );
    await page.goto("http://localhost:5173/manager/other");
    await page.getByRole("tab", { name: "Tytuły prelegentów" }).click();
    await expect(page.getByRole("cell", { name: "dr inż" })).toBeVisible();
    await page.getByRole("tab", { name: "Organizacje prelegentów" }).click();
    await expect(
      page.getByRole("cell", { name: "POLITECHNIKA ŁODZKA" }),
    ).toBeVisible();
    await page.getByRole("tab", { name: "Typy konferencji" }).click();
    await expect(page.getByRole("cell", { name: "Wyklad" })).toBeVisible();
    await page.getByRole("tab", { name: "Powiadomienia mailowe" }).click();
    await expect(
      page.getByRole("cell", { name: "GLOBAL_TICKET_IS_NOW_NOT_RESERVE" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "GLOBAL_TICKET_IS_NOW_CANCELLED" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "GLOBAL_TICKET_IS_NOW_RESERVE" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "GLOBAL_SIGN_OUT_TEMPLATE" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "DEFAULT_SESSION_REMINDER" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "DEFAULT_SESSION_SIGN_UP" }),
    ).toBeVisible();
  });

  test("check if forms for updating works", async function() {
    await page.route("**/api/manager/speaker-titles**", function(route) {
      route.fulfill({
        json: speakerTitles,
      });
    });
    await page.route("**/api/manager/organizations**", function(route) {
      route.fulfill({
        json: organizations,
      });
    });
    await page.route("**/api/manager/session-types**", function(route) {
      route.fulfill({
        json: sessionTypes,
      });
    });
    await page.route(
      "**/api/manager/manager-email-templates**",
      function(route) {
        route.fulfill({
          json: emailTemplates,
        });
      },
    );
    await page.route(
      `**/api/manager/speaker-titles/${speakerTitle.id}`,
      function(route) {
        route.fulfill({
          json: speakerTitle,
        });
      },
    );
    await page.route(
      `**/api/manager/organizations/${organization.id}`,
      function(route) {
        route.fulfill({
          json: organization,
        });
      },
    );
    await page.route(
      `**/api/manager/session-types/${sessionType.id}`,
      function(route) {
        route.fulfill({
          json: sessionType,
        });
      },
    );
    await page.route(
      `**/api/manager/manager-email-templates/${emailTemplate.id}`,
      function(route) {
        route.fulfill({
          json: emailTemplate,
        });
      },
    );
    await page.goto("http://localhost:5173/manager/other");
    await page.getByRole("tab", { name: "Tytuły prelegentów" }).click();
    await page.getByRole("cell", { name: "22:40:27" }).click();
    await expect(
      page.getByText(
        "Edytuj tytuł prelegentaIdentyfikator parametru077896ee-839f-4948-ae72-",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Edytuj tytuł prelegenta" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Identyfikator parametru" }),
    ).toBeVisible();
    await expect(page.getByText("077896ee-839f-4948-ae72-")).toBeVisible();
    await expect(page.getByLabel("Przycisk do skopiowania")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dane" })).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toHaveValue("dr inż.");
    await expect(page.getByLabel("Przycisk do zapisania zmian")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeChecked();
    await page.getByLabel("Zamknij okno").click();
    await page.getByRole("tab", { name: "Organizacje prelegentów" }).click();
    await page.getByRole("cell", { name: "POLITECHNIKA ŁODZKA" }).click();
    await expect(
      page.getByRole("heading", { name: "Edytuj organizację" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Identyfikator parametru" }),
    ).toBeVisible();
    await expect(page.getByText("16bc8353-fee1-4127-9b00-")).toBeVisible();
    await expect(page.getByLabel("Przycisk do skopiowania")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dane" })).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toHaveValue("POLITECHNIKA ŁODZKA");
    await expect(page.getByLabel("Przycisk do zapisania zmian")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeChecked();
    await page.getByLabel("Zamknij okno").click();
    await page.getByRole("tab", { name: "Typy konferencji" }).click();
    await page.getByRole("cell", { name: "22:40:27" }).click();
    await expect(
      page.getByText(
        "Edytuj typ konferencjiIdentyfikator parametrud19c878f-c7a1-4c1d-9aa2-",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Edytuj typ konferencji" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Identyfikator parametru" }),
    ).toBeVisible();
    await expect(page.getByText("d19c878f-c7a1-4c1d-9aa2-")).toBeVisible();
    await expect(page.getByLabel("Przycisk do skopiowania")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dane" })).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toHaveValue("Wyklad");
    await expect(page.getByLabel("Przycisk do zapisania zmian")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeChecked();
    await page.getByLabel("Zamknij okno").click();
    await page.getByRole("tab", { name: "Powiadomienia mailowe" }).click();
    await page
      .getByRole("cell", { name: "GLOBAL_TICKET_IS_NOW_NOT_RESERVE" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Zaktualizuj szablon" }),
    ).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toBeVisible();
    await expect(page.getByLabel("Temat maila*")).toBeVisible();
    await expect(page.getByLabel("Przedrostek maila*")).toBeVisible();
    await expect(
      page.getByText("Trafiono na listę główną sesji: Przedrostek maila*"),
    ).toBeVisible();
    await expect(page.getByLabel("Przyrostek maila*")).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toHaveValue(
      "GLOBAL_TICKET_IS_NOW_NOT_RESERVE",
    );
    await expect(page.getByLabel("Temat maila*")).toHaveValue(
      "Trafiono na listę główną",
    );
    await expect(page.getByLabel("Przedrostek maila*")).toHaveValue(
      "Trafiono na listę główną sesji: ",
    );
    await expect(page.getByLabel("Przyrostek maila*")).toHaveValue(
      "Zapraszamy ponownie",
    );
    await expect(
      page.getByLabel("Przycisk do zapisania zmian w"),
    ).toBeVisible();
  });

  test("check if a form for creating the email template works", async function() {
    await page.route("**/api/manager/speaker-titles**", function(route) {
      route.fulfill({
        json: speakerTitles,
      });
    });
    await page.route(
      `**/api/manager/manager-email-templates/${emailTemplate.id}`,
      function(route) {
        route.fulfill({
          json: emailTemplate,
        });
      },
    );
    await page.goto("http://localhost:5173/manager/other");
    await page.getByRole("tab", { name: "Powiadomienia mailowe" }).click();
    await expect(
      page.getByLabel("Przycisk do utworzenia nowego"),
    ).toBeVisible();
    await page.getByLabel("Przycisk do utworzenia nowego").click();
    await expect(
      page.getByText(
        "Utwórz szablon powiadomień mailowychNazwa*Nazwa*Temat maila*Temat maila*",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Utwórz szablon powiadomień" }),
    ).toBeVisible();
    await expect(page.getByLabel("Nazwa*")).toBeVisible();
    await expect(page.getByLabel("Temat maila*")).toBeVisible();
    await expect(page.getByLabel("Przedrostek maila*")).toBeVisible();
    await expect(page.getByLabel("Przyrostek maila*")).toBeVisible();
    await expect(page.getByLabel("Typ szablonu*")).toBeVisible();
    await page.getByLabel("Nazwa*").click();
    await page.getByLabel("Nazwa*").fill("test name");
    await page.getByLabel("Temat maila*").click();
    await page.getByLabel("Temat maila*").fill("test title");
    await page.getByLabel("Przedrostek maila*").click();
    await page.getByLabel("Przedrostek maila*").fill("test prefix");
    await page.getByLabel("Przyrostek maila*").click();
    await page.getByLabel("Przyrostek maila*").fill("test suffix");
    await expect(page.getByLabel("Nazwa*")).toHaveValue("test name");
    await expect(page.getByLabel("Temat maila*")).toHaveValue("test title");
    await expect(page.getByLabel("Przedrostek maila*")).toHaveValue(
      "test prefix",
    );
    await expect(page.getByLabel("Przyrostek maila*")).toHaveValue(
      "test suffix",
    );
    await expect(
      page.getByRole("button", { name: "Przycisk do utworzenia nowego" }),
    ).toBeVisible();
  });
});
