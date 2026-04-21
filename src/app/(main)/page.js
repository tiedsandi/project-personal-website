"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import GithubSection from "@/components/GithubSection";
import PageLoader from "@/components/PageLoader";

const BADGE_DISPLAY = {
  open_to_work: "Open to Work",
  open_to_opportunities: "Open to Opportunities",
  employed: "Currently Employed",
  freelancing: "Available for Freelance",
};

export default function HomePage() {
  const [highlights, setHighlights] = useState([]);
  const [marqueeSkills, setMarqueeSkills] = useState([]);
  const [hero, setHero] = useState(null);
  const [cvUrl, setCvUrl] = useState("");
  const [about, setAbout] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  const [ghData, setGhData] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch("/api/projects?highlight=true")
      .then((r) => r.json())
      .then((data) =>
        setHighlights(Array.isArray(data) ? data.slice(0, 4) : []),
      )
      .catch(() => setHighlights([]))
      .finally(() => setProgress((p) => p + 20));

    fetch("/api/skills-marquee?marquee=true")
      .then((r) => r.json())
      .then((data) => setMarqueeSkills(Array.isArray(data) ? data : []))
      .catch(() => setMarqueeSkills([]))
      .finally(() => setProgress((p) => p + 10));

    fetch("/api/hero")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error) setHero(d);
      })
      .catch(() => {})
      .finally(() => setProgress((p) => p + 15));

    fetch("/api/cv")
      .then((r) => r.json())
      .then((d) => {
        if (d?.file_url) setCvUrl(d.file_url);
      })
      .catch(() => {})
      .finally(() => setProgress((p) => p + 10));

    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error) {
          console.log(d === "object" ? JSON.stringify(d) : d);
          setAbout(d);
        }
      })
      .catch(() => {})
      .finally(() => setProgress((p) => p + 20));

    fetch("/api/skills-marquee")
      .then((r) => r.json())
      .then((d) => setAllSkills(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setProgress((p) => p + 10));

    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error) setGhData(d);
      })
      .catch(() => {})
      .finally(() => setProgress((p) => p + 15));
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <PageLoader progress={progress} />
      <section className="relative flex flex-col justify-end min-h-screen px-12 pb-16 overflow-hidden">
        <div className="absolute top-1/2 -left-2 -translate-y-[60%] font-logo text-[clamp(120px,20vw,220px)] text-[rgba(255,255,255,0.03)] pointer-events-none whitespace-nowrap leading-none select-none -z-10">
          FULLSTACK
        </div>
        <div className="inline-flex items-center gap-2 bg-gray border border-border px-3.5 py-1.5 text-[11px] tracking-[2px] uppercase text-accent mb-8 w-fit z-10 relative">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-blink"></div>
          {hero?.badge_text || "FULLSTACK DEVELOPER — INDONESIA"}
        </div>
        <div className="font-logo text-[clamp(64px,10vw,128px)] leading-[0.9] tracking-[1px] mb-10 z-10 relative">
          <div>{hero?.title_line1 || "SAYA SUKA"}</div>
          <div>
            <span className="text-outline">
              {hero?.title_line2 || "MEMBANGUN"}
            </span>
          </div>
          <div>
            <span className="text-accent">
              {hero?.title_line3 || "HAL NYATA."}
            </span>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-12 md:flex-nowrap">
          <div>
            <p className="max-w-[420px] text-muted text-[15px] leading-[1.7] font-light">
              {hero?.description ||
                "Fachran Sandi — Fullstack Developer yang senang memecahkan masalah nyata."}
            </p>
            <div className="flex gap-3 mt-10">
              <button
                className="btn-primary"
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Lihat Proyek
              </button>
              {cvUrl ? (
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  Unduh CV
                </a>
              ) : (
                <button className="btn-outline" disabled>
                  Unduh CV
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-12">
            <div className="text-right">
              <div className="font-logo text-[48px] text-white leading-none">
                {hero?.stat_projects ?? 0}
                <span className="text-accent">+</span>
              </div>
              <div className="text-[11px] text-muted tracking-[1px] uppercase mt-1">
                Proyek
              </div>
            </div>
            <div className="text-right">
              <div className="font-logo text-[48px] text-white leading-none">
                {hero?.stat_years ?? 1}
                <span className="text-accent">+</span>
              </div>
              <div className="text-[11px] text-muted tracking-[1px] uppercase mt-1">
                Tahun Pengalaman
              </div>
            </div>
            <div className="text-right">
              <div className="font-logo text-[48px] text-white leading-none">
                {hero?.stat3_value ?? 5}
              </div>
              <div className="text-[11px] text-muted tracking-[1px] uppercase mt-1">
                {hero?.stat3_label || "Tech Stack"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border py-4.5">
        <div className="flex gap-12 w-max animate-marquee">
          {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-[13px] text-muted tracking-[1px] uppercase">
                {skill.name}
              </span>
              <div className="w-1 h-1 rounded-full bg-accent"></div>
            </div>
          ))}
        </div>
      </div>

      <section id="about" className="py-[100px] px-12">
        <div className="section-label">Tentang</div>
        <div className="section-title">
          <span className="text-outline">SAYA</span>
        </div>
        <div className="grid grid-cols-1 gap-px md:grid-cols-2 bg-border fade-up">
          {/* Left: Profile */}
          <div className="py-10 bg-black px-9">
            {about?.badge_status && (
              <div className="inline-flex items-center gap-1.5 border border-accent/30 px-2.5 py-1 text-[10px] tracking-[1.5px] uppercase text-accent mb-4 w-fit">
                <div className="w-[5px] h-[5px] bg-accent rounded-full animate-blink" />
                {about.badge_status === "custom"
                  ? about.badge_custom
                  : BADGE_DISPLAY[about.badge_status] ||
                    "Open to Opportunities"}
              </div>
            )}
            <div className="font-logo text-[28px] tracking-[1px] mb-2">
              {about?.name || "Fachran Sandi"}
            </div>
            <div
              className="text-[13px] text-muted leading-[1.75] font-light mb-5 [&>strong]:text-white [&>strong]:font-normal"
              dangerouslySetInnerHTML={{ __html: about?.bio || "" }}
            />
            <div className="flex flex-col gap-3">
              {[
                { label: "lokasi", value: about?.info_lokasi },
                { label: "fokus saat ini", value: about?.info_fokus },
                { label: "pengalaman", value: about?.info_pengalaman },
                { label: "terbuka untuk", value: about?.info_terbuka },
              ]
                .filter((r) => r.value)
                .map((row) => (
                  <div
                    key={row.label}
                    className="flex border-b border-[#1e1e1e] pb-3"
                  >
                    <div className="font-mono text-[10px] text-[#555] tracking-[1px] uppercase w-[120px] flex-shrink-0 pt-0.5">
                      {row.label}
                    </div>
                    <div
                      className="text-[13px] text-[#aaa] leading-[1.5] [&_.hi]:text-white [&_.acc]:text-accent"
                      dangerouslySetInnerHTML={{ __html: row.value }}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Right: Journey + Currently Learning */}
          <div className="bg-[#111] py-10 px-9 flex flex-col">
            {about?.journey?.length > 0 && (
              <div className="mb-6">
                <div className="font-mono text-[10px] text-[#555] tracking-[2px] uppercase mb-5">
                  // journey.md
                </div>
                <div className="flex flex-col gap-4">
                  {about.journey.map((item, i) => (
                    <div key={item.id || i} className="flex items-start gap-7">
                      <div className="font-mono text-[10px] text-accent flex-shrink-0 w-9 mt-0.5">
                        {item.year_label}
                      </div>
                      <div className="text-[12px] text-muted leading-[1.6] font-light">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {about?.currently_learning?.length > 0 && (
              <div className="bg-[#111] border border-[#1e1e1e] p-6 mt-6">
                <div className="font-mono text-[9px] text-[#555] tracking-[2px] uppercase mb-3 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-[#1e1e1e]">
                  currently_learning
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {about.currently_learning.map((item) => (
                    <span
                      key={item.id}
                      className="font-mono text-[10px] px-2.5 py-1 border border-accent/20 text-accent/70"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className="m-0 border-t border-border" />

      <section id="work" className="pt-[100px] px-12 pb-[60px]">
        <div className="flex items-end justify-between mb-[60px]">
          <div>
            <div className="section-label">Karya Terpilih</div>
            <div className="section-title !mb-0">
              PROYEK <span className="text-outline">TERBAIK</span>
            </div>
          </div>
          <Link href="/projects" className="inline-block mb-2 btn-outline">
            Semua Proyek →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px md:grid-cols-2 bg-border fade-up">
          {highlights.length > 0
            ? highlights.map((project) => (
                <div key={project.id} className="bg-black">
                  <Card data={project} />
                </div>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-black aspect-[16/10] animate-pulse"
                />
              ))}
        </div>
      </section>

      <hr className="m-0 border-t border-border" />

      <GithubSection allSkills={allSkills} ghData={ghData} />

      <div className="px-12 py-20 text-black bg-accent">
        <div className="text-[11px] tracking-[3px] uppercase text-black/40 mb-5 flex items-center gap-3 before:content-[''] before:flex-none before:w-8 before:h-[1px] before:bg-black/30">
          Mari Ngobrol
        </div>
        <div className="font-logo text-[clamp(48px,7vw,96px)] leading-[0.9] mb-5">
          ADA YANG INGIN
          <br />
          DIDISKUSIKAN?
        </div>
        <p className="text-[15px] text-black/55 max-w-[520px] leading-[1.7] font-light mb-10">
          Terbuka untuk kolaborasi, diskusi proyek, atau sekadar say hello. Saya
          biasanya balas cepat.
        </p>
        <button
          className="bg-black text-accent border-none px-10 py-4 font-sans text-sm font-medium tracking-[0.5px] cursor-pointer transition-opacity hover:opacity-85"
          onClick={() =>
            document.getElementById("contact-modal-trigger")?.click()
          }
        >
          Hubungi Saya →
        </button>
        {/* Hidden trigger for layout contact modal */}
        <button
          id="contact-modal-trigger"
          className="hidden"
          onClick={() => {
            const evt = new KeyboardEvent("keydown", {
              key: "i-want-to-open-modal-from-page-but-cant-easily-do-it",
            });
            // Note: in a real Next.js app we might use context or just a global state to trigger the modal
            // Since the modal is in layout.js, we can trigger the Hubungi Saya button in the nav:
            document.querySelector(".nav-cta")?.click();
          }}
        ></button>
      </div>
    </>
  );
}
