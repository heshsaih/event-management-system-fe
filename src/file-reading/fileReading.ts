import toast from "react-hot-toast";
import Papaparse from "papaparse";
import dayjs, { Dayjs } from "dayjs";
import { AutocompleteOption } from "../components/ControlledAutocomplete";
import { LocationDto } from "../data/useLocation";
import { RoomDto } from "../data/useRoom";
import { SpeakerDto } from "../data/useSpeaker";
import { SessionTypeDto } from "../data/useSessionType";

type ExpectedCSVFormatForEventData = {
  nazwa_wydarzenia: string | undefined;
  opis_pl: string | undefined;
  opis_en: string | undefined;
  przerwa_pomiedzy_konferencjami: string | undefined;
  data_rozpoczecia: string | undefined;
  data_zakonczenia: string | undefined;
  data_rozpoczecia_zapisow: string | undefined;
  wstep_spoza_politechniki: string | undefined;
};

type ExpectedCSVFormatForSessionData = {
  nazwa_konferencji: string | undefined;
  opis_pl: string | undefined;
  opis_en: string | undefined;
  typ_konferencji: string | undefined;
  blok_wydarzenia: string | undefined;
  pomieszczenie: string | undefined;
  prelegent: string | undefined;
  ilosc_miejsc: string | undefined;
  czas_zakonczenia_zapisow: string | undefined;
  data_rozpoczecia: string | undefined;
  data_zakonczenia: string | undefined;
};

type ExpectedCSVFormatForEmailTemplates = {
  powiadomienie_o_zapisaniu_sie: string | undefined;
  prosba_o_wypelnienie_ankiety: string | undefined;
  przypomnienie_o_wydarzeniu: string | undefined;
};

export type ParsedEventData = {
  name: string;
  descriptionPl: string;
  descriptionEn: string;
  startDate: Dayjs;
  endDate: Dayjs;
  registrationStartDate: Dayjs;
  outsidersAllowed: boolean;
  minutesBetweenSessions: number;
};

export type ParsedSessionData = {
  minutesBeforeSignUpCloses: number;
  name: string;
  descriptionPl: string;
  descriptionEn: string;
  startTime: Dayjs;
  endTime: Dayjs;
  sessionBlock: string;
  maxSeats: number;
  location: AutocompleteOption;
  room: AutocompleteOption;
  speaker: AutocompleteOption;
  sessionType: AutocompleteOption;
};

export type ParseSessionsDataParams = {
  file: File;
  setIsLoading: (val: boolean) => void;
  setResult: (val: ParsedSessionData[]) => void;
  findLocation: (id: string) => Promise<LocationDto | null>;
  findRoom: (id: string) => Promise<RoomDto | null>;
  findSpeaker: (id: string) => Promise<SpeakerDto | null>;
  findSessionType: (id: string) => Promise<SessionTypeDto | null>;
};

export type ParseLoadedSessionParams = {
  data: ExpectedCSVFormatForSessionData;
  findLocation: (id: string) => Promise<LocationDto | null>;
  findRoom: (id: string) => Promise<RoomDto | null>;
  findSpeaker: (id: string) => Promise<SpeakerDto | null>;
  findSessionType: (id: string) => Promise<SessionTypeDto | null>;
};

export const eventDataExample: ExpectedCSVFormatForEventData = {
  nazwa_wydarzenia: "przykladowa nazwa",
  opis_pl: "przykladowy opis pl",
  opis_en: "przykladowy opis en",
  przerwa_pomiedzy_konferencjami: "15",
  data_rozpoczecia: new Date().toISOString(),
  data_zakonczenia: new Date().toISOString(),
  data_rozpoczecia_zapisow: new Date().toISOString(),
  wstep_spoza_politechniki: "1",
};

export const sessionDataExample: ExpectedCSVFormatForSessionData[] = [
  {
    nazwa_konferencji: "przykladowa nazwa",
    opis_pl: "przykladowy opis pl",
    opis_en: "przykladowy opis en",
    typ_konferencji: "przykladowy typ konferencji",
    blok_wydarzenia: "przykladowy blok",
    pomieszczenie: "przykladowe pomieszczenie",
    prelegent: "przykladowy prelegent",
    ilosc_miejsc: "10",
    czas_zakonczenia_zapisow: "10",
    data_rozpoczecia: new Date().toISOString(),
    data_zakonczenia: new Date().toISOString(),
  },
  {
    nazwa_konferencji: "przykladowa nazwa",
    opis_pl: "przykladowy opis pl",
    opis_en: "przykladowy opis en",
    typ_konferencji: "przykladowy typ konferencji",
    blok_wydarzenia: "przykladowy blok",
    pomieszczenie: "przykladowe pomieszczenie",
    prelegent: "przykladowy prelegent",
    ilosc_miejsc: "10",
    czas_zakonczenia_zapisow: "10",
    data_rozpoczecia: new Date().toISOString(),
    data_zakonczenia: new Date().toISOString(),
  },
];

