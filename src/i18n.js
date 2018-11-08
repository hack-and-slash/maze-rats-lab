import i18n from 'i18next';
import { initReactI18n } from 'react-i18next/hooks';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Resources } from './translations'

i18n
  .use(LanguageDetector)
  .use(initReactI18n)
  .init({
    debug: true,
    whitelist: ['en', 'pt-BR'],
    fallbackLng: 'en',
    resources: Resources,
    interpolation: {
      escapeValue: false,
    },
    appendNamespaceToMissingKey: false,
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'i18nextLang',
    },
  });

export default i18n;