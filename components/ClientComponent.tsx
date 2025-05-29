'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function ClientComponent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('home.features.clientComponents')}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        This is a client component demonstrating client-side translation.
      </p>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm text-gray-500">Status:</span>
          <span className="text-sm font-medium">{isLoading ? t('common.loading') : 'Ready'}</span>
        </div>

        <div className="flex space-x-2 rtl:space-x-reverse">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {t('common.submit')}
          </button>

          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            {t('common.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
