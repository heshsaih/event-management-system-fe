import { expect, test } from "vitest";
import { EmailTemplate, EmailTemplateDto } from "../../src/data/useEmailNotification";
import { mapEmailTemplateDtoToEmailTemplate } from "../../src/util/converters";
import dayjs from "dayjs";

test("mapEmailTemplateDtoToEmailTemplate test success", function() {
  const dto: EmailTemplateDto = {
    id: "55027501-8be7-4f0d-bb04-d75c64bcfa00",
    templateType: "GLOBAL",
    name: "GLOBAL_TICKET_IS_NOW_NOT_RESERVE",
    subject: "Trafiono na listę główną",
    contentPrefix: "Trafiono na listę główną sesji: ",
    contentSuffix: "Zapraszamy ponownie",
    createdAt: "2025-01-08T22:40:27.752299",
    updatedAt: "2025-01-08T22:40:27.752299",
    active: true,
  };

  const result: EmailTemplate = mapEmailTemplateDtoToEmailTemplate(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
});

test("mapEmailTemplateDtoToEmailTemplate test fail wrong date formats", function() {
  const dto: EmailTemplateDto = {
    id: "55027501-8be7-4f0d-bb04-d75c64bcfa00",
    templateType: "GLOBAL",
    name: "GLOBAL_TICKET_IS_NOW_NOT_RESERVE",
    subject: "Trafiono na listę główną",
    contentPrefix: "Trafiono na listę główną sesji: ",
    contentSuffix: "Zapraszamy ponownie",
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
  };

  const result: EmailTemplate = mapEmailTemplateDtoToEmailTemplate(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.updatedAt.isValid()).toBe(false);
});
