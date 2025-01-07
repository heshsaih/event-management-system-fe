import { useState } from "react";
import { EmailTemplateType, Entity, EntityDto, Pageable } from "../types";
import { FilterOptions } from "../components/FilterParams";
import {
  mapEmailTemplateDtoToEmailTemplate,
  mapFilterParamsToUri,
} from "../util/converters";
import { apiWithEtag, apiWithToken } from "../api/config";
import { BackendError, handleBackendError } from "../util/parsingErrors";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import i18next from "i18next";

export type EmailTemplateDto = EntityDto & {
  templateType: EmailTemplateType;
  subject: string;
  contentPrefix: string;
  contentSuffix: string;
};

export type EmailTemplate = Entity & {
  templateType: EmailTemplateType;
  subject: string;
  contentPrefix: string;
  contentSuffix: string;
};

export type CreateEmailTemplateDto = {
  name: string;
  subject: string;
  contentPrefix: string;
  contentSuffix: string;
};

export type UpdateEmailTemplateDto = {
  name: string;
  subject: string;
  contentPrefix: string;
  contentSuffix: string;
};

export default function useEmailNotification() {
  const [templates, setTemplates] = useState<Pageable<EmailTemplate>>();
  const [template, setTemplate] = useState<EmailTemplate>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [options, setOptions] = useState<FilterOptions>();

  const getTemplate = async function(id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithEtag.get<EmailTemplateDto>(
        `/manager/manager-email-templates/${id}`,
      );
      setTemplate(mapEmailTemplateDtoToEmailTemplate(response.data));
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const getTemplateNoEtag = async function(id: string) {
    try {
      setIsFetching(true);
      const response = await apiWithToken.get<EmailTemplateDto>(
        `/manager/manager-email-templates/${id}`,
      );
      setTemplate(mapEmailTemplateDtoToEmailTemplate(response.data));
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const getAllTemplates = async function(
    filterParams?: FilterOptions,
    type?: EmailTemplateType,
  ) {
    let emailType: string;
    switch (type) {
      case "SURVEY":
        emailType = "/survey-templates";
        break;
      case "SESSION_REMINDER":
        emailType = "/session-reminder-templates";
        break;
      case "SESSION_SIGN_UP":
        emailType = "/session-sign-up-templates";
        break;
      default:
        emailType = "";
    }
    const newFilterOptions = {
      ...options,
      ...filterParams,
    };

    const uri = mapFilterParamsToUri(newFilterOptions);

    try {
      setIsFetching(true);
      const response = await apiWithToken.get<Pageable<EmailTemplateDto>>(
        `/manager/manager-email-templates${emailType}?${uri}`,
      );
      setTemplates({
        ...response.data,
        content: response.data.content.map(mapEmailTemplateDtoToEmailTemplate),
      });
      setOptions(newFilterOptions);
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
    } finally {
      setIsFetching(false);
    }
  };

  const createTemplate = async function(
    data: CreateEmailTemplateDto,
    type: EmailTemplateType,
  ): Promise<boolean> {
    try {
      setIsCreating(true);
      let uri: string;
      switch (type) {
        case "SURVEY":
          uri = "survey-templates";
          break;
        case "SESSION_REMINDER":
          uri = "session-reminder-templates";
          break;
        case "SESSION_SIGN_UP":
          uri = "session-sign-up-templates";
          break;
        default:
          uri = "";
      }
      await apiWithToken.post(`/manager/manager-email-templates/${uri}`, data);
      toast.success(i18next.t("dataHooks.emailNotification.createSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const updateTemplate = async function(
    id: string,
    data: UpdateEmailTemplateDto,
  ): Promise<boolean> {
    try {
      setIsUpdating(true);
      await apiWithEtag.put(`/manager/manager-email-templates/${id}`, data);
      toast.success(i18next.t("dataHooks.emailNotification.updateSuccess"));
      return true;
    } catch (e) {
      handleBackendError(e as AxiosError<BackendError | undefined>);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    templates,
    isFetching,
    isCreating,
    getAllTemplates,
    createTemplate,
    options,
    updateTemplate,
    isUpdating,
    getTemplate,
    template,
    getTemplateNoEtag,
  };
}
