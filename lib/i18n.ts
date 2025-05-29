import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { defaultLng, languages } from '@/lib/constants';
import { Resources } from '@/types/i18next';

// Re-export Resources type for convenience
export type { Resources };

// Initialize i18n for client-side
if (typeof window !== 'undefined') {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: defaultLng,
      fallbackLng: defaultLng,
      supportedLngs: languages,
      debug: process.env.NODE_ENV === 'development',

      interpolation: {
        escapeValue: false, // React already does escaping
      },

      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },

      detection: {
        order: ['path', 'localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        lookupFromPathIndex: 0,
      },

      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
