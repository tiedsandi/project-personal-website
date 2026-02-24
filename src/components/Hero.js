"use client";

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero = ({ greeting, name, title, description, stats, photo }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section
      className="grid items-center w-full grid-cols-1 gap-12 px-6 py-20 mx-auto md:grid-cols-2 max-w-7xl"
      aria-label="Intro section"
    >
      {/* Konten Teks */}
      <motion.div
        className="space-y-8 text-center md:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl"
        >
          {greeting} <br className="hidden md:block" />
          <span className="text-gray-900">{name}</span> 👋
        </motion.h1>

        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-xl font-medium text-gray-800">{title}</p>
          <p className="max-w-xl mx-auto text-lg leading-relaxed text-gray-500 md:mx-0">
            {description}
          </p>
        </motion.div>

        {/* Stat chips */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 md:justify-start">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <span className="text-sm font-bold text-gray-900">{s.value}</span>
              <span className="text-sm text-gray-500">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Tombol */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 pt-2 md:justify-start"
        >
          <Link
            href="/project"
            className="px-8 py-3.5 text-white font-medium transition-all bg-gray-900 rounded-full hover:bg-gray-700 hover:shadow-lg hover:-translate-y-0.5"
          >
            Lihat Proyek
          </Link>
        </motion.div>
      </motion.div>

      {/* Foto & Social */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative w-64 h-64 overflow-hidden border-4 border-white rounded-full shadow-2xl">
          <Image
            src={photo}
            alt={`Foto ${name}`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 256px"
            priority
            unoptimized
          />
        </div>

        {/* Icon Sosmed */}
        <div className="flex gap-6 text-2xl text-gray-400">
          <Link
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            aria-label="Email"
            className="transition-colors hover:text-gray-900"
          >
            <FaEnvelope />
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_GITHUB || "https://github.com/tiedsandi"}
            target="_blank"
            aria-label="GitHub"
            className="transition-colors hover:text-gray-900"
          >
            <FaGithub />
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_LINKEDIN || "https://linkedin.com/in/fachransandi"}
            target="_blank"
            aria-label="LinkedIn"
            className="transition-colors hover:text-gray-900"
          >
            <FaLinkedin />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
