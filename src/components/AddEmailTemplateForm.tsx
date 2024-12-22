import {
  Button,
  CircularProgress,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledModal from "./StyledModal";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "./Form";
import TextInput from "./TextInput";
import useEmailNotification from "../data/useEmailNotification";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ConfirmActionModal from "./ConfirmActionModal";

type AddEmailTemplateFormProps = {
  open: boolean;
  onClose: () => void;
};

const addEmailTemplateSchema = z.object({
  name: z
    .string()
    .min(2, "addEmailNotifForm.validation.nameTooShort")
    .max(64, "addEmailNotifForm.validation.nameTooLong"),
  subject: z
    .string()
    .min(2, "addEmailNotifForm.validation.subjectTooShort")
    .max(64, "addEmailNotifForm.validation.subjectTooLong"),
  contentPrefix: z
    .string()
    .min(2, "addEmailNotifForm.validation.contentPrefixTooShort")
    .max(255, "addEmailNotifForm.validation.contentPrefiXTooLong"),
  contentSuffix: z
    .string()
    .min(2, "addEmailNotifForm.validation.contentSuffixTooShort")
    .max(255, "addEmailNotifForm.validation.contentSuffixTooLong"),
  templateType: z
    .literal("SESSION_SIGN_UP")
    .or(z.literal("SESSION_REMINDER"))
    .or(z.literal("SURVEY")),
});

type AddEmailTemplateSchema = z.infer<typeof addEmailTemplateSchema>;

export default function AddEmailTemplateForm(props: AddEmailTemplateFormProps) {
  const { createTemplate, isCreating } = useEmailNotification();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { t } = useTranslation();
  const a = useForm<AddEmailTemplateSchema>({
    resolver: zodResolver(addEmailTemplateSchema),
    defaultValues: {
      name: "",
      subject: "",
      contentPrefix: "",
      contentSuffix: "",
      templateType: "SESSION_SIGN_UP",
    },
  });

  const submit = a.handleSubmit(function() {
    setOpenConfirm(true);
  });

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">
          {t("addEmailNotifForm.pageHeading")}
        </Typography>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <TextInput
              name="name"
              label={t("addEmailNotifForm.labels.name")}
              aria-label={t("addEmailNotifForm.ariaLabels.name")}
            ></TextInput>
            <TextInput
              name="subject"
              label={t("addEmailNotifForm.labels.subject")}
              aria-label={t("addEmailNotifForm.ariaLabels.subject")}
            ></TextInput>
            <TextInput
              name="contentPrefix"
              label={t("addEmailNotifForm.labels.contentPrefix")}
              aria-label={t("addEmailNotifForm.ariaLabels.contentPrefix")}
              multiline
              minRows={5}
              maxRows={8}
            ></TextInput>
            <TextInput
              name="contentSuffix"
              label={t("addEmailNotifForm.labels.contentSuffix")}
              aria-label={t("addEmailNotifForm.ariaLabels.contentSuffix")}
              multiline
              minRows={5}
              maxRows={8}
            ></TextInput>
            <TextInput
              name="templateType"
              label={t("addEmailNotifForm.labels.templateType")}
              aria-label={t("addEmailNotifForm.ariaLabels.templateType")}
              select
            >
              <MenuItem value="SESSION_SIGN_UP">SESSION_SIGN_UP</MenuItem>
              <MenuItem value="SESSION_REMINDER">SESSION_REMINDER</MenuItem>
              <MenuItem value="SURVEY">SURVEY</MenuItem>
            </TextInput>
            <Tooltip title={t("addEmailNotifForm.submitButtonText")}>
              <Button
                type="submit"
                aria-label={t("addEmailNotifForm.ariaLabels.submitButton")}
              >
                {isCreating ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  t("addEmailNotifForm.submitButtonText")
                )}
              </Button>
            </Tooltip>
          </Form>
        </FormProvider>
        <ConfirmActionModal
          open={openConfirm}
          onClose={function() {
            setOpenConfirm(false);
          }}
          confirmAction={async function() {
            setOpenConfirm(false);
            const { templateType, ...rest } = a.getValues();
            const result = await createTemplate(rest, templateType);
            if (result) {
              a.reset();
              props.onClose();
            }
          }}
        ></ConfirmActionModal>
      </>
    </StyledModal>
  );
}
