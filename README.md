# Next.js 15 i18n Project

A complete internationalization (i18n) setup for Next.js 15 using i18next and react-i18next with App Router support.

## 🌍 Features

- ✅ **Server-side rendering** with i18next
- ✅ **Client-side hydration** with react-i18next
- ✅ **Automatic language detection** from browser
- ✅ **URL-based routing** (`/en/`, `/ar/`)
- ✅ **Metadata translation** (title, description)
- ✅ **RTL support** for Arabic
- ✅ **TypeScript support** with type safety
- ✅ **Language switcher** component
- ✅ **SEO-friendly** URLs

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - English: http://localhost:3000/en
   - Arabic: http://localhost:3000/ar

## 📁 Project Structure

```
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale-specific layout
│   │   ├── page.tsx            # Home page
│   │   ├── about/
│   │   │   └── page.tsx        # About page
│   │   └── contact/
│   │       └── page.tsx        # Contact page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── I18nProvider.tsx        # Client-side i18n provider
│   ├── LanguageSwitcher.tsx    # Language switcher component
│   └── ClientComponent.tsx     # Example client component
├── lib/
│   ├── i18n.ts                 # Client-side i18n config
│   └── i18n-server.ts          # Server-side i18n utilities
├── public/
│   └── locales/
│       ├── en/
│       │   └── translation.json # English translations
│       └── ar/
│           └── translation.json # Arabic translations
├── types/
│   └── i18next.d.ts            # TypeScript declarations
└── middleware.ts               # Locale detection middleware
```

## 🔧 Configuration

### Supported Languages

Currently configured languages (can be modified in `lib/i18n.ts`):

- English (`en`) - Default
- Arabic (`ar`)

### Adding New Languages

1. **Add locale to configuration:**

   ```typescript
   // lib/i18n.ts
   export const languages = ['en', 'ar', 'fr']; // Add 'fr' for French
   ```

2. **Create translation file:**

   ```bash
   mkdir public/locales/fr
   cp public/locales/en/translation.json public/locales/fr/translation.json
   ```

3. **Translate the content** in the new JSON file.

### Translation Files

Translation files are located in `public/locales/{locale}/translation.json`:

```json
{
  "metadata": {
    "title": "Page Title",
    "description": "Page Description"
  },
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "common": {
    "welcome": "Welcome",
    "language": "Language"
  }
}
```

## 💻 Usage Examples

### Server Components

```typescript
import { getTranslation } from '../../lib/i18n-server';

export default async function ServerComponent({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale);

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
}
```

### Client Components

```typescript
'use client';
import { useTranslation } from 'react-i18next';

export default function ClientComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <button>{t('common.submit')}</button>
    </div>
  );
}
```

### Metadata Translation

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale);

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}
```

### Language Switcher

The `LanguageSwitcher` component automatically detects the current locale and provides buttons to switch languages:

```typescript
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <LanguageSwitcher />
      </header>
      {children}
    </div>
  );
}
```

## 🌐 Routing

The application uses Next.js 15 App Router with dynamic segments:

- `/` → Redirects to `/en` (default locale)
- `/en` → English home page
- `/ar` → Arabic home page
- `/en/about` → English about page
- `/ar/about` → Arabic about page

### Automatic Language Detection

The middleware automatically detects the user's preferred language from:

1. URL path (`/en/`, `/ar/`)
2. `Accept-Language` header
3. Falls back to default language (`en`)

## 🎨 RTL Support

Arabic language automatically enables RTL (Right-to-Left) layout:

```typescript
const direction = locale === 'ar' ? 'rtl' : 'ltr';

return (
  <html lang={locale} dir={direction}>
    {/* Content */}
  </html>
);
```

CSS classes with RTL support:

```css
.space-x-4/* Normal spacing */
.rtl: space-x-reverse;
.rtl/* RTL spacing */;
```

## 🔍 SEO Benefits

- **Server-side rendering**: Content is translated on the server
- **Proper HTML lang attribute**: `<html lang="en">` or `<html lang="ar">`
- **SEO-friendly URLs**: `/en/about`, `/ar/about`
- **Translated metadata**: Title and description in each language
- **Static generation**: Pages can be statically generated for each locale

## 🛠️ Development

### Type Safety

The project includes TypeScript declarations for i18next to provide autocomplete and type checking for translation keys:

```typescript
// types/i18next.d.ts
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: Resources;
  }
}
```

### Adding New Translation Keys

1. Add the key to both translation files
2. Update the `Resources` interface in `lib/i18n.ts`
3. Use the new key in your components

## 📦 Dependencies

- `next`: ^15.3.2
- `react`: ^19.0.0
- `i18next`: Latest
- `react-i18next`: Latest
- `i18next-http-backend`: Latest
- `i18next-browser-languagedetector`: Latest

## 🚀 Production Deployment

The application is production-ready with:

- Static generation support
- Optimized bundle sizes
- Server-side rendering
- SEO optimization
- Performance optimizations

Build the application:

```bash
npm run build
npm start
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
