import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { EmailTemplate } from "../../../data/useEmailNotification";
import { UseEventObject } from "../../../data/useEvent";
import useAsyncEmailTemplate from "../../../data/useAsyncEmailTemplate";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/Form";
import ControlledAutocomplete from "../../../components/ControlledAutocomplete";
import { useState } from "react";
import ConfirmActionModal from "../../../components/ConfirmActionModal";
import { mapEventToUpdateEventDtoForMailTemplateUpdate } from "../../../util/converters";
import { useTranslation } from "react-i18next";

type UpdateEventMailTemplateFormProps = {
  state: UseEventObject;
  signUpTemplate: EmailTemplate | undefined;
  reminderTemplate: EmailTemplate | undefined;
  surveyTemplate: EmailTemplate | undefined;
  onCancel: () => void;
};

const updateEventMailTemplateSchema = z.object({
  signUp: z.object({
    label: z.string(),
    value: z.string(),
  }),
  reminder: z.object({
    label: z.string(),
    value: z.string(),
  }),
  survey: z.object({
    label: z.string(),
    value: z.string(),
  }),
});

type UpdateEventTemplateSchema = z.infer<typeof updateEventMailTemplateSchema>;

export default function UpdateEventMailTemplateForm(
  props: UpdateEventMailTemplateFormProps,
) {
  const signUpTemplates = useAsyncEmailTemplate(
    props.signUpTemplate && {
      label: props.signUpTemplate.name,
      value: props.signUpTemplate.id,
    },
    "SESSION_SIGN_UP"
  );
  const reminderTemplates = useAsyncEmailTemplate(
    props.reminderTemplate && {
      label: props.reminderTemplate.name,
      value: props.reminderTemplate.id,
    },
    "SESSION_REMINDER"
  );
  const surveyTemplates = useAsyncEmailTemplate(
    props.surveyTemplate && {
      label: props.surveyTemplate.name,
      value: props.surveyTemplate.id,
    },
    "SURVEY"
  );

  const [signUpChecked, setSignUpChecked] = useState<boolean>(
    !!props.signUpTemplate,
  );
  const [reminderChecked, setReminderChecked] = useState<boolean>(
    !!props.reminderTemplate,
  );
  const [surveyChecked, setSurveyChecked] = useState<boolean>(
    !!props.surveyTemplate,
  );
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { t } = useTranslation();

  const a = useForm<UpdateEventTemplateSchema>({
    resolver: zodResolver(updateEventMailTemplateSchema),
    values: {
      signUp: props.signUpTemplate
        ? {
          label: props.signUpTemplate.name,
          value: props.signUpTemplate.id,
        }
        : {
          label: "",
          value: "",
        },
      reminder: props.reminderTemplate
        ? {
          label: props.reminderTemplate.name,
          value: props.reminderTemplate.id,
        }
        : {
          label: "",
          value: "",
        },
      survey: props.surveyTemplate
        ? {
          label: props.surveyTemplate.name,
          value: props.surveyTemplate.id,
        }
        : {
          label: "",
          value: "",
        },
    },
  });

  const submit = a.handleSubmit(function() {
    setOpenConfirm(true);
  });

  return (
    <FormProvider {...a}>
      <Form onSubmit={submit}>
        <Typography variant="h4" marginBottom={4}>
          {t("eventPageManager.updateEventTemplates.pageHeading")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "75%",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            {t("eventPageManager.updateEventTemplates.signUpHeading")}
          </Typography>
          <RadioGroup>
            <Box display={"flex"} alignItems={"center"}>
              <Radio
                checked={!signUpChecked}
                onChange={function() {
                  setSignUpChecked(false);
                }}
              ></Radio>
              <Typography>
                {t("eventPageManager.updateEventTemplates.defaultTemplate")}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Radio
                checked={signUpChecked}
                onChange={function() {
                  setSignUpChecked(true);
                }}
              ></Radio>
              <Typography>
                {t("eventPageManager.updateEventTemplates.chosenTemplate")}
              </Typography>
            </Box>
          </RadioGroup>
          <ControlledAutocomplete
            disabled={!signUpChecked}
            createable={false}
            async
            componentState={signUpTemplates.componentState}
            setComponentState={signUpTemplates.setComponentState}
            name="signUp"
            options={signUpTemplates.options ?? []}
            filterCallback={function (phrase) {
              signUpTemplates.setInput(phrase);
            }}
            aria-label={t(
              "eventPageManager.updateEventTemplates.ariaLabels.signUpAutocomplete",
            )}
            label={t(
              "eventPageManager.updateEventTemplates.labels.signUpAutocomplete",
            )}
          ></ControlledAutocomplete>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "75%",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            {t("eventPageManager.updateEventTemplates.surveyHeading")}
          </Typography>
          <RadioGroup>
            <Box display={"flex"} alignItems={"center"}>
              <Radio
                checked={!surveyChecked}
                onChange={function() {
                  setSurveyChecked(false);
                }}
              ></Radio>
              <Typography>
                {t("eventPageManager.updateEventTemplates.noTemplate")}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Radio
                checked={surveyChecked}
                onChange={function() {
                  setSurveyChecked(true);
                }}
              ></Radio>
              <Typography>
                {t("eventPageManager.updateEventTemplates.chosenTemplate")}
              </Typography>
            </Box>
          </RadioGroup>
          <ControlledAutocomplete
            disabled={!surveyChecked}
            createable={false}
            async
            componentState={surveyTemplates.componentState}
            setComponentState={surveyTemplates.setComponentState}
            name="survey"
            options={surveyTemplates.options ?? []}
            filterCallback={function (phrase) {
              surveyTemplates.setInput(phrase);
            }}
            label={t(
              "eventPageManager.updateEventTemplates.labels.surveyAutocomplete",
            )}
            aria-label={t(
              "eventPageManager.updateEventTemplates.ariaLabels.surveyAutocomplete",
            )}
          ></ControlledAutocomplete>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "75%",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            {t("eventPageManager.updateEventTemplates.reminderHeading")}
          </Typography>
          <RadioGroup>
            <Box display={"flex"} alignItems={"center"}>
              <Radio
                checked={!reminderChecked}
                onChange={function() {
                  setReminderChecked(false);
                }}
              ></Radio>
              <Typography>
                {t("eventPageManager.updateEventTemplates.defaultTemplate")}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Radio
                checked={reminderChecked}
                onChange={function() {
                  setReminderChecked(true);
                }}
              ></Radio>
              <Typography>
                {t("eventPageManager.updateEventTemplates.chosenTemplate")}
              </Typography>
            </Box>
          </RadioGroup>
          <ControlledAutocomplete
            disabled={!reminderChecked}
            createable={false}
            async
            componentState={reminderTemplates.componentState}
            setComponentState={reminderTemplates.setComponentState}
            name="reminder"
            options={reminderTemplates.options ?? []}
            filterCallback={function (phrase) {
              reminderTemplates.setInput(phrase);
            }}
            label={t(
              "eventPageManager.updateEventTemplates.labels.reminderAutocomplete",
            )}
            aria-label={t(
              "eventPageManager.updateEventTemplates.ariaLabels.reminderAutocomplete",
            )}
          ></ControlledAutocomplete>
        </Box>
        <Box>
          <Tooltip
            title={t(
              "eventPageManager.updateEventTemplates.submitButtonTooltip",
            )}
          >
            <Button
              aria-label={t(
                "eventPageManager.updateEventTemplates.ariaLabels.submitButton",
              )}
              type="submit"
            >
              {t("eventPageManager.updateEventTemplates.submitButtonText")}
            </Button>
          </Tooltip>
          <Tooltip
            title={t(
              "eventPageManager.updateEventTemplates.cancelButtonTooltip",
            )}
          >
            <Button
              aria-label={t(
                "eventPageManager.updateEventTemplates.ariaLabels.cancelButton",
              )}
              onClick={props.onCancel}
            >
              {t("eventPageManager.updateEventTemplates.cancelButtonText")}
            </Button>
          </Tooltip>
        </Box>
      </Form>
      <ConfirmActionModal
        open={openConfirm}
        onClose={function() {
          setOpenConfirm(false);
        }}
        confirmAction={async function() {
          if (props.state.event) {
            const ids = a.getValues();
            const result = await props.state.updateEvent(
              props.state.event.id,
              mapEventToUpdateEventDtoForMailTemplateUpdate({
                ...props.state.event,
                sessionReminderManagerEmailTemplateId: reminderChecked
                  ? ids.reminder.value
                  : null,
                sessionSignUpManagerEmailTemplateId: signUpChecked
                  ? ids.signUp.value
                  : null,
                surveyManagerEmailTemplateId: surveyChecked
                  ? ids.survey.value
                  : null,
              }),
            );

            if (result) {
              props.state.getEvent(props.state.event.id);
              props.onCancel();
            }
          }
        }}
      ></ConfirmActionModal>
    </FormProvider>
  );
}
