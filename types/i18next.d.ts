import { Resources } from '@/lib/i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: Resources;
  }
}

export type PropsLocaleLayout = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export interface I18nProviderProps {
  locale: string;
  children: React.ReactNode;
}

export type PropsContactPage = {
  params: Promise<{ locale: string }>;
};

export type PropsAboutPage = {
  params: Promise<{ locale: string }>;
};

// Define the resources type for TypeScript
export interface Resources {
  translation: {
    metadata: {
      title: string;
      description: string;
    };
    navigation: {
      home: string;
      about: string;
      contact: string;
    };
    common: {
      welcome: string;
      language: string;
      english: string;
      arabic: string;
      loading: string;
      error: string;
      save: string;
      cancel: string;
      submit: string;
    };
    home: {
      title: string;
      subtitle: string;
      description: string;
      features: {
        title: string;
        ssr: string;
        clientComponents: string;
        autoDetection: string;
        staticContent: string;
      };
    };
    about: {
      title: string;
      content: string;
    };
    contact: {
      title: string;
      content: string;
    };
  };
}
