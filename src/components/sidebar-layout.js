"use client";
import { useLogout } from "@/lib/auth-guard";

export default function SidebarLayout({ children }) {
  const logout = useLogout();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="w-full p-4 text-xl font-bold text-white bg-blue-700 shadow">
        Admin Panel
      </header>
      <div className="flex flex-1">
        <aside className="w-56 min-h-full p-4 bg-blue-100">
          <nav className="flex flex-col gap-2 mb-8">
            <a href="/admin" className="hover:underline">Dashboard</a>
            <a href="/admin/experience" className="hover:underline">Experience</a>
            <a href="/admin/education" className="hover:underline">Education</a>
            <a href="/admin/skills" className="hover:underline">Skills</a>
            <a href="/admin/projects" className="hover:underline">Projects</a>
          </nav>
          <button
            onClick={logout}
            className="w-full py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
