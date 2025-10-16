"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

const Header = () => {
  const pathname = usePathname();
  const { locale } = useI18n();

  // Replace leading /{locale} with target locale
  function getPathForLocale(targetLocale) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    if (locales.includes(segments[0])) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    return `/${segments.join("/")}`;
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-background text-primary">
      <Link href={getPathForLocale(locale)} className="text-2xl font-bold hover:underline">
        Sandi
      </Link>
      <nav className="flex items-center gap-3">
        {locales.map((l) => (
          <Link
            key={l}
            href={getPathForLocale(l)}
            className={`px-2 py-1 rounded ${l === locale ? "bg-primary text-background" : "hover:underline"}`}
            prefetch={false}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
