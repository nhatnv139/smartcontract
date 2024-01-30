import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
const isBrowser = typeof window !== 'undefined';
const locale = isBrowser ? localStorage.getItem('locale') || 'en': 'en';
i18next
  .use(HttpApi)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `../public/locale/{{lng}}.json`,
    },
    react: {
      useSuspense: true,
    },
    fallbackLng: 'en',
    preload: ['en'],
    keySeparator: false,
    interpolation: { escapeValue: false },
    lng: locale || 'en',
  });

export default i18next;
