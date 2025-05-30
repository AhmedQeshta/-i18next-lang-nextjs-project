# Next.js 15 i18n Project

A complete internationalization (i18n) setup for Next.js 15 using i18next and react-i18next with App Router support.

## 🌍 Features

- ✅ **Server-side rendering** with i18next
- ✅ **Client-side hydration** with react-i18next
- ✅ **Automatic language detection** from browser
- ✅ **URL-based routing** (`/en/`, `/ar/`, `/fr/`)
- ✅ **Metadata translation** (title, description)
- ✅ **RTL support** for Arabic
- ✅ **TypeScript support** with type safety
- ✅ **Language switcher** component
- ✅ **SEO-friendly** URLs
- ✅ **Multi-language support** (English, Arabic, French)
- ✅ **Docker support** for containerized deployment

## 🚀 Quick Start

### Local Development

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
   - French: http://localhost:3000/fr

### 🐳 Docker Development

1. **Run with Docker Compose (Development):**

   ```bash
   # Using profiles
   docker-compose --profile dev up

   # Or using dedicated dev compose file
   docker-compose -f docker-compose.dev.yml up

   # Build and run in background
   docker-compose -f docker-compose.dev.yml up -d --build
   ```

2. **Run standalone development:**

   ```bash
   docker-compose --profile standalone up
   ```

3. **Access the application:**
   - English: http://localhost:3000/en
   - Arabic: http://localhost:3000/ar
   - French: http://localhost:3000/fr

### 🐳 Docker Production

1. **Build and run production container:**

   ```bash
   # Using Docker Compose
   docker-compose --profile prod up --build

   # Or build Docker image directly
   docker build -t nextjs-i18n .
   docker run -p 3000:3000 nextjs-i18n
   ```

2. **Using Docker commands:**

   ```bash
   # Build the image
   docker build -t nextjs-i18n-app .

   # Run the container
   docker run -d -p 3000:3000 --name nextjs-i18n nextjs-i18n-app

   # View logs
   docker logs nextjs-i18n

   # Stop and remove
   docker stop nextjs-i18n
   docker rm nextjs-i18n
   ```

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
│   ├── i18n-server.ts          # Server-side i18n utilities
│   └── constants.ts            # Language constants
├── public/
│   └── locales/
│       ├── en/
│       │   └── translation.json # English translations
│       ├── ar/
│       │   └── translation.json # Arabic translations
│       └── fr/
│           └── translation.json # French translations
├── types/
│   └── i18next.d.ts            # TypeScript declarations
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose configuration
├── docker-compose.dev.yml      # Development Docker Compose
├── .dockerignore              # Docker ignore file
└── middleware.ts               # Locale detection middleware
```

## 🔧 Configuration

### Supported Languages

Currently configured languages (can be modified in `lib/constants.ts`):

- English (`en`) - Default
- Arabic (`ar`)
- French (`fr`)

### Adding New Languages

1. **Add locale to configuration:**

   ```typescript
   // lib/constants.ts
   export const languages = ['en', 'ar', 'fr', 'es']; // Add 'es' for Spanish
   ```

2. **Create translation file:**

   ```bash
   mkdir public/locales/es
   cp public/locales/en/translation.json public/locales/es/translation.json
   ```

3. **Translate the content** in the new JSON file.

4. **Update LanguageSwitcher component** to include the new language option.

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
    "language": "Language",
    "english": "English",
    "arabic": "Arabic",
    "french": "French"
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

The `LanguageSwitcher` component automatically detects the current locale and provides buttons to switch between all supported languages:

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
- `/fr` → French home page
- `/en/about` → English about page
- `/ar/about` → Arabic about page
- `/fr/about` → French about page

### Automatic Language Detection

The middleware automatically detects the user's preferred language from:

1. URL path (`/en/`, `/ar/`, `/fr/`)
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
.rtl
.rtl/* RTL spacing */;
```

## 🔍 SEO Benefits

- **Server-side rendering**: Content is translated on the server
- **Proper HTML lang attribute**: `<html lang="en">`, `<html lang="ar">`, or `<html lang="fr">`
- **SEO-friendly URLs**: `/en/about`, `/ar/about`, `/fr/about`
- **Translated metadata**: Title and description in each language
- **Static generation**: Pages can be statically generated for each locale

## 🐳 Docker Configuration

### Development

The development setup includes:

- Hot reload support
- Volume mounting for real-time code changes
- Development optimizations
- Debug capabilities

```bash
# Development with hot reload
docker-compose -f docker-compose.dev.yml up

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Production

The production setup includes:

- Multi-stage build optimization
- Minimal image size using Alpine Linux
- Security best practices
- Standalone Next.js output

```bash
# Production build and run
docker-compose --profile prod up --build

# Scale the application
docker-compose --profile prod up --scale nextjs-prod=3
```

### Docker Commands

```bash
# Build development image
docker build --target deps -t nextjs-i18n:dev .

# Build production image
docker build --target runner -t nextjs-i18n:prod .

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production nextjs-i18n:prod

# Inspect the image
docker inspect nextjs-i18n:prod

# Remove all related containers and images
docker-compose down --rmi all
```

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

1. Add the key to all translation files (`en`, `ar`, `fr`)
2. Update the `Resources` interface in `types/i18next.d.ts`
3. Use the new key in your components

## 📦 Dependencies

- `next`: ^15.3.2
- `react`: ^19.0.0
- `i18next`: Latest
- `react-i18next`: Latest
- `i18next-http-backend`: Latest
- `i18next-browser-languagedetector`: Latest

## 🚀 Production Deployment

### Local Production Build

```bash
npm run build
npm start
```

### Docker Production Deployment

```bash
# Build and deploy with Docker
docker build -t nextjs-i18n .
docker run -d -p 3000:3000 --name nextjs-i18n-prod nextjs-i18n

# Or use Docker Compose
docker-compose --profile prod up -d --build
```

### Container Orchestration

For production deployments, consider using:

- **Kubernetes** for container orchestration
- **Docker Swarm** for simpler clustering
- **Cloud services** like AWS ECS, Google Cloud Run, or Azure Container Instances

The application is production-ready with:

- Static generation support
- Optimized bundle sizes
- Server-side rendering
- SEO optimization
- Performance optimizations
- Docker containerization
- Security best practices

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
