import Papaparse from "papaparse";

export enum ParsingErrors {
  MissingQuotes = "Brakujący cudzysłow",
  UndetectableDelimeter = "Niespodziewany przecinek",
  TooFewFields = "Wiersz zawiera zbyt mało pól",
  TooManyFields = "Wiersz zawiera zbyt dużo pól",
}

export default function buildErrorMessage(err: Papaparse.ParseError) {
  return `Wystąpił błąd w trakcie analizy pliku w wierszu ${
    (err.row as number) + 1
  }\nPowód: ${ParsingErrors[err.code as keyof typeof ParsingErrors]}`;
}
