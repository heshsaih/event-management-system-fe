import { z } from "zod";
import StyledModal from "../../../components/StyledModal";
import useEmailNotification from "../../../data/useEmailNotification";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import TextInput from "../../../components/TextInput";
import ConfirmActionModal from "../../../components/ConfirmActionModal";
import { useTranslation } from "react-i18next";
import Form from "../../../components/Form";
import { Colors } from "../../../constants/styling";

const updateEmailTemplateSchema = z.object({
  name: z
    .string()
    .min(2, "updateEmailNotifForm.validation.nameTooShort")
    .max(64, "updateEmailNotifForm.validation.nameTooLong"),
  subject: z
    .string()
    .min(2, "updateEmailNotifForm.validation.subjectTooShort")
    .max(64, "updateEmailNotifForm.validation.subjectTooLong"),
  contentPrefix: z
    .string()
    .min(2, "updateEmailNotifForm.validation.contentPrefixTooShort")
    .max(255, "updateEmailNotifForm.validation.contentPrefiXTooLong"),
  contentSuffix: z
    .string()
    .min(2, "updateEmailNotifForm.validation.contentSuffixTooShort")
    .max(255, "updateEmailNotifForm.validation.contentSuffixTooLong"),
});

type UpdateEmailTemplateSchema = z.infer<typeof updateEmailTemplateSchema>;

type UpdateEmailNotificationTemplateProps = {
  open: boolean;
  onClose: () => void;
  templateId: string | undefined;
};

export default function UpdateEmailNotificationTemplate(
  props: UpdateEmailNotificationTemplateProps,
) {
  const { isFetching, getTemplate, updateTemplate, isUpdating, template } =
    useEmailNotification();
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  useEffect(
    function() {
      if (props.open && props.templateId) {
        getTemplate(props.templateId);
      }
    },
    [props.templateId],
  );

  const a = useForm<UpdateEmailTemplateSchema>({
    resolver: zodResolver(updateEmailTemplateSchema),
    values: {
      name: template?.name ?? "",
      subject: template?.subject ?? "",
      contentPrefix: template?.contentPrefix ?? "",
      contentSuffix: template?.contentSuffix ?? "",
    },
  });

  const submit = a.handleSubmit(function() {
    setOpenConfirm(true);
  });

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">
          {t("updateEmailNotifForm.pageHeading")}
        </Typography>
        <FormProvider {...a}>
          {isFetching && (
            <CircularProgress
              size={"3rem"}
              sx={{ color: Colors.RED }}
            ></CircularProgress>
          )}
          {!isFetching && (
            <Form onSubmit={submit}>
              <TextInput
                autoFocus
                name="name"
                label={t("updateEmailNotifForm.labels.name")}
                aria-label={t("updateEmailNotifForm.ariaLabels.name")}
              ></TextInput>
              <TextInput
                name="subject"
                label={t("updateEmailNotifForm.labels.subject")}
                aria-label={t("updateEmailNotifForm.ariaLabels.subject")}
              ></TextInput>
              <TextInput
                name="contentPrefix"
                label={t("updateEmailNotifForm.labels.contentPrefix")}
                aria-label={t("updateEmailNotifForm.ariaLabels.contentPrefix")}
                multiline
                minRows={5}
                maxRows={8}
              ></TextInput>
              <TextInput
                name="contentSuffix"
                label={t("updateEmailNotifForm.labels.contentSuffix")}
                aria-label={t("updateEmailNotifForm.ariaLabels.contentSuffix")}
                multiline
                minRows={5}
                maxRows={8}
              ></TextInput>
              <Tooltip title={t("updateEmailNotifForm.submitButtonTooltip")}>
                <Button
                  type="submit"
                  aria-label={t("updateEmailNotifForm.ariaLabels.submitButton")}
                >
                  {isUpdating ? (
                    <CircularProgress></CircularProgress>
                  ) : (
                    t("updateEmailNotifForm.submitButtonText")
                  )}
                </Button>
              </Tooltip>
            </Form>
          )}
        </FormProvider>
        <ConfirmActionModal
          open={openConfirm}
          onClose={function() {
            setOpenConfirm(false);
          }}
          confirmAction={async function() {
            setOpenConfirm(false);
            if (props.templateId) {
              const result = await updateTemplate(
                props.templateId,
                a.getValues(),
              );

              if (result) {
                getTemplate(props.templateId);
              }
            }
          }}
        ></ConfirmActionModal>
      </>
    </StyledModal>
  );
}
