import Header from "@/components/Header";
import Link from "next/link";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto bg-white shadow-2xl shadow-gray-200/50 xl:my-8 xl:rounded-[2.5rem] overflow-hidden border border-gray-100">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="py-12 text-center border-t border-gray-100 bg-gray-50/50">
        <p className="text-gray-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Fachran Sandi. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <Link
            href={process.env.NEXT_PUBLIC_LINKEDIN || '#'}
            className="text-gray-400 hover:text-gray-900 transition-colors"
            target="_blank"
          >
            LinkedIn
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_GITHUB || '#'}
            className="text-gray-400 hover:text-gray-900 transition-colors"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
}
