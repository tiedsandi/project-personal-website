export const locales = ["en", "id"];
export const defaultLocale = "en";

export function isSupportedLocale(locale) {
  return locales.includes(locale);
}
