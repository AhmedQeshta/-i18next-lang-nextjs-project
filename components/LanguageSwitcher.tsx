'use client';

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/lib/constants';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = i18n.language;

  const switchLanguage = (locale: string) => {
    // Change the language in i18next
    i18n.changeLanguage(locale);

    // Navigate to the new locale path
    const segments = pathname.split('/');
    segments[1] = locale; // Replace the locale segment
    const newPath = segments.join('/');

    router.push(newPath);
  };

  const getLanguageLabel = (locale: string) => {
    switch (locale) {
      case 'en':
        return t('common.english' as any);
      case 'ar':
        return t('common.arabic' as any);
      case 'fr':
        return t('common.french' as any);
      default:
        return locale;
    }
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('common.language')}:
      </span>
      <div className="flex space-x-1 rtl:space-x-reverse">
        {languages.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentLocale === locale
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}>
            {getLanguageLabel(locale)}
          </button>
        ))}
      </div>
    </div>
  );
}
