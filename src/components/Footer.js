"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 text-center lg:my-2">
      {t("copyright", { year: currentYear })}
      <br />
      <br />
      <Link
        href="https://www.linkedin.com/in/fachransandi/"
        className="mr-4 hover:underline"
      >
        <i className="fab fa-linkedin"></i> {t("linkedin")}
      </Link>
      <Link
        href="https://github.com/tiedSandi"
        className="mr-4 hover:underline"
      >
        <i className="fab fa-github"></i> {t("github")}
      </Link>
    </footer>
  );
};

export default Footer;
