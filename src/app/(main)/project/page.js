"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import Card from "@/components/Card";
import projectList from "@/data/projectList.json";

const Page = () => {
  const projects = projectList.projects;
  const [filterType, setFilterType] = useState("semua");

  const sortProject = [...projects].sort((a, b) => b.id - a.id);

  const filteredProjects =
    filterType === "semua"
      ? sortProject
      : sortProject.filter((project) => project.type === filterType);

  const types = ["semua", "frontend", "backend", "fullstack"];

  const countByType = types.reduce((acc, t) => {
    acc[t] = t === "semua" ? projects.length : projects.filter((p) => p.type === t).length;
    return acc;
  }, {});

  const labelMap = { semua: "Semua", frontend: "Frontend", backend: "Backend", fullstack: "Fullstack" };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex flex-col px-6 py-12 max-w-7xl mx-auto w-full min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-center mb-12 space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Karya & Proyek
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Kumpulan proyek yang pernah saya kerjakan, mulai dari aplikasi web sederhana hingga sistem yang kompleks.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${
                filterType === type
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
              }`}
          >
            {labelMap[type]}
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                filterType === type
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {countByType[type]}
            </span>
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filterType}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="columns-1 sm:columns-2 lg:columns-3 gap-8"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((data) => (
              <motion.div 
                key={data.id} 
                variants={itemVariants}
                layout
                className="break-inside-avoid mb-8"
              >
                <Card data={data} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500"
            >
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-lg font-medium">Tidak ada proyek yang cocok.</p>
              <p className="text-sm mt-1">Coba pilih kategori lain.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
