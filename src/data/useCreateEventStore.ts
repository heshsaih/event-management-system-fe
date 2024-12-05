import { create } from "zustand";
import { CreateEventForm } from "../pages/manager/create-event-page/EventForm";
import { CreateSessionForm } from "../pages/manager/create-event-page/SessionForm";
import { createJSONStorage, persist } from "zustand/middleware";
import dayjs from "dayjs";
import getRandomColor from "../util/randomColor";
import { DEFAULT_SESSION_BLOCK } from "../constants/session";

export type SessionBlock = {
  name: string;
  color: string;
};

export type CreateEventStore = CreateEventForm & {
  sessions: CreateSessionForm[];
  sessionBlocks: SessionBlock[];
  image?: {
    name: string,
    data: string
  },
  addSessionBlock: (newSessionBlock: string) => void;
  setSessionBlocks: (sessionBlocks: string[]) => void;
  updateSession: (session: CreateSessionForm) => void;
  createSession: (newSession: CreateSessionForm) => void;
  removeSession: (sessionId: string) => void;
  updateEvent: (event: CreateEventForm) => void;
  setSessions: (sessions: CreateSessionForm[]) => void;
  setImage: (name: string, value: string) => void;
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
        updateSession: function(session: CreateSessionForm) {
          set({
            sessions: get().sessions.map(function(e) {
              return e.id === session.id ? session : e;
            }),
          });
        },
        createSession: function(newSession: CreateSessionForm) {
          set({
            sessions: [...get().sessions, newSession],
          });
        },
        removeSession: function(sessionId: string) {
          set({
            sessions: get().sessions.filter(function(e) {
              return e.id !== sessionId;
            }),
          });
        },
        setImage: function(name: string, value: string) {
          set({
            image: {
              name: name,
              data: value
            }
          });
        },
        updateEvent: function(event: CreateEventForm) {
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
        },
        setSessions: function(sessions: CreateSessionForm[]) {
          set({
            sessions: sessions,
          });
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
            minutesBetweenSessions: 1,
          });
        },
        setSessionBlocks: function(sessionBlocks: string[]) {
          if (sessionBlocks.length === 0) {
            set({
              sessionBlocks: [DEFAULT_SESSION_BLOCK],
            });
          } else {
            set({
              sessionBlocks: [
                ...sessionBlocks.map(function(e) {
                  return {
                    name: e,
                    color: getRandomColor(),
                  };
                }),
              ],
            });
          }
        },
        addSessionBlock: function(newSessionBlock: string) {
          set({
            sessionBlocks: [
              ...get().sessionBlocks,
              { name: newSessionBlock, color: getRandomColor() },
            ],
          });
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
