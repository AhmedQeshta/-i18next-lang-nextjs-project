import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getTranslation } from '@/lib/i18n-server';
import { languages } from '@/lib/constants';
import I18nProvider from '@/components/I18nProvider';
import { PropsLocaleLayout } from '@/types/i18next';

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PropsLocaleLayout): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale);

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export default async function LocaleLayout({ children, params }: PropsLocaleLayout) {
  const { locale } = await params;

  // Validate that the locale is supported
  if (!languages.includes(locale)) {
    notFound();
  }

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body>
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
