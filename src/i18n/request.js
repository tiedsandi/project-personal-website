import {getRequestConfig, getLocale} from 'next-intl/server';

export default getRequestConfig(async () => {
  const currentLocale = await getLocale();
  const supportedLocales = ['en', 'id'];
  const resolvedLocale = supportedLocales.includes(currentLocale)
    ? currentLocale
    : 'en';
  const messages = (await import(`../messages/${resolvedLocale}.json`)).default;

  return {
    locale: resolvedLocale,
    messages
  };
});
