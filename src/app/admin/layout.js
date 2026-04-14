"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/admin/hero", label: "Hero", icon: "✦" },
  { href: "/admin/about", label: "About", icon: "◎" },
  { href: "/admin/journey", label: "Journey", icon: "↝" },
  { href: "/admin/projects", label: "Projects", icon: "◫" },
  { href: "/admin/skills", label: "Skills", icon: "⬡" },
  { href: "/admin/cv", label: "CV", icon: "↓" },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen font-sans text-white bg-black">
      {/* SIDEBAR */}
      <aside className="fixed top-0 left-0 h-full w-[220px] border-r border-border bg-black flex flex-col z-50">
        <div className="px-6 py-6 border-b border-border">
          <div className="font-logo text-[22px] tracking-[2px]">
            SANDI<span className="text-accent">.</span>
          </div>
          <div className="text-[10px] tracking-[1.5px] uppercase text-muted mt-0.5">
            Admin Panel
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-[13px] tracking-[0.3px] transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent border-l-2 border-accent pl-[10px]"
                    : "text-muted hover:text-white hover:bg-[#111]"
                }`}
              >
                <span className="text-[16px] leading-none">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 text-[12px] text-muted hover:text-white transition-colors tracking-[0.3px] w-full"
          >
            <span className="text-[14px]">↗</span>
            Lihat Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-[12px] text-muted hover:text-red-400 transition-colors tracking-[0.3px] w-full cursor-pointer bg-transparent border-none text-left"
          >
            <span className="text-[14px]">⎋</span>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-[220px] flex-1 min-h-screen bg-black">
        {children}
      </main>
    </div>
  );
}
