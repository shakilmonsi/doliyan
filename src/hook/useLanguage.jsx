import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";

// Import JSON translations
import en from "../assets/locales/en.json";
// Import JSON translations
import nl from "../assets/locales/nl.json";

let i18nInitialized = false;

const initI18n = () => {
  if (i18nInitialized) return;

  const hasLanguageInStorage = localStorage.getItem("i18nextLng");

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        nl: { translation: nl },
        en: { translation: en },
      },
      lng: hasLanguageInStorage ? undefined : "nl",
      fallbackLng: "nl",
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "cookie", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
    });

  // If there's no language saved, set Dutch explicitly
  if (!hasLanguageInStorage) {
    i18n.changeLanguage("nl");
  }

  i18nInitialized = true;
};

export const useLanguage = () => {
  const [language, setLanguage] = useState("nl");
  const [t, setT] = useState(() => (key) => key);

  useEffect(() => {
    initI18n();

    const onLanguageChanged = (lng) => {
      setLanguage(lng);
      setT(
        () =>
          (key, options = {}) =>
            i18n.t(key, options),
      ); // ✅ Allow options
    };

    i18n.on("languageChanged", onLanguageChanged);
    onLanguageChanged(i18n.language);

    return () => i18n.off("languageChanged", onLanguageChanged);
  }, []);

  const switchLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return { language, switchLanguage, t };
};
