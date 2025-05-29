import { getTranslation } from '@/lib/i18n-server';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';
import { PropsContactPage } from '@/types/i18next';

export default async function ContactPage({ params }: PropsContactPage) {
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
            {t('contact.title')}
          </h1>

          <div className="mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{t('contact.content')}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Contact Information
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>📧 contact@example.com</p>
                  <p>📞 +1 (555) 123-4567</p>
                  <p>📍 123 Main St, City, Country</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
              i18n Implementation Note
            </h3>
            <p className="text-blue-800 dark:text-blue-200">
              This page demonstrates how to implement internationalization in Next.js 15 with the
              App Router. The content is server-side rendered with proper SEO and accessible to
              search engines in multiple languages.
            </p>
          </div>

          <div className="mt-8 flex space-x-4 rtl:space-x-reverse">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              ← {t('navigation.home')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
              {t('navigation.about')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
