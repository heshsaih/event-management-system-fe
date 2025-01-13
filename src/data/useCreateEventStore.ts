import { create } from "zustand";
import { CreateEventForm } from "../pages/manager/create-event-page/EventForm";
import { CreateSessionForm } from "../pages/manager/create-event-page/SessionForm";
import { createJSONStorage, persist } from "zustand/middleware";
import dayjs from "dayjs";
import getRandomColor from "../util/randomColor";
import { DEFAULT_SESSION_BLOCK } from "../constants/session";
import { MailNotifications } from "../pages/manager/create-event-page/MailNotifications";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import toast from "react-hot-toast";
import i18next from "i18next";

function handleError(e: unknown) {
  console.error(e);
  toast.error(i18next.t("zustandHooks.createEvent.setErrorBody"));
}

export type SessionBlock = {
  name: string;
  color: string;
};

export type CreateEventStore = CreateEventForm & {
  sessions: CreateSessionForm[];
  sessionBlocks: SessionBlock[];
  surveyManagerEmailTemplateId: AutocompleteOption;
  sessionSignUpManagerEmailTemplateId: AutocompleteOption;
  sessionReminderManagerEmailTemplateId: AutocompleteOption;
  image?: {
    name: string;
    data: string;
  };
  updateMailNotifications: (data: MailNotifications) => void | unknown;
  addSessionBlock: (newSessionBlock: string) => void | unknown;
  setSessionBlocks: (sessionBlocks: string[]) => void | unknown;
  updateSession: (session: CreateSessionForm) => void | unknown;
  createSession: (newSession: CreateSessionForm) => void | unknown;
  removeSession: (sessionId: string) => void;
  updateEvent: (event: CreateEventForm) => void | unknown;
  setSessions: (sessions: CreateSessionForm[]) => void | unknown;
  setImage: (name: string, value: string) => void | unknown;
  clearStore: () => void;
};

const useCreateEventStore = create<CreateEventStore>()(
  persist(
    function(set, get) {
      return {
        name: "",
        descriptionPL: "",
        descriptionEN: "",
        sessionBlocks: [DEFAULT_SESSION_BLOCK],
        startDate: dayjs(),
        endDate: dayjs(),
        registrationStartDate: dayjs().subtract(1, "day"),
        sessions: [],
        outsidersAllowed: true,
        image: undefined,
        minutesBetweenSessions: 1,
        surveyManagerEmailTemplateId: {
          label: "",
          value: "",
        },
        sessionSignUpManagerEmailTemplateId: {
          label: "",
          value: "",
        },
        sessionReminderManagerEmailTemplateId: {
          label: "",
          value: "",
        },
        updateSession: function(session: CreateSessionForm): void | unknown {
          const backup = get().sessions;
          try {
            set({
              sessions: get().sessions.map(function(e) {
                return e.id === session.id ? session : e;
              }),
            });
          } catch (e) {
            handleError(e);
            set({
              sessions: backup,
            });
            return e;
          }
        },
        updateMailNotifications: function(data: MailNotifications) {
          set({
            sessionSignUpManagerEmailTemplateId: data.signUp,
            surveyManagerEmailTemplateId: data.survey,
            sessionReminderManagerEmailTemplateId: data.reminder,
          });
        },
        createSession: function(
          newSession: CreateSessionForm,
        ): void | unknown {
          const backup = get().sessions;
          try {
            set({
              sessions: [...get().sessions, newSession],
            });
          } catch (e) {
            handleError(e);
            set({
              sessions: backup,
            });
            return e;
          }
        },
        removeSession: function(sessionId: string) {
          set({
            sessions: get().sessions.filter(function(e) {
              return e.id !== sessionId;
            }),
          });
        },
        setImage: function(name: string, value: string): void | unknown {
          const backup = get().image;
          try {
            set({
              image: {
                name: name,
                data: value,
              },
            });
          } catch (e) {
            handleError(e);
            set({
              image: backup,
            });
            return e;
          }
        },
        updateEvent: function(event: CreateEventForm): void | unknown {
          try {
            set({
              ...event,
              startDate: event.startDate
                .hour(0)
                .minute(0)
                .second(0)
                .millisecond(0),
              endDate: event.endDate
                .hour(23)
                .minute(59)
                .second(59)
                .millisecond(999),
              registrationStartDate: event.registrationStartDate
                .hour(23)
                .minute(59)
                .second(59)
                .millisecond(999),
            });
          } catch (e) {
            handleError(e);
            return e;
          }
        },
        setSessions: function(sessions: CreateSessionForm[]): void | unknown {
          const backup = get().sessions;
          try {
            set({
              sessions: sessions,
            });
          } catch (e) {
            set({
              sessions: backup,
            });
            handleError(e);
            return e;
          }
        },
        clearStore: function() {
          set({
            name: "",
            descriptionEN: "",
            descriptionPL: "",
            startDate: dayjs(),
            endDate: dayjs(),
            registrationStartDate: dayjs().subtract(1, "day"),
            sessions: [],
            sessionBlocks: [DEFAULT_SESSION_BLOCK],
            outsidersAllowed: true,
            image: undefined,
            surveyManagerEmailTemplateId: {
              label: "",
              value: "",
            },
            sessionSignUpManagerEmailTemplateId: {
              label: "",
              value: "",
            },
            sessionReminderManagerEmailTemplateId: {
              label: "",
              value: "",
            },
            minutesBetweenSessions: 1,
          });
        },
        setSessionBlocks: function(sessionBlocks: string[]) {
          const backup = get().sessionBlocks;
          try {
            if (sessionBlocks.length === 0) {
              set({
                sessionBlocks: [DEFAULT_SESSION_BLOCK],
              });
            } else {
              set({
                sessionBlocks: sessionBlocks.map(function(e) {
                  const color =
                    e === DEFAULT_SESSION_BLOCK.name
                      ? DEFAULT_SESSION_BLOCK.color
                      : getRandomColor();
                  return {
                    name: e,
                    color: color,
                  };
                }),
              });
            }
          } catch (e) {
            set({
              sessionBlocks: backup,
            });
            handleError(e);
            return e;
          }
        },
        addSessionBlock: function(newSessionBlock: string) {
          const backup = get().sessionBlocks;
          try {
            set({
              sessionBlocks: [
                ...get().sessionBlocks,
                { name: newSessionBlock, color: getRandomColor() },
              ],
            });
          } catch (e) {
            set({
              sessionBlocks: backup,
            });
            handleError(e);
            return e;
          }
        },
      };
    },
    {
      name: "createEventStore",
      storage: createJSONStorage(
        function() {
          return localStorage;
        },
        {
          replacer: function(key, value) {
            if (key === "imageFile") return JSON.stringify(value);
            return value;
          },
          reviver: function(key, value) {
            if (
              key === "startDate" ||
              key === "endDate" ||
              key === "registrationStartDate"
            ) {
              return dayjs(value as string);
            }

            if (key === "imageFile") return JSON.parse(value as string);
            if (key === "sessions") {
              return (value as CreateSessionForm[]).map(function(e) {
                return {
                  ...e,
                  startTime: dayjs(e.startTime),
                  endTime: dayjs(e.endTime),
                } as CreateSessionForm;
              });
            }
            return value;
          },
        },
      ),
    },
  ),
);

export default useCreateEventStore;
