import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import pl from "./translations/pl";

i18next.use(initReactI18next).init({
  resources: {
    pl: {
      translation: pl,
    },
  },
  lng: new Intl.Locale(navigator.language).language,
  fallbackLng: "pl",
});
