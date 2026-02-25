"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ data }) => {
  const { name, company, imgName, gifProject, isShowGif, date, linkGithub, linkDemo, description, tags, fitur, type } = data;
  const [isHovered, setIsHovered] = useState(false);

  const imgSrc = imgName.startsWith("http") ? imgName : `/images/demo/${imgName}`;
  const gifSrc = gifProject
    ? gifProject.startsWith("http")
      ? gifProject
      : `/images/demo/${gifProject}`
    : null;
  const modalImgSrc = isShowGif && gifSrc ? gifSrc : imgSrc;

  const typeLabelMap = {
    frontend: "Frontend",
    backend: "Backend",
    fullstack: "Fullstack",
  };

  const typeColorMap = {
    frontend: "bg-white/90 text-gray-700",
    backend: "bg-gray-900/90 text-white",
    fullstack: "bg-gray-600/90 text-white",
  };

  return (
    <Dialog>
      {/* ── Trigger Card ─────────────────────────────────── */}
      <DialogTrigger className="w-full text-left outline-none group">
        <div className="flex flex-col gap-4">

          {/* Image / GIF wrapper */}
          <div
            className="relative w-full overflow-hidden bg-gray-100 rounded-2xl cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Static image */}
            <Image
              priority
              src={imgSrc}
              alt={name}
              width={600}
              height={400}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />

            {/* GIF overlay — fades in on hover */}
            {gifSrc && (
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: isHovered ? 1 : 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gifSrc}
                  alt={`${name} preview`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            )}

            <div className="absolute inset-0 transition-opacity duration-300 bg-black/0 group-hover:bg-black/10 pointer-events-none" />

            {/* Type badge — always visible, bottom-left */}
            {type && (
              <div className="absolute bottom-3 left-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${typeColorMap[type] ?? "bg-white/90 text-gray-700"}`}>
                  {typeLabelMap[type] ?? type}
                </span>
              </div>
            )}

            {/* GIF play icon — always visible when gif exists, top-left */}
            {gifSrc && (
              <div className="absolute top-3 left-3">
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white bg-black/50 rounded-full backdrop-blur-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  GIF
                </span>
              </div>
            )}

            {/* Animated "Preview" badge — replaces GIF badge on hover */}
            {gifSrc && (
              <div
                className="absolute top-3 left-3 transition-all duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "scale(1)" : "scale(0.85)",
                }}
              >
                <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-white bg-black/80 rounded-full backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Live Preview
                </span>
              </div>
            )}
          </div>

          {/* Card text */}
          <div className="space-y-2 px-1 pb-2">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-base font-bold text-gray-900 transition-colors group-hover:text-gray-500 leading-snug">
                {name}
              </h4>
              {company && (
                <span className="shrink-0 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full mt-0.5 whitespace-nowrap">
                  {company}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* ── Modal ────────────────────────────────────────── */}
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[860px] p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col md:flex-row bg-white"
            style={{ maxHeight: "90vh" }}
          >
            {/* ── Left: image pane ──────────────────────── */}
            <div className="relative w-full md:w-[42%] shrink-0 bg-gray-900">
              <div className="relative w-full" style={{ minHeight: "280px", aspectRatio: "3/4" }}>
                {isShowGif && gifSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={modalImgSrc}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <Image
                    src={modalImgSrc}
                    alt={name}
                    fill
                    className="object-cover opacity-90"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
                    {company || "Personal Project"}
                  </p>
                  <h2 className="text-2xl font-extrabold leading-tight">{name}</h2>
                  <p className="text-sm text-white/60 mt-1">{date}</p>
                </div>
              </div>
            </div>

            {/* ── Right: scrollable content ──────────────── */}
            <div className="flex flex-col gap-6 p-6 sm:p-8 flex-1 overflow-y-auto">
              <DialogHeader className="hidden">
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Tentang Proyek
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Teknologi
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-gray-700 bg-gray-100 border-0 hover:bg-gray-200 font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {fitur && fitur.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Fitur Utama
                  </p>
                  <ul className="space-y-2.5">
                    {fitur.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-500 font-bold text-xs">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(linkGithub || linkDemo) && (
                <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
                  {linkDemo && (
                    <Link
                      href={linkDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-2xl hover:bg-blue-500 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Live Demo
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  )}
                  {linkGithub && (
                    <Link
                      href={linkGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-6 py-3.5 text-sm font-semibold text-white bg-gray-900 rounded-2xl hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Lihat Source Code di GitHub
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
