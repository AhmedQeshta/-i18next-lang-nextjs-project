'use client';

import { useEffect } from 'react';
import i18n from '@/lib/i18n';
import { I18nProviderProps } from '@/types/i18next';

export default function I18nProvider({ locale, children }: I18nProviderProps) {
  useEffect(() => {
    // Change language when locale prop changes
    i18n.changeLanguage(locale);
  }, [locale]);

  return <>{children}</>;
}
