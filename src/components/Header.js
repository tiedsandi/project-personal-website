"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-background text-primary">
      <Link href="/" className="text-2xl font-bold font-logo hover:underline">
        Sandi
      </Link>
    </header>
  );
};

export default Header;
