import { z } from "zod";
import useSpeaker, { Speaker } from "../../../data/useSpeaker";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useOrganization } from "../../../data/useOrganization";
import { useSpeakerTitle } from "../../../data/useSpeakerTitle";
import { useState } from "react";
import ControlledAutocomplete from "../../../components/ControlledAutocomplete";
import StyledSwitch from "../../../components/StyledSwitch";
import useAsyncSpeakerTitle from "../../../data/useAsyncSpeakerTitle";
import useAsyncOrganization from "../../../data/useAsyncOrganization";
import { mapUpdateSpeakerFormTypeToUpdateSpeakerDto } from "../../../util/converters";
import { useTranslation } from "react-i18next";

type UpdateSpeakerFormProps = {
  speaker: Speaker | undefined;
  refresh: () => void;
  onCancel: () => void;
};

const updateSpeakerForm = z.object({
  firstName: z.string(),
  lastName: z.string(),
  organization: z.object({
    label: z.string(),
    value: z.string().min(1),
  }),
  speakerTitle: z.object({
    label: z.string(),
    value: z.string().min(1),
  }),
  email: z.string().email(),
  backupEmail: z.string().optional().or(z.string().email()),
});

export type UpdateSpeakerFormType = z.infer<typeof updateSpeakerForm>;

export default function UpdateSpeakerForm(props: UpdateSpeakerFormProps) {
  const a = useForm<UpdateSpeakerFormType>({
    resolver: zodResolver(updateSpeakerForm),
    values: {
      firstName: props.speaker?.firstName ?? "",
      lastName: props.speaker?.lastName ?? "",
      email: props.speaker?.email ?? "",
      backupEmail: props.speaker?.backupEmail,
      speakerTitle: {
        label: props.speaker?.titleName?.name ?? "",
        value: props.speaker?.titleName?.id ?? "",
      },
      organization: {
        label: props.speaker?.organizationName?.name ?? "",
        value: props.speaker?.organizationName?.id ?? "",
      },
    },
  });
  const { t } = useTranslation();
  const { isUpdating, updateSpeaker, setSpeakerActive } = useSpeaker();
  const { createOrganization } = useOrganization();
  const { createSpeakerTitle } = useSpeakerTitle();
  const [newSpeakerTitle, setNewSpeakerTitle] = useState<string>("");
  const [newOrganization, setNewOrganization] = useState<string>("");
  const speakerTitles = useAsyncSpeakerTitle({
    label: props.speaker?.titleName?.name ?? "",
    value: props.speaker?.titleName?.id ?? "",
  });
  const organizations = useAsyncOrganization({
    label: props.speaker?.organizationName?.name ?? "",
    value: props.speaker?.organizationName?.id ?? "",
  });

  const submit = a.handleSubmit(async function(data) {
    const result = await updateSpeaker(
      props.speaker?.id ?? "",
      mapUpdateSpeakerFormTypeToUpdateSpeakerDto(data),
    );
    if (result) {
      props.refresh();
      props.onCancel();
    }
  });

  return (
    <FormProvider {...a}>
      <Form onSubmit={submit}>
        <TextInput
          name="firstName"
          label={t("updateSpeakerForm.labels.firstName")}
          aria-label={t("updateSpeakerForm.ariaLabels.firstName")}
        ></TextInput>
        <TextInput
          name="lastName"
          label={t("updateSpeakerForm.labels.lastName")}
          aria-label={t("updateSpeakerForm.ariaLabels.lastName")}
        ></TextInput>
        <ControlledAutocomplete
          async
          componentState={speakerTitles.componentState}
          setComponentState={speakerTitles.setComponentState}
          name="speakerTitle"
          options={speakerTitles.options ?? []}
          label={t("updateSpeakerForm.labels.speakerTitle")}
          aria-label={t("updateSpeakerForm.ariaLabels.speakerTitle")}
          createable
          createLabel={t("updateSpeakerForm.speakerTitleCreateLabel")}
          createValue={crypto.randomUUID()}
          filterCallback={function(phrase) {
            setNewSpeakerTitle(phrase);
            speakerTitles.setInput(phrase);
          }}
          onCreateCallback={async function() {
            await createSpeakerTitle([
              {
                name: newSpeakerTitle,
              },
            ]);
          }}
        ></ControlledAutocomplete>
        <ControlledAutocomplete
          async
          componentState={organizations.componentState}
          setComponentState={organizations.setComponentState}
          name="organization"
          options={organizations.options ?? []}
          label={t("updateSpeakerForm.labels.organization")}
          aria-label={t("updateSpeakerForm.ariaLabels.organizaton")}
          createable
          createLabel={t("updateSpeakerForm.organizationCreateLabel")}
          createValue={crypto.randomUUID()}
          filterCallback={function(phrase) {
            setNewOrganization(phrase);
            organizations.setInput(phrase);
          }}
          onCreateCallback={async function() {
            await createOrganization([
              {
                name: newOrganization,
              },
            ]);
          }}
        ></ControlledAutocomplete>
        <TextInput
          name="email"
          label={t("updateSpeakerForm.labels.email")}
          aria-label={t("updateSpeakerForm.ariaLabels.email")}
        ></TextInput>
        <TextInput
          name="backupEmail"
          label={t("updateSpeakerForm.labels.backupEmail")}
          aria-label={t("updateSpeakerForm.ariaLabels.backupEmail")}
        ></TextInput>
        <Typography variant="h4">
          {t("updateSpeakerForm.activeHeading")}
        </Typography>
        <StyledSwitch
          disabled={isUpdating}
          checked={props.speaker?.active ?? true}
          onChange={async function() {
            const response = await setSpeakerActive(
              props.speaker?.id ?? "",
              props.speaker?.active ? !props.speaker.active : true,
            );
            if (response) {
              props.refresh();
            }
          }}
        ></StyledSwitch>
        <Box>
          <Tooltip title={t("updateSpeakerForm.submitButtonTooltip")}>
            <Button
              type="submit"
              aria-label={t("updateSpeakerForm.ariaLabels.submitButton")}
            >
              {isUpdating ? (
                <CircularProgress></CircularProgress>
              ) : (
                t("updateSpeakerForm.submitButtonText")
              )}
            </Button>
          </Tooltip>
          <Tooltip title={t("updateSpeakerForm.cancelButtonTooltip")}>
            <Button
              onClick={props.onCancel}
              aria-label={t("updateSpeakerForm.ariaLabels.cancelButton")}
            >
              {t("updateSpeakerForm.cancelButtonText")}
            </Button>
          </Tooltip>
        </Box>
      </Form>
    </FormProvider>
  );
}
