"use client";

import { useEffect, useState } from "react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
const DAY_LABELS = ["", "Sen", "", "Rab", "", "Jum", ""];

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const LEVEL_BG = [
  "bg-[#161b22]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

export default function GithubSection({ allSkills = [] }) {
  const [gh, setGh] = useState(null);
  const [loading, setLoading] = useState(true);
  // Group skills by category
  const grouped = allSkills.reduce((acc, s) => {
    const cat = s.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});
  const CAT_ORDER = ["frontend", "backend", "database", "mobile", "other"];
  const CAT_LABEL = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    mobile: "Mobile",
    other: "Other",
  };

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => setGh(d && !d.error ? d : null))
      .finally(() => setLoading(false));
  }, []);

  // Build 52-week grid from contributions array, properly aligned by day-of-week
  const weeks = (() => {
    if (!gh?.contributions?.length) return [];
    const all = gh.contributions; // sorted asc [{ date, count, level }]

    // Pad the start so index 0 lands on Sunday (dow=0)
    const firstDow = new Date(all[0].date).getDay(); // 0=Sun..6=Sat
    const padded = [...Array(firstDow).fill({ count: 0, date: null }), ...all];

    const grid = [];
    for (let i = 0; i < padded.length; i += 7) {
      const week = padded.slice(i, i + 7);
      while (week.length < 7) week.push({ count: 0, date: null });
      grid.push(week);
    }

    // Keep last 53 weeks (matches GitHub's ~52-week display)
    return grid.slice(-53);
  })();

  const monthLabels = (() => {
    if (!weeks.length) return [];
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const firstDay = week.find((d) => d?.date);
      if (!firstDay) return;
      const m = new Date(firstDay.date).getMonth();
      if (m !== lastMonth) {
        labels.push({ wi, m });
        lastMonth = m;
      }
    });
    return labels;
  })();

  if (loading) {
    return (
      <section id="tech" className="py-[100px] px-12">
        <div className="section-label">Teknologi</div>
        <div className="section-title">
          APA YANG SAYA{" "}
          <span className="text-outline">KUASAI &amp; PELAJARI</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 bg-[#0d0d0d] border border-[#1e1e1e] animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="tech" className="py-[100px] px-12">
      <div className="section-label">Teknologi</div>
      <div className="section-title">
        APA YANG SAYA{" "}
        <span className="text-outline">KUASAI &amp; PELAJARI</span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* ── LEFT COL ── */}
        <div className="flex flex-col gap-3">
          {/* Languages Used */}
          <GhCard
            title="languages_used"
            badge={gh?.total_repos ? `${gh.total_repos} repos` : ""}
          >
            <div className="flex h-2 gap-[2px] overflow-hidden rounded-sm mb-3.5">
              {(gh?.languages ?? []).map((l) => (
                <div
                  key={l.name}
                  style={{ width: `${l.pct}%`, background: l.color }}
                  className="h-full"
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {(gh?.languages ?? []).map((l) => (
                <div
                  key={l.name}
                  className="flex items-center gap-1.5 font-mono text-[10px] text-[#777]"
                >
                  <div
                    className="flex-shrink-0 w-2 h-2 rounded-full"
                    style={{ background: l.color }}
                  />
                  <span>{l.name}</span>
                  <span className="text-[#444]">{l.pct}%</span>
                </div>
              ))}
            </div>
          </GhCard>

          {/* Pinned Repos */}
          <GhCard title="pinned_repositories">
            <div className="grid grid-cols-2 gap-2">
              {(gh?.pinned ?? []).map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#111] border border-[#1e1e1e] p-3 flex flex-col gap-1.5 hover:border-[#333] transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#555]">⊟</span>
                    <span className="font-mono text-[11px] text-[#4d9fff] truncate flex-1">
                      {r.name}
                    </span>
                    <span className="font-mono text-[9px] text-[#444] border border-[#2a2a2a] px-1.5 py-0.5 rounded-full flex-shrink-0">
                      public
                    </span>
                  </div>
                  <div className="text-[11px] text-[#555] leading-[1.5] line-clamp-2">
                    {r.description}
                  </div>
                  <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#555] mt-auto">
                    <div
                      className="flex-shrink-0 w-2 h-2 rounded-full"
                      style={{ background: r.color }}
                    />
                    <span>{r.language}</span>
                    <span>★ {r.stars}</span>
                  </div>
                </a>
              ))}
            </div>
          </GhCard>
        </div>

        {/* ── RIGHT COL ── */}
        <div className="flex flex-col gap-3">
          {/* Contribution Graph */}
          <GhCard title="contributions" badge="last 12 months">
            <div className="overflow-x-auto">
              {/* Month labels */}
              <div className="flex mb-1 pl-7">
                {weeks.map((_, wi) => {
                  const hit = monthLabels.find((m) => m.wi === wi);
                  return (
                    <div
                      key={wi}
                      className="font-mono text-[9px] text-[#444] flex-1 min-w-[13px]"
                    >
                      {hit ? MONTHS[hit.m] : ""}
                    </div>
                  );
                })}
              </div>
              {/* Grid */}
              <div className="flex gap-[3px]">
                {/* Day labels */}
                <div className="flex flex-col gap-[3px] mr-[2px]">
                  {DAY_LABELS.map((lbl, i) => (
                    <div
                      key={i}
                      className="font-mono text-[9px] text-[#444] h-[10px] leading-[10px] text-right w-[22px]"
                    >
                      {lbl}
                    </div>
                  ))}
                </div>
                {/* Weeks */}
                {weeks.length > 0
                  ? weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {week.map((day, di) => {
                          const lv =
                            day?.level !== undefined
                              ? day.level
                              : getLevel(day?.count ?? 0);
                          return (
                            <div
                              key={di}
                              title={
                                day?.date
                                  ? `${day.date}: ${day.count} contributions`
                                  : ""
                              }
                              className={`w-[10px] h-[10px] rounded-sm ${LEVEL_BG[lv]}`}
                            />
                          );
                        })}
                      </div>
                    ))
                  : // Fallback grid jika contributions tidak ada
                    Array.from({ length: 52 }).map((_, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, di) => (
                          <div
                            key={di}
                            className="w-[10px] h-[10px] rounded-sm bg-[#161b22]"
                          />
                        ))}
                      </div>
                    ))}
              </div>
              {/* Legend */}
              <div className="flex items-center gap-1.5 justify-end mt-2 font-mono text-[9px] text-[#444]">
                <span>Sedikit</span>
                <div className="flex gap-[2px]">
                  {LEVEL_BG.map((bg, i) => (
                    <div
                      key={i}
                      className={`w-[10px] h-[10px] rounded-sm ${bg}`}
                    />
                  ))}
                </div>
                <span>Banyak</span>
              </div>
            </div>
          </GhCard>

          {/* Tech Stack Grid */}
          <GhCard title="tech_stack.json">
            {CAT_ORDER.filter((cat) => grouped[cat]?.length > 0).map((cat) => (
              <div key={cat} className="mb-4 last:mb-0">
                <div className="font-mono text-[9px] text-[#444] tracking-[2px] uppercase mb-2 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-[#1e1e1e]">
                  {CAT_LABEL[cat]}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {grouped[cat].map((s) => (
                    <span
                      key={s.id}
                      className="font-mono text-[10px] px-2.5 py-1 border"
                      style={{
                        borderColor: s.lang_color
                          ? `${s.lang_color}40`
                          : "#2a2a2a",
                        color: s.lang_color || "#777",
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {allSkills.length === 0 && (
              <div className="font-mono text-[11px] text-[#444]">
                Belum ada skill. Tambahkan via Admin → Skills.
              </div>
            )}
          </GhCard>
        </div>
      </div>
    </section>
  );
}

function GhCard({ title, badge, children }) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1e1e1e]">
      <div className="px-4 py-2.5 border-b border-[#1e1e1e] flex items-center justify-between font-mono">
        <span className="text-[11px] text-[#666] tracking-[0.5px]">
          <span className="text-accent mr-1.5">◉</span>
          {title}
        </span>
        {badge && <span className="text-[9px] text-[#444]">{badge}</span>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
