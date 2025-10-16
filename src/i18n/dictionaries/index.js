import en from "./en.json";
import id from "./id.json";

export const dictionaries = { en, id };

export function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries.en;
}
