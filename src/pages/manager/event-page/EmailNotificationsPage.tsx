import { Button, Tooltip, Typography } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { UseEventObject } from "../../../data/useEvent";
import useEmailNotification from "../../../data/useEmailNotification";
import { useEffect, useState } from "react";
import EmailTemplateEntry from "./EmailTemplateEntry";
import UpdateEventMailTemplateForm from "./UpdateEventMailTemplatesForm";
import { useTranslation } from "react-i18next";

type EmailNotificationsPageProps = {
  state: UseEventObject;
};

export default function EmailNotificationsPage(
  props: EmailNotificationsPageProps,
) {
  const signUp = useEmailNotification();
  const survey = useEmailNotification();
  const reminder = useEmailNotification();
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(
    function() {
      if (props.state.event) {
        if (props.state.event.sessionSignUpManagerEmailTemplateId !== null) {
          signUp.getTemplateNoEtag(
            props.state.event.sessionSignUpManagerEmailTemplateId,
          );
        }
        if (props.state.event.surveyManagerEmailTemplateId !== null) {
          survey.getTemplateNoEtag(
            props.state.event.surveyManagerEmailTemplateId,
          );
        }
        if (props.state.event.sessionReminderManagerEmailTemplateId !== null) {
          reminder.getTemplateNoEtag(
            props.state.event.sessionReminderManagerEmailTemplateId,
          );
        }
      }
    },
    [props.state.event],
  );

  useEffect(
    function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [editingMode],
  );

  return (
    <StyledContainer inner>
      {!editingMode && (
        <>
          <Typography variant="h4" marginBottom={4}>
            {t("eventPageManager.eventTemplates.pageHeading")}
          </Typography>
          <EmailTemplateEntry
            isFetching={signUp.isFetching}
            title={t("eventPageManager.eventTemplates.signUpTemplateTitle")}
            templateId={
              props.state.event?.sessionSignUpManagerEmailTemplateId as
              | string
              | null
            }
            template={signUp.template}
          ></EmailTemplateEntry>
          <EmailTemplateEntry
            isFetching={reminder.isFetching}
            title={t("eventPageManager.eventTemplates.reminderTemplateTitle")}
            templateId={
              props.state.event?.sessionReminderManagerEmailTemplateId as
              | string
              | null
            }
            template={reminder.template}
          ></EmailTemplateEntry>
          <EmailTemplateEntry
            isFetching={survey.isFetching}
            title={t("eventPageManager.eventTemplates.surveyTemplateTitle")}
            templateId={
              props.state.event?.surveyManagerEmailTemplateId as string | null
            }
            template={survey.template}
          ></EmailTemplateEntry>
          <Tooltip
            title={t(
              "eventPageManager.eventTemplates.editTemplatesButtonTooltip",
            )}
          >
            <Button
              onClick={function() {
                setEditingMode(true);
              }}
            >
              {t("eventPageManager.eventTemplates.editTemplatesButtonText")}
            </Button>
          </Tooltip>
        </>
      )}
      {editingMode && (
        <UpdateEventMailTemplateForm
          state={props.state}
          signUpTemplate={signUp.template}
          reminderTemplate={reminder.template}
          surveyTemplate={survey.template}
          onCancel={function() {
            setEditingMode(false);
          }}
        ></UpdateEventMailTemplateForm>
      )}
    </StyledContainer>
  );
}
