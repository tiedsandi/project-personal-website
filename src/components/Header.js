"use client";

import React from "react";
import {Link, usePathname} from "@/i18n/navigation";
import {useLocale, useTranslations} from "next-intl";

const Header = () => {
  const locale = useLocale();
  const t = useTranslations('Nav');
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-background text-primary">
      <Link href="/" className="text-2xl font-bold font-logo hover:underline">
        Sandi
      </Link>

      <nav className="flex items-center gap-4">
        <Link href="/project" className="hover:underline">
          {t('projects')}
        </Link>
        <div className="flex items-center gap-1 border rounded-md">
          <Link
            href={pathname}
            locale="en"
            className={`px-2 py-1 text-sm rounded-l-md ${
              locale === "en" ? "bg-primary text-background" : "hover:bg-muted"
            }`}
          >
            EN
          </Link>
          <Link
            href={pathname}
            locale="id"
            className={`px-2 py-1 text-sm rounded-r-md ${
              locale === "id" ? "bg-primary text-background" : "hover:bg-muted"
            }`}
          >
            ID
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
