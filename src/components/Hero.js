"use client";

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslations } from 'next-intl';

import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import ProfileImage from "@/assets/foto-fachran.jpg";

const Hero = () => {
  const t = useTranslations('hero');

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.setAttribute("download", "cv.pdf");
    link.click();
  };

  return (
    <section
      className="grid items-center grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2"
      aria-label="Intro section"
    >
      {/* Konten Teks */}
      <div className="space-y-6 text-center md:text-left">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl text-primary">
          {t('greeting')}
        </h1>
        <p className="text-lg text-gray-700">
          {t('role')}
        </p>
        <p className="max-w-xl mx-auto text-base text-gray-600 md:mx-0">
          {t('description')}
        </p>

        {/* Tombol */}
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          {/* <button
            onClick={handleDownloadCV}
            className="px-5 py-2 text-white transition bg-black rounded-xl hover:bg-gray-800"
          >
            {t('downloadCV')}
          </button> */}

          <Button href="#projects" variant="inverted">
            {t('viewProjects')}
          </Button>
        </div>
      </div>

      {/* Foto & Social */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative overflow-hidden rounded-full shadow-md w-44 h-44">
          <Image
            src={ProfileImage}
            alt="Foto Fachran Sandi"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 176px"
            priority
          />
        </div>

        {/* Icon Sosmed */}
        <div className="flex gap-4 text-2xl text-gray-700">
          <Link
            href="mailto:fachran.sandi@example.com"
            aria-label="Email"
            className="transition hover:text-black"
          >
            <FaEnvelope />
          </Link>
          <Link
            href="https://github.com/tiedsandi"
            target="_blank"
            aria-label="GitHub"
            className="transition hover:text-black"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://linkedin.com/in/fachransandi"
            target="_blank"
            aria-label="LinkedIn"
            className="transition hover:text-black"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
