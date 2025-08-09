import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'am'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};