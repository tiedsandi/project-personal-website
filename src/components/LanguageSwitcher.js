"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales } from "../../i18n";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            locale === lang
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          aria-label={`Switch to ${lang === "en" ? "English" : "Indonesian"}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
