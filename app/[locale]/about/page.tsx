import { getTranslation } from '@/lib/i18n-server';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';
import { PropsAboutPage } from '@/types/i18next';

export default async function AboutPage({ params }: PropsAboutPage) {
  const { locale } = await params;
  const { t } = await getTranslation(locale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              href={`/${locale}`}
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              {t('common.welcome')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t('about.title')}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{t('about.content')}</p>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This page demonstrates server-side rendering with internationalization. The content is
              translated on the server and delivered as static HTML.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded border">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Technical Details:
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Server-side translated content</li>
                <li>SEO-friendly URLs with locale prefix</li>
                <li>Automatic language detection</li>
                <li>RTL support for Arabic</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              ← {t('navigation.home')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
