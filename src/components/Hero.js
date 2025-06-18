import Image from "next/image";
import ProfileImage from "@/assets/foto-fachran.jpg";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Button from "./Button";

const Hero = () => {
  return (
    <section
      className="grid items-center grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2"
      aria-label="Intro section"
    >
      {/* Konten Teks */}
      <div className="space-y-6 text-center md:text-left">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl text-primary">
          Halo! Saya Fachran Sandi 👋
        </h1>
        <p className="text-lg text-gray-700">
          Fullstack Developer • Laravel • React.js • Next.js • Node.js • REST
          API
        </p>
        <p className="max-w-xl mx-auto text-base text-gray-600 md:mx-0">
          Saya seorang developer yang antusias memecahkan masalah dengan
          teknologi modern.
        </p>

        {/* Tombol */}
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          <Button href="/cv.pdf" download variant="base">
            Download CV
          </Button>

          <Button href="#projects" variant="inverted">
            Lihat Proyek
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
            href="https://github.com/fachransandi"
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
