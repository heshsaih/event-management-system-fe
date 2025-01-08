import { Dayjs } from "dayjs";
import { EntityDto, Pageable } from "../types";
import { Role } from "./useAccountStore";
import { useState } from "react";
import { FilterOptions } from "../components/FilterParams";
import {
  mapAccountDtoToAccount,
  mapFilterParamsToUri,
} from "../util/converters";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import { AxiosError } from "axios";
import { apiWithEtag, apiWithToken } from "../api/config";
import toast from "react-hot-toast";
import i18next from "i18next";

export type AccountDto = Omit<EntityDto, "name"> & {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  accountType: string;
  lastSuccessfulLogin: string;
  externalId: string;
  roles: Role[];
};

export type Account = Omit<
  AccountDto,
  "createdAt" | "updatedAt" | "lastSuccessfulLogin"
> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
  lastSuccessfulLogin: Dayjs;
};

export default function useAccount() {
  const [accounts, setAccounts] = useState<Pageable<Account>>();
  const [account, setAccount] = useState<Account>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [params, setParams] = useState<FilterOptions>();

  const getAllAccounts = async function (filterParams?: FilterOptions) {
    const newParams = {
      ...params,
      ...filterParams,
    };
    const uri = mapFilterParamsToUri(newParams);
    if (newParams.orderBy === "name") {
      newParams.orderBy = "firstName";
    }

    try {
      setIsFetching(true);
      const response = await apiWithToken.get<Pageable<AccountDto>>(
        `/administrator/accounts?${uri}`,
      );
      setAccounts({
        ...response.data,
        content: response.data.content.map(mapAccountDtoToAccount),
      });
      setParams(newParams);
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const getAccount = async function (id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithEtag.get<AccountDto>(
        `/administrator/accounts/${id}`,
      );
      setAccount(mapAccountDtoToAccount(response.data));
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const addRole = async function (
    accountId: string,
    role: Role,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.post(
        `/administrator/accounts/${accountId}/roles?roleName=${role}`,
      );
      toast.success(i18next.t("dataHooks.account.addRoleSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const removeRole = async function (
    accountId: string,
    role: Role,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.delete(
        `/administrator/accounts/${accountId}/roles?roleName=${role}`,
      );
      toast.success(i18next.t("dataHooks.account.removeRoleSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const changeActive = async function (
    accountId: string,
    active: boolean,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.patch(
        `/administrator/accounts/${accountId}/set-active?active=${active}`,
      );
      toast.success(i18next.t("dataHooks.account.changeActiveSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    accounts,
    account,
    params,
    isFetching,
    isUpdating,
    getAllAccounts,
    getAccount,
    addRole,
    removeRole,
    changeActive,
  }
}
