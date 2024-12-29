import { Box, Button, Radio, RadioGroup, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { useState } from "react";
import useCreateEventStore from "../../../data/useCreateEventStore";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/Form";
import ControlledAutocomplete from "../../../components/ControlledAutocomplete";
import useAsyncEmailTemplate from "../../../data/useAsyncEmailTemplate";

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
  const signUpTemplates = useAsyncEmailTemplate(state.sessionSignUpManagerEmailTemplateId);
  const reminderTemplates = useAsyncEmailTemplate(state.sessionReminderManagerEmailTemplateId);
  const surveyTemplates = useAsyncEmailTemplate(state.surveyManagerEmailTemplateId);

  const [signUpChecked, setSignUpChecked] = useState<boolean>(
    state.sessionSignUpManagerEmailTemplateId.value.length !== 0,
  );
  const [reminderChecked, setReminderChecked] = useState<boolean>(
    state.sessionReminderManagerEmailTemplateId.value.length !== 0,
  );
  const [surveyChecked, setSurveyChecked] = useState<boolean>(
    state.surveyManagerEmailTemplateId.value.length !== 0,
  );

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
        Powiadomienia mailowe
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
                Powiadomienie o zapisaniu się na wydarzenie
              </Typography>
              <RadioGroup>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={!signUpChecked}
                    onChange={function() {
                      setSignUpChecked(false);
                    }}
                  ></Radio>
                  <Typography>Domyślne</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={signUpChecked}
                    onChange={function() {
                      setSignUpChecked(true);
                    }}
                  ></Radio>
                  <Typography>Wybrane</Typography>
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
                label="Powiadomienie o zapisaniu się"
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
                Prośba o wypełnienie ankiety po wydarzeniu
              </Typography>
              <RadioGroup>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={!surveyChecked}
                    onChange={function() {
                      setSurveyChecked(false);
                    }}
                  ></Radio>
                  <Typography>Domyślne</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={surveyChecked}
                    onChange={function() {
                      setSurveyChecked(true);
                    }}
                  ></Radio>
                  <Typography>Wybrane</Typography>
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
                label="Prośba o wypełnienie ankiety"
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
                Przypomnienie o nadchodzącym wydarzeniu
              </Typography>
              <RadioGroup>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={!reminderChecked}
                    onChange={function() {
                      setReminderChecked(false);
                    }}
                  ></Radio>
                  <Typography>Domyślne</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={reminderChecked}
                    onChange={function() {
                      setReminderChecked(true);
                    }}
                  ></Radio>
                  <Typography>Wybrane</Typography>
                </Box>
              </RadioGroup>
              <ControlledAutocomplete
                disabled={!reminderChecked}
                createable={false}
                async
                componentState={reminderTemplates.componentState}
                setComponentState={reminderTemplates.setComponentState}
                name="reminder"
                options={surveyTemplates.options ?? []}
                label="Przypomnienie o nadchodzącym wydarzeniu"
              ></ControlledAutocomplete>
            </Box>
            <Box>
              <Button onClick={props.previousStep}>Powrót</Button>
              <Button type="submit">Dalej</Button>
            </Box>
          </Form>
        </FormProvider>
      </StyledContainer>
    </StyledContainer>
  );
}
