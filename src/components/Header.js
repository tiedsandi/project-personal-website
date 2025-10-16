"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("header");

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-background text-primary">
      <Link href="/" className="text-2xl font-bold font-logo hover:underline">
        {t("logo")}
      </Link>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
