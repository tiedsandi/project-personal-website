"use client";

import React from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from 'next-intl';

const Header = () => {
  const locale = useLocale();

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-background text-primary">
      <Link href={`/${locale}`} className="text-2xl font-bold font-logo hover:underline">
        Sandi
      </Link>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
