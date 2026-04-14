import Link from "next/link";
import projectsData from "@/data/projectList.json";

const menuCards = [
  {
    href: "/admin/projects",
    label: "Projects",
    desc: "Kelola daftar proyek yang tampil di website.",
    icon: "◫",
    stat: `${projectsData.length} proyek`,
    accent: false,
  },
  {
    href: "/admin/journey",
    label: "Journey",
    desc: "Kelola timeline perjalanan karir yang tampil di About.",
    icon: "↝",
    stat: "pf_journey",
    accent: false,
  },
  {
    href: "/admin/about",
    label: "About",
    desc: "Ubah profil, perjalanan, dan teknologi yang sedang dipelajari.",
    icon: "◉",
    stat: "1 entri",
    accent: false,
  },
  {
    href: "/admin/hero",
    label: "Hero",
    desc: "Ubah teks dan stats yang tampil di halaman utama.",
    icon: "✦",
    stat: "1 entri",
    accent: false,
  },
  {
    href: "/admin/skills",
    label: "Skills & Marquee",
    desc: "Atur daftar teknologi dan animasi marquee.",
    icon: "⬡",
    stat: "Tersambung",
    accent: false,
  },
  {
    href: "/admin/cv",
    label: "CV / Resume",
    desc: "Upload file PDF CV terbaru kamu.",
    icon: "↓",
    stat: "Tersambung",
    accent: false,
  },
];

export default function DashboardPage() {
  const highlight = projectsData.filter((p) => p.isHighlight).length;

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[11px] tracking-[2px] uppercase text-accent mb-2">
          Admin Panel
        </div>
        <div className="font-logo text-[42px] tracking-[1px] leading-none text-white">
          DASHBOARD
        </div>
        <p className="text-[13px] text-muted mt-2 font-light">
          Selamat datang kembali. Pilih bagian yang ingin kamu kelola.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-10">
        {[
          { label: "Total Proyek", value: projectsData.length },
          { label: "Highlight di Home", value: highlight },
          {
            label: "Web App",
            value: projectsData.filter((p) => p.type === "web app").length,
          },
          {
            label: "Mobile App",
            value: projectsData.filter((p) => p.type === "mobile app").length,
          },
        ].map((s) => (
          <div key={s.label} className="bg-black px-6 py-5">
            <div className="font-logo text-[36px] text-white leading-none">
              {s.value}
            </div>
            <div className="text-[10px] tracking-[1px] uppercase text-muted mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Menu cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {menuCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-black hover:bg-[#0d0d0d] transition-colors p-7 group border-transparent block"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-[28px] leading-none text-muted group-hover:text-accent transition-colors">
                {card.icon}
              </span>
              <span className="text-[10px] tracking-[1px] uppercase text-muted bg-[#111] px-2.5 py-1 border border-border">
                {card.stat}
              </span>
            </div>
            <div className="font-logo text-[24px] tracking-[1px] mb-2 group-hover:text-accent transition-colors">
              {card.label.toUpperCase()}
            </div>
            <div className="text-[13px] text-muted font-light leading-[1.6]">
              {card.desc}
            </div>
            <div className="mt-4 text-[11px] text-muted group-hover:text-accent transition-colors tracking-[0.5px]">
              Buka →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
