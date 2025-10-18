"use client";
import { useLogout } from "@/lib/auth-guard";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLayout({ children }) {
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/experience", label: "Experience" },
    { href: "/admin/education", label: "Education" },
    { href: "/admin/skills", label: "Skills" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/tags", label: "Tags" },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between w-full p-4 text-xl font-bold text-white bg-blue-700 shadow">
        <span>Admin Panel</span>
        {/* Hamburger menu mobile */}
        <button
          className="p-2 text-white rounded lg:hidden hover:bg-blue-800"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open sidebar"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>
      <div className="flex flex-1">
        {/* Sidebar desktop */}
        <aside className="hidden w-56 min-h-full p-4 bg-blue-100 lg:block">
          <nav className="flex flex-col gap-2 mb-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:underline px-2 py-1 rounded ${
                  pathname === item.href
                    ? "bg-blue-600 text-white font-bold"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={logout}
            className="w-full py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </aside>
        {/* Sidebar mobile drawer */}
        {open && (
          <div
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-blue-100 p-4 transition-transform duration-300 lg:hidden ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-bold text-blue-700">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-blue-700 rounded hover:bg-blue-200"
              aria-label="Close sidebar"
            >
              ×
            </button>
          </div>
          <nav className="flex flex-col gap-2 mb-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:underline px-2 py-1 rounded ${
                  pathname === item.href
                    ? "bg-blue-600 text-white font-bold"
                    : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </aside>
        <main className="flex-1 max-w-full p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
