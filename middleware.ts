import { NextRequest, NextResponse } from 'next/server';
import { languages, defaultLng } from './lib/constants';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // If the pathname is missing a locale, we need to redirect or rewrite
  if (pathnameIsMissingLocale) {
    // Get the locale from the request headers (Accept-Language)
    const locale = getLocale(request) || defaultLng;

    // Rewrite the URL to include the locale
    return NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url));
  }

  // If there's a locale but it's not supported, redirect to default
  const locale = pathname.split('/')[1];
  if (locale && !languages.includes(locale)) {
    return NextResponse.redirect(
      new URL(`/${defaultLng}${pathname.slice(locale.length + 1)}`, request.url),
    );
  }
}

function getLocale(request: NextRequest): string {
  // Get language from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    // Parse the Accept-Language header
    const preferredLanguages = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim())
      .map((lang) => lang.split('-')[0]); // Get primary language code

    // Find the first supported language
    for (const lang of preferredLanguages) {
      if (languages.includes(lang)) {
        return lang;
      }
    }
  }

  return defaultLng;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` and other static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|locales|.*\\..*|_next).*)'],
};
