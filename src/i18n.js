import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Check if a language is already stored
const savedLanguage = localStorage.getItem("i18nextLng");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "nl"],
    lng: savedLanguage || "nl",
    fallbackLng: "nl",
    debug: false,

    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },

    detection: {
      order: ["localStorage", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
