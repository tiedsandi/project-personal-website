"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ data }) => {
  const {
    name,
    company,
    imgName,
    img_url,
    gifProject,
    gif_url,
    isShowGif,
    is_show_gif,
    is_show_image,
    card_color,
    date,
    linkGithub,
    link_github,
    linkDemo,
    link_demo,
    description,
    tags,
    fitur,
    type,
  } = data;
  const [isHovered, setIsHovered] = useState(false);

  const resolvedImg = img_url || imgName || "";
  const resolvedGif = gif_url || gifProject || "";
  const resolvedIsShowGif = is_show_gif ?? isShowGif ?? false;
  const resolvedIsShowImage = is_show_image ?? true;
  const rawLinkGithub = link_github || linkGithub || "";
  const rawLinkDemo = link_demo || linkDemo || "";
  const resolvedLinkGithub =
    rawLinkGithub && !/^https?:\/\//i.test(rawLinkGithub)
      ? `https://${rawLinkGithub}`
      : rawLinkGithub;
  const resolvedLinkDemo =
    rawLinkDemo && !/^https?:\/\//i.test(rawLinkDemo)
      ? `https://${rawLinkDemo}`
      : rawLinkDemo;
  const resolvedCardColor = card_color || "#1a1a2e";

  const imgSrc = resolvedImg.startsWith("http")
    ? resolvedImg
    : `/images/demo/${resolvedImg}`;
  const gifSrc = resolvedGif
    ? resolvedGif.startsWith("http")
      ? resolvedGif
      : `/images/demo/${resolvedGif}`
    : null;
  const modalImgSrc = resolvedIsShowGif && gifSrc ? gifSrc : imgSrc;

  const typeLabelMap = {
    "landing page": "Landing Page",
    "web app": "Web App",
    "mobile app": "Mobile App",
  };

  const typeColorMap = {
    "landing page":
      "bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.15)]",
    "mobile app":
      "bg-[rgba(255,77,77,0.1)] text-[#ff7a7a] border border-[rgba(255,77,77,0.25)]",
    "web app":
      "bg-[rgba(232,255,71,0.12)] text-accent border border-[rgba(232,255,71,0.3)]",
  };

  return (
    <Dialog>
      {/* ── Trigger Card ─────────────────────────────────── */}
      <DialogTrigger className="w-full text-left outline-none group">
        <div className="relative flex flex-col gap-0 p-0 overflow-hidden transition-colors bg-black border border-transparent hover:bg-gray">
          {/* Image / Color wrapper */}
          <div
            className="relative w-full overflow-hidden cursor-pointer aspect-[16/10]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={
              !resolvedIsShowImage
                ? { background: resolvedCardColor }
                : { background: "#000" }
            }
          >
            {/* Noise texture overlay for color mode */}
            {!resolvedIsShowImage && (
              <div
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "128px",
                }}
              />
            )}

            {/* Project name centered — color mode only */}
            {!resolvedIsShowImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-logo text-[clamp(20px,3vw,36px)] tracking-[4px] uppercase text-white/15 text-center px-6 leading-tight opacity-30">
                  {name}
                </span>
              </div>
            )}

            {/* Static image — only when is_show_image = true */}
            {resolvedIsShowImage && (
              <Image
                priority
                src={imgSrc}
                alt={name}
                width={600}
                height={400}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover w-full h-full opacity-45 mix-blend-normal transition-all duration-400 group-hover:scale-[1.04] group-hover:brightness-40 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
              />
            )}

            {/* GIF overlay — only when showing image and gifSrc exists */}
            {resolvedIsShowImage && gifSrc && (
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: isHovered ? 1 : 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gifSrc}
                  alt={`${name} preview`}
                  className="object-cover w-full h-full opacity-60"
                  loading="lazy"
                />
              </div>
            )}

            {/* GIF play icon / View project icon */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="flex items-center justify-center w-12 h-12 text-white transition-transform duration-300 border border-white rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Content overlay inside image (matching proj-info in HTML) */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col p-6 bg-gradient-to-t from-black/95 to-transparent">
              <div className="text-[9px] tracking-[2px] uppercase text-accent mb-1">
                {typeLabelMap[type] || type}
              </div>
              <div className="font-logo text-[22px] tracking-[0.5px] mb-2">
                {name}
              </div>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)] px-[7px] py-[2px] tracking-[0.3px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* ── Modal ────────────────────────────────────────── */}
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[800px] p-0 overflow-hidden border border-border shadow-2xl bg-gray">
        <AnimatePresence mode="wait">
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col bg-gray"
            style={{ maxHeight: "90vh" }}
          >
            {/* Modal Hero */}
            <div className="h-[240px] flex items-center justify-center relative bg-black">
              {resolvedIsShowGif && gifSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={modalImgSrc}
                  alt={name}
                  className="absolute inset-0 object-cover w-full h-full opacity-30 mix-blend-luminosity filter blur-sm"
                />
              ) : (
                <Image
                  src={modalImgSrc}
                  alt={name}
                  fill
                  className="object-cover opacity-30 mix-blend-luminosity filter blur-sm"
                />
              )}
              <div className="font-logo text-[72px] text-[rgba(255,255,255,0.06)] tracking-[4px] relative z-10 leading-none text-center px-4 uppercase">
                {name}
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-9">
              <div className="flex items-start justify-between gap-5 pb-6 border-b mb-7 border-border">
                <div>
                  <DialogTitle className="font-logo text-[42px] tracking-[1px] leading-[0.95]">
                    {name}
                  </DialogTitle>
                  <p className="text-[11px] text-muted mt-1.5 tracking-[0.5px]">
                    {date || "Personal Project"}
                  </p>
                </div>
                {type && (
                  <div
                    className={`text-[10px] tracking-[1px] uppercase px-2.5 py-1 ${typeColorMap[type] || "bg-white/10 text-white"}`}
                  >
                    {typeLabelMap[type] || type}
                  </div>
                )}
              </div>

              <div className="mb-7">
                <div className="text-[10px] tracking-[2px] uppercase text-accent mb-4 flex items-center flex-row gap-3 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">
                  Tentang Proyek
                </div>
                <DialogDescription asChild>
                  <div className="text-[14px] text-[#aaa] leading-[1.75] font-light">
                    {description}
                  </div>
                </DialogDescription>
              </div>

              <div className="mb-7">
                <div className="text-[10px] tracking-[2px] uppercase text-accent mb-4 flex items-center flex-row gap-3 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">
                  Teknologi Utama
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-[rgba(255,255,255,0.06)] text-[#ccc] border border-[rgba(255,255,255,0.1)] px-2.5 py-1 tracking-[0.5px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {fitur && fitur.length > 0 && (
                <div className="mb-7">
                  <div className="text-[10px] tracking-[2px] uppercase text-accent mb-4 flex items-center flex-row gap-3 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">
                    Fitur Utama
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {fitur.map((f, i) => (
                      <div key={i} className="flex gap-3.5 items-start">
                        <div className="font-logo text-[18px] text-[rgba(255,255,255,0.15)] leading-none mt-0.5">
                          0{i + 1}
                        </div>
                        <div className="text-[13px] text-[#aaa] leading-[1.6] font-light">
                          {f}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2.5 mt-8 border-t border-border pt-6">
                {resolvedLinkDemo && resolvedLinkDemo !== "#" && (
                  <a
                    href={resolvedLinkDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-accent text-black border-none px-6 py-3 font-sans text-[13px] font-medium tracking-[0.5px] cursor-pointer transition-opacity hover:opacity-85 no-underline flex items-center gap-2"
                  >
                    Live Demo ↗
                  </a>
                )}
                {resolvedLinkGithub && resolvedLinkGithub !== "#" && (
                  <a
                    href={resolvedLinkGithub}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-transparent text-white border border-border px-6 py-3 font-sans text-[13px] tracking-[0.5px] cursor-pointer transition-colors hover:border-white no-underline flex items-center gap-2"
                  >
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
