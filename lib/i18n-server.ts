import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { defaultLng, languages } from '@/lib/constants';
import { Resources } from '@/lib/i18n';
import fs from 'fs';
import path from 'path';

// Function to get translation resources
async function getTranslationResources(lng: string) {
  const translationPath = path.join(process.cwd(), 'public', 'locales', lng, 'translation.json');

  try {
    const translationFile = fs.readFileSync(translationPath, 'utf8');
    return JSON.parse(translationFile);
  } catch (error) {
    console.error(`Error loading translation for ${lng}:`, error);
    return {};
  }
}

// Create i18n instance for server-side
async function initI18next(lng: string, ns: string = 'translation') {
  const i18nInstance = createInstance();
  const resources = await getTranslationResources(lng);

  await i18nInstance.use(initReactI18next).init({
    lng,
    fallbackLng: defaultLng,
    supportedLngs: languages,
    resources: {
      [lng]: {
        [ns]: resources,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return i18nInstance;
}

// Simplified translation function type
type TranslationFunction = (key: string) => string;

// Get translation function for server components
export async function getTranslation(lng: string, ns: string = 'translation') {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng) as TranslationFunction,
    i18n: i18nextInstance,
  };
}

// Utility to check if a locale is supported
export function isValidLocale(locale: string): boolean {
  return languages.includes(locale);
}

// Get the locale from request or use default
export function getLocaleFromPath(pathname: string): string {
  const locale = pathname.split('/')[1];
  return isValidLocale(locale) ? locale : defaultLng;
}
