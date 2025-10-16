"use client";
import React, { createContext, useContext, useMemo } from "react";
import { getDictionary } from "@/i18n/dictionaries";
import { isSupportedLocale, defaultLocale } from "@/i18n/config";

const I18nContext = createContext({
  locale: defaultLocale,
  t: (key, fallback) => fallback ?? key,
});

function getValueByPath(obj, path) {
  return path.split(".").reduce((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), obj);
}

export function I18nProvider({ locale, children }) {
  const normalizedLocale = isSupportedLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(normalizedLocale);

  const value = useMemo(() => {
    function t(key, fallback) {
      const v = getValueByPath(dict, key);
      if (typeof v === "string") return v;
      return fallback ?? key;
    }
    return { locale: normalizedLocale, t };
  }, [normalizedLocale, dict]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
