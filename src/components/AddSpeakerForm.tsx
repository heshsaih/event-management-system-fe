import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "./Form";
import TextInput from "./TextInput";
import { useState } from "react";
import useSpeaker from "../data/useSpeaker";
import StyledModal from "./StyledModal";
import ControlledAutocomplete from "./ControlledAutocomplete";
import { useSpeakerTitle } from "../data/useSpeakerTitle";
import { useOrganization } from "../data/useOrganization";
import useAsyncSpeakerTitle from "../data/useAsyncSpeakerTitle";
import useAsyncOrganization from "../data/useAsyncOrganization";
import ConfirmActionModal from "./ConfirmActionModal";
import { useTranslation } from "react-i18next";

type AddSpeakerFormProps = {
  open: boolean;
  onClose: () => void;
};

const addSpeakerSchema = z.object({
  firstName: z
    .string()
    .min(2, "addSpeakerForm.validation.firstNameTooShort")
    .max(64, "addSpeakerForm.validation.firstNameTooLong"),
  lastName: z
    .string()
    .min(2, "addSpeakerForm.validation.lastNameTooShort")
    .max(64, "addSpeakerForm.validation.lastNameTooLong"),
  speakerTitle: z
    .object({
      label: z.string(),
      value: z
        .string()
        .min(1, "addSpeakerForm.validation.speakerTitleRequired"),
    })
    .optional(),
  organization: z.object({
    label: z.string(),
    value: z.string().min(1, "addSpeakerForm.validation.organizaitonRequired"),
  }).optional(),
  email: z.string().email("addSpeakerForm.validation.emailWrongFormat"),
  backupEmail: z.string().optional(),
});

export type AddSpeakerFormType = z.infer<typeof addSpeakerSchema>;

export default function AddSpeakerForm(props: AddSpeakerFormProps) {
  const [newSpeakerTitle, setNewSpeakerTitle] = useState<string>("");
  const [newOrganization, setNewOrganization] = useState<string>("");
  const { createSpeakerTitle } = useSpeakerTitle();
  const { createOrganization } = useOrganization();
  const { isCreating, createSpeaker, getAllSpeakers } = useSpeaker();
  const speakerTitles = useAsyncSpeakerTitle();
  const organizations = useAsyncOrganization();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { t } = useTranslation();

  const a = useForm<AddSpeakerFormType>({
    resolver: zodResolver(addSpeakerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      speakerTitle: {
        label: "",
        value: "",
      },
      organization: {
        label: "",
        value: "",
      },
      email: "",
      backupEmail: "",
    },
  });

  const submit = a.handleSubmit(function() {
    setOpenConfirm(true);
  });

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">{t("addSpeakerForm.pageHeading")}</Typography>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
              }}
            >
              <TextInput
                autoFocus
                name="firstName"
                label={t("addSpeakerForm.labels.firstName")}
                aria-label={t("addSpeakerForm.ariaLabels.firstName")}
              ></TextInput>
              <Typography marginX={2}></Typography>
              <TextInput
                name="lastName"
                label={t("addSpeakerForm.labels.lastName")}
                aria-label={t("addSpeakerForm.ariaLabels.lastName")}
              ></TextInput>
            </Box>
            <ControlledAutocomplete
              async
              name="speakerTitle"
              options={speakerTitles.options ?? []}
              componentState={speakerTitles.componentState}
              setComponentState={speakerTitles.setComponentState}
              label={t("addSpeakerForm.labels.speakerTitle")}
              aria-label={t("addSpeakerForm.ariaLabels.speakerTitle")}
              createable
              createLabel={t("addSpeakerForm.createLabels.speakerTitle")}
              createValue={crypto.randomUUID()}
              onCreateCallback={async function() {
                const result = await createSpeakerTitle([
                  {
                    name: newSpeakerTitle,
                  },
                ]);
                if (result) {
                  speakerTitles.setComponentState({
                    label: "",
                    value: "",
                  });
                }
              }}
              filterCallback={function(phrase) {
                setNewSpeakerTitle(phrase);
                speakerTitles.setInput(phrase);
              }}
            ></ControlledAutocomplete>
            <ControlledAutocomplete
              async
              name="organization"
              options={organizations.options ?? []}
              componentState={organizations.componentState}
              setComponentState={organizations.setComponentState}
              label={t("addSpeakerForm.labels.organization")}
              aria-label={t("addSpeakerForm.ariaLabels.organization")}
              createable
              createLabel={t("addSpeakerForm.createLabels.organizaiton")}
              createValue={crypto.randomUUID()}
              onCreateCallback={async function() {
                const result = await createOrganization([
                  {
                    name: newOrganization,
                  },
                ]);
                if (result) {
                  organizations.setComponentState({
                    label: "",
                    value: "",
                  });
                }
              }}
              filterCallback={function(phrase) {
                setNewOrganization(phrase);
                organizations.setInput(phrase);
              }}
            ></ControlledAutocomplete>
            <TextInput
              name="email"
              label={t("addSpeakerForm.labels.email")}
              aria-label={t("addSpeakerForm.ariaLabels.email")}
            ></TextInput>
            <TextInput
              name="backupEmail"
              label={t("addSpeakerForm.labels.backupEmail")}
              aria-label={t("addSpeakerForm.ariaLabels.backupEmail")}
            ></TextInput>
            <Tooltip title={t("addSpeakerForm.submitButtonTooltip")}>
              <Button
                type="submit"
                aria-label={t("addSpeakerForm.ariaLabels.submitButton")}
              >
                {isCreating ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  t("addSpeakerForm.submitButtonText")
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
            const data = a.getValues();
            const success = await createSpeaker([
              {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                backupEmail: data.backupEmail,
                speakerTitleId: data.speakerTitle?.value,
                organizationId: data.organization?.value,
              },
            ]);
            if (success) {
              await getAllSpeakers();
              a.reset();
              speakerTitles.setComponentState({
                label: "",
                value: "",
              });
              organizations.setComponentState({
                label: "",
                value: "",
              });
              props.onClose();
            }
          }}
        ></ConfirmActionModal>
      </>
    </StyledModal>
  );
}
