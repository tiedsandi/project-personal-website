"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-gray-900 hover:text-blue-600 transition-colors">
          Sandi<span className="text-gray-400">.</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors hover:text-gray-900 ${
              pathname === '/' 
                ? 'text-gray-900 underline underline-offset-4 decoration-2' 
                : 'text-gray-500'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/project" 
            className={`text-sm font-medium transition-colors hover:text-gray-900 ${
              pathname === '/project' 
                ? 'text-gray-900 underline underline-offset-4 decoration-2' 
                : 'text-gray-500'
            }`}
          >
            Proyek
          </Link>
          <a
            href="/cv.pdf"
            download="cv.pdf"
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-colors"
          >
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
