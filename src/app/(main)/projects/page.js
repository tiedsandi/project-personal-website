"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";

const Page = () => {
  const [filterType, setFilterType] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects =
    filterType === "all"
      ? projects
      : projects.filter((p) => p.type === filterType);

  const types = ["all", "landing page", "web app", "mobile app"];

  const labelMap = {
    all: "Semua",
    "landing page": "Landing Page",
    "web app": "Web App",
    "mobile app": "Mobile App",
  };

  const countByType = types.reduce((acc, t) => {
    acc[t] =
      t === "all"
        ? projects.length
        : projects.filter((p) => p.type === t).length;
    return acc;
  }, {});

  return (
    <div className="flex flex-col w-full min-h-screen pt-[120px] md:pt-[140px]">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="px-6 md:px-12 pb-8 md:pb-12"
      >
        <div className="text-[11px] tracking-[3px] uppercase text-accent mb-4 flex items-center gap-3 before:content-[''] before:flex-none before:w-7 before:h-[1px] before:bg-accent">
          Karya & Proyek
        </div>
        <div className="font-logo text-[clamp(56px,8vw,96px)] leading-[0.9] mb-5">
          SEMUA <span className="text-outline">PROYEK</span>
        </div>
        <p className="text-[14px] text-muted max-w-[480px] leading-[1.7] font-light">
          Kumpulan proyek yang pernah saya kerjakan — dari landing page
          sederhana hingga sistem yang kompleks.
        </p>
      </motion.div>

      {/* ── FILTER ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-0.5 px-6 md:px-12 pb-12"
      >
        {types.map((type) => {
          const isActive = filterType === type;
          return (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2.5 text-[12px] tracking-[1.5px] uppercase font-sans transition-all duration-200 cursor-pointer border flex items-center ${
                isActive
                  ? "bg-accent text-black border-accent"
                  : "bg-transparent text-muted border-border hover:text-white hover:border-white"
              }`}
            >
              {labelMap[type]}
              <span
                className={`inline-block text-[10px] px-1.5 py-0.5 ml-2 ${
                  isActive
                    ? "bg-black/20 text-black"
                    : "bg-[#1f1f1f] text-muted"
                }`}
              >
                {loading ? "-" : countByType[type]}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ── GRID DENGAN LOADING SKELETON ────────────────────────────────── */}
      <div className="px-6 md:px-12 pb-20">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              // SKELETON LOADING
              Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-black aspect-[16/10] flex flex-col items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#0d0d0d] animate-pulse"></div>
                  <div className="relative z-10 w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin mb-4"></div>
                  <div className="relative z-10 text-[9px] text-muted tracking-[2px] uppercase">
                    MEMUAT...
                  </div>
                </motion.div>
              ))
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((data) => (
                <motion.div
                  layout
                  key={data.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black"
                >
                  <Card data={data} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-20 text-center text-muted"
              >
                <div className="font-logo text-[40px] text-border mb-3 leading-none">
                  TIDAK DITEMUKAN
                </div>
                <p className="text-[13px] mt-1 font-light">
                  Coba pilih kategori lain.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
