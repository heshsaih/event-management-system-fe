import { expect, test } from "vitest";
import { Account, AccountDto } from "../../src/data/useAccount";
import { Role } from "../../src/data/useAccountStore";
import { mapAccountDtoToAccount } from "../../src/util/converters";
import dayjs from "dayjs";

test("mapAccountDtoToAccount test success", function() {
  const dto: AccountDto = {
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

  const result: Account = mapAccountDtoToAccount(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(dayjs.isDayjs(result.lastSuccessfulLogin)).toBe(true);
  expect(result.createdAt.isValid()).toBe(true);
  expect(result.updatedAt.isValid()).toBe(true);
  expect(result.lastSuccessfulLogin.isValid()).toBe(true);
});

test("mapAccountDtoToAccount test fail wrong date formats", function() {
  const dto: AccountDto = {
    id: "db5f268a-307e-4d5a-9eee-e1f3e98bfe25",
    createdAt: "sigma",
    updatedAt: "boy",
    active: true,
    email: null,
    firstName: null,
    lastName: null,
    accountType: "GOOGLE",
    lastSuccessfulLogin: "amogus",
    externalId: "2137",
    roles: [Role.PARTICIPANT],
  };

  const result: Account = mapAccountDtoToAccount(dto);

  expect(dayjs.isDayjs(result.createdAt)).toBe(true);
  expect(dayjs.isDayjs(result.updatedAt)).toBe(true);
  expect(dayjs.isDayjs(result.lastSuccessfulLogin)).toBe(true);
  expect(result.createdAt.isValid()).toBe(false);
  expect(result.updatedAt.isValid()).toBe(false);
  expect(result.lastSuccessfulLogin.isValid()).toBe(false);
});
