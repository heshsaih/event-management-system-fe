import pl from "../i18/translations/pl";

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: "pl";
    resources: {
      pl: typeof pl
    }
  }
}
