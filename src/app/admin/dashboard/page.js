import Link from "next/link";
import { FolderKanban, FileText, Wrench, ArrowRight } from "lucide-react";
import supabase from "@/lib/supabase";

export default async function DashboardPage() {
  const [{ data: projects }, { data: marqueeData }] = await Promise.all([
    supabase.from("projects").select("id, selected"),
    supabase.from("skills_marquee").select("skills").eq("id", 1).single(),
  ]);

  const total = projects?.length || 0;
  const featured = projects?.filter((p) => p.selected).length || 0;
  const skillsCount = marqueeData?.skills?.length || 0;

  const cards = [
    {
      label: "Total Proyek",
      value: total,
      sub: `${featured} ditampilkan di home`,
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "CV",
      value: "cv.pdf",
      sub: "Klik untuk upload ulang",
      href: "/admin/cv",
      icon: FileText,
    },
    {
      label: "Skills Marquee",
      value: skillsCount,
      sub: "item berjalan di home",
      href: "/admin/skills",
      icon: Wrench,
    },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview portfolio kamu</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ label, value, sub, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