export const emailTemplatesExample: ExpectedCSVFormatForEmailTemplates = {
  powiadomienie_o_zapisaniu_sie: "przykladowa nazwa szablonu",
  prosba_o_wypelnienie_ankiety: "Przykladowa nazwa szablonu",
  przypomnienie_o_wydarzeniu: "przykladowa nazwa szablonu",
};

export function validateFile(file: File): File | undefined {
  if (file.type !== "text/csv") {
    toast.error(
      "Niepoprawny format pliku (akceptowalne są tylko pliku o rozszerzeniu .csv)",
    );
    return;
  }

  return file;
}

export function parseEventData(
  file: File,
  setIsReading: (val: boolean) => void,
  setResult: (data: ParsedEventData) => void,
) {
  setIsReading(true);
  Papaparse.parse<ExpectedCSVFormatForEventData>(file, {
    header: true,
    worker: true,
    complete: function(result) {
      let parsedResult: ParsedEventData = {
        name: result.data[0].nazwa_wydarzenia ?? "",
        descriptionPl: result.data[0].opis_pl ?? "",
        descriptionEn: result.data[0].opis_en ?? "",
        startDate: result.data[0].data_rozpoczecia
          ? dayjs(result.data[0].data_rozpoczecia)
          : dayjs("a"),
        endDate: result.data[0].data_zakonczenia
          ? dayjs(result.data[0].data_zakonczenia)
          : dayjs("a"),
        registrationStartDate: result.data[0].data_rozpoczecia
          ? dayjs(result.data[0].data_rozpoczecia_zapisow)
          : dayjs("a"),
        outsidersAllowed: Boolean(result.data[0].wstep_spoza_politechniki),
        minutesBetweenSessions: Number(
          result.data[0].przerwa_pomiedzy_konferencjami,
        ),
      };
      setResult(parsedResult);
      setIsReading(false);
    },
  });
}

export function parseSessionsData(params: ParseSessionsDataParams) {
  params.setIsLoading(true);
  Papaparse.parse<ExpectedCSVFormatForSessionData>(params.file, {
    header: true,
    worker: true,
    complete: async function(result) {
      const mapped = await Promise.all(
        result.data.map(async function(e) {
          return parseLoadedSession({
            data: e,
            findLocation: params.findLocation,
            findSessionType: params.findSessionType,
            findRoom: params.findRoom,
            findSpeaker: params.findSpeaker,
          });
        }),
      );
      params.setResult(mapped);
      params.setIsLoading(false);
    },
  });
}

export function downloadExampleCSVFile(data: Object[], fileName: string) {
  const result = Papaparse.unparse(data, {
    header: true,
  });

  const blob = new Blob([result], {
    type: "text/csv",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  link.click();

  URL.revokeObjectURL(url);
}

async function parseLoadedSession(
  params: ParseLoadedSessionParams,
): Promise<ParsedSessionData> {
  let result: Partial<ParsedSessionData> = {
    name: params.data.nazwa_konferencji ?? "",
    descriptionPl: params.data.opis_pl ?? "",
    descriptionEn: params.data.opis_en ?? "",
    startTime: params.data.data_rozpoczecia
      ? dayjs(params.data.data_rozpoczecia)
      : dayjs("a"),
    endTime: params.data.data_zakonczenia
      ? dayjs(params.data.data_rozpoczecia)
      : dayjs("a"),
    minutesBeforeSignUpCloses: Number(params.data.czas_zakonczenia_zapisow),
    sessionBlock: params.data.blok_wydarzenia ?? "",
    maxSeats: Number(params.data.ilosc_miejsc),
  };

  const foundValues = await Promise.all([
    params.findRoom(params.data.pomieszczenie ?? ""),
    params.findSpeaker(params.data.prelegent ?? ""),
    params.findSessionType(params.data.typ_konferencji ?? ""),
  ]).then(async function([room, speaker, sessionType]) {
    const location = room ? await params.findLocation(room.locationId) : null;
    return {
      room: room
        ? {
          label: room.roomNumber,
          value: room.id,
        }
        : {
          label: "",
          value: "",
        },
      location: location
        ? {
          label: location.name,
          value: location.id,
        }
        : {
          label: "",
          value: "",
        },
      speaker: speaker
        ? {
          label: `${speaker.speakerTitle?.name} ${speaker.firstName} ${speaker.lastName}`,
          value: speaker.id,
        }
        : {
          label: "",
          value: "",
        },
      sessionType: sessionType
        ? {
          label: sessionType.name,
          value: sessionType.id,
        }
        : {
          label: "",
          value: "",
        },
    };
  });

  result.location = foundValues.location;
  result.room = foundValues.room;
  result.speaker = foundValues.speaker;
  result.sessionType = foundValues.sessionType;

  return result as ParsedSessionData;
}
