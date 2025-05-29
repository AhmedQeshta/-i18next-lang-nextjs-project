import { getTranslation } from '@/lib/i18n-server';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ClientComponent from '@/components/ClientComponent';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('common.welcome')}
            </h1>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {t('home.features.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'ssr', icon: '🖥️' },
              { key: 'clientComponents', icon: '⚛️' },
              { key: 'autoDetection', icon: '🌐' },
              { key: 'staticContent', icon: '📄' },
            ].map((feature) => (
              <div
                key={feature.key}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t(`home.features.${feature.key}` as any)}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Server vs Client Component Demo */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Server Component Demo */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('home.features.ssr')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This content is translated on the server-side and rendered as static HTML.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded border">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                Current locale: {locale}
              </code>
            </div>
          </div>

          {/* Client Component Demo */}
          <ClientComponent />
        </div>

        {/* Navigation Demo */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Navigation Example
          </h3>
          <nav className="flex space-x-4 rtl:space-x-reverse">
            {[
              { key: 'home', href: `/${locale}` },
              { key: 'about', href: `/${locale}/about` },
              { key: 'contact', href: `/${locale}/contact` },
            ].map((nav) => (
              <Link
                key={nav.key}
                href={nav.href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">
                {t(`navigation.${nav.key}` as any)}
              </Link>
            ))}
          </nav>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>Next.js 15 + i18next + TypeScript</p>
            <p className="text-sm mt-2">Server-side rendering with client-side hydration</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
