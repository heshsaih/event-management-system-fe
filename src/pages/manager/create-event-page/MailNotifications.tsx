import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { useState } from "react";
import useCreateEventStore from "../../../data/useCreateEventStore";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/Form";
import ControlledAutocomplete from "../../../components/ControlledAutocomplete";
import useAsyncEmailTemplate from "../../../data/useAsyncEmailTemplate";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

type MailNotificationsProps = {
  previousStep: () => void;
  nextStep: () => void;
};

const mailNotificationsSchema = z.object({
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

export type MailNotifications = z.infer<typeof mailNotificationsSchema>;

export default function MailNotifications(props: MailNotificationsProps) {
  const state = useCreateEventStore(function(state) {
    return state;
  });

  if (state.name.length < 3 || state.descriptionPL.length < 3) {
    return <Navigate to={"/manager/events/create?step=0"}></Navigate>;
  }

  const signUpTemplates = useAsyncEmailTemplate(
    state.sessionSignUpManagerEmailTemplateId,
    "SESSION_SIGN_UP"
  );
  const reminderTemplates = useAsyncEmailTemplate(
    state.sessionReminderManagerEmailTemplateId,
    "SESSION_REMINDER"
  );
  const surveyTemplates = useAsyncEmailTemplate(
    state.surveyManagerEmailTemplateId,
    "SURVEY"
  );

  const [signUpChecked, setSignUpChecked] = useState<boolean>(
    state.sessionSignUpManagerEmailTemplateId.value.length !== 0,
  );
  const [reminderChecked, setReminderChecked] = useState<boolean>(
    state.sessionReminderManagerEmailTemplateId.value.length !== 0,
  );
  const [surveyChecked, setSurveyChecked] = useState<boolean>(
    state.surveyManagerEmailTemplateId.value.length !== 0,
  );
  const { t } = useTranslation();

  const a = useForm<MailNotifications>({
    resolver: zodResolver(mailNotificationsSchema),
    defaultValues: {
      signUp: state.sessionSignUpManagerEmailTemplateId,
      reminder: state.sessionReminderManagerEmailTemplateId,
      survey: state.surveyManagerEmailTemplateId,
    },
  });

  const submit = a.handleSubmit(function(data) {
    const result: MailNotifications = {
      signUp: signUpChecked
        ? data.signUp
        : {
          label: "",
          value: "",
        },
      survey: surveyChecked
        ? data.survey
        : {
          label: "",
          value: "",
        },
      reminder: reminderChecked
        ? data.reminder
        : {
          label: "",
          value: "",
        },
    };
    state.updateMailNotifications(result);
    props.nextStep();
  });

  return (
    <StyledContainer inner>
      <Typography variant="h3" marginBottom={4}>
        {t("createEventPage.mailTemplates.pageHeading")}
      </Typography>
      <StyledContainer inner>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "75%",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">
                {t("createEventPage.mailTemplates.signUpHeading")}
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
                    {t("createEventPage.mailTemplates.defaultTemplate")}
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
                    {t("createEventPage.mailTemplates.chosenTemplate")}
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
                label={t(
                  "createEventPage.mailTemplates.labels.signUpAutocomplete",
                )}
                aria-label={t(
                  "createEventPage.mailTemplates.ariaLabels.signUpAutocomplete",
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
                {t("createEventPage.mailTemplates.surveyHeading")}
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
                    {t("createEventPage.mailTemplates.noTemplate")}
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
                    {t("createEventPage.mailTemplates.chosenTemplate")}
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
                  "createEventPage.mailTemplates.labels.surveyAutocomplete",
                )}
                aria-label={t(
                  "createEventPage.mailTemplates.ariaLabels.surveyAutocomplete",
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
                {t("createEventPage.mailTemplates.reminderHeading")}
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
                    {t("createEventPage.mailTemplates.defaultTemplate")}
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
                    {t("createEventPage.mailTemplates.chosenTemplate")}
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
                filterCallback={function (phrase) {
                  reminderTemplates.setInput(phrase);
                }}
                options={reminderTemplates.options ?? []}
                label={t(
                  "createEventPage.mailTemplates.labels.surveyAutocomplete",
                )}
                aria-label={t(
                  "createEventPage.mailTemplates.ariaLabels.surveyAutocomplete",
                )}
              ></ControlledAutocomplete>
            </Box>
            <Box>
              <Tooltip
                title={t(
                  "createEventPage.mailTemplates.previousStepButtonTooltip",
                )}
              >
                <Button
                  aria-label={t(
                    "createEventPage.mailTemplates.ariaLabels.previousStepButton",
                  )}
                  onClick={props.previousStep}
                >
                  {t("createEventPage.mailTemplates.previousStepButtonText")}
                </Button>
              </Tooltip>
              <Tooltip
                title={t("createEventPage.mailTemplates.nextStepButtonTooltip")}
              >
                <Button
                  aria-label={t(
                    "createEventPage.mailTemplates.ariaLabels.nextStepButton",
                  )}
                  type="submit"
                >
                  {t("createEventPage.mailTemplates.nextStepButtonText")}
                </Button>
              </Tooltip>
            </Box>
          </Form>
        </FormProvider>
      </StyledContainer>
    </StyledContainer>
  );
}
