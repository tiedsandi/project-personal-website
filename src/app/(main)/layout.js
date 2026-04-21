"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MainLayout({ children }) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const openContact = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeContact = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-12 py-5 border-b border-border bg-black/90 backdrop-blur-md">
        <div className="font-logo text-[28px] tracking-[2px] text-white">
          <Link href="/">
            SANDI<span className="text-accent">.</span>
          </Link>
        </div>
        <button className="nav-cta" onClick={openContact}>
          Hubungi Saya
        </button>
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="flex items-center justify-between px-12 py-8 bg-black border-t border-border">
        <div className="font-logo text-[22px] tracking-[2px] text-white">
          SANDI<span className="text-accent">.</span>
        </div>
        <div className="flex gap-6">
          <Link
            href={process.env.NEXT_PUBLIC_GITHUB || "#"}
            className="text-muted text-[12px] tracking-[0.5px] hover:text-white transition-colors"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_LINKEDIN || "#"}
            className="text-muted text-[12px] tracking-[0.5px] hover:text-white transition-colors"
            target="_blank"
          >
            LinkedIn
          </Link>
          <button
            onClick={openContact}
            className="text-muted text-[12px] tracking-[0.5px] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
          >
            Kontak
          </button>
        </div>
        <div className="text-[11px] text-border">
          &copy; {new Date().getFullYear()} Fachran Sandi
        </div>
      </footer>

      {/* CONTACT MODAL */}
      <div
        className={`fixed inset-0 z-[500] bg-black/75 backdrop-blur-[6px] flex items-center justify-center p-6 transition-opacity duration-250 ${modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeContact();
        }}
      >
        <div
          className={`bg-gray border border-border w-full max-w-[480px] p-10 transition-transform duration-300 ${modalOpen ? "translate-y-0 scale-100" : "translate-y-5 scale-98"}`}
        >
          <div className="flex items-start justify-between mb-7">
            <div>
              <div className="font-logo text-[32px] tracking-[1px] leading-none text-white">
                HUBUNGI SAYA
              </div>
              <div className="text-[13px] text-muted mt-1.5 font-light leading-snug">
                Pilih cara yang paling nyaman buat kamu.
              </div>
            </div>
            <button
              className="flex items-center justify-center flex-shrink-0 w-8 h-8 transition-colors bg-transparent border cursor-pointer border-border text-muted hover:border-white hover:text-white"
              onClick={closeContact}
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            <a
              href="https://wa.me/62895376240128?text=Halo%20Sandi%2C%20saya%20ingin%20ngobrol%20sebentar!"
              target="_blank"
              className="flex items-center gap-4 p-4 text-white transition-colors bg-black border border-border decoration-none hover:border-accent hover:bg-accent/5 group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-[#25d36666] flex-shrink-0 text-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium mb-0.5">WhatsApp</div>
                <div className="text-[11px] text-muted tracking-[0.3px]">
                  Klik langsung chat — paling cepat dibalas
                </div>
              </div>
              <div className="text-muted text-[16px] transition-transform group-hover:translate-x-1 group-hover:text-accent">
                →
              </div>
            </a>
            <a
              href="mailto:fachransandi@gmail.com?subject=Halo%20Sandi&body=Halo%20Sandi%2C%0A%0A"
              className="flex items-center gap-4 p-4 text-white transition-colors bg-black border border-border decoration-none hover:border-accent hover:bg-accent/5 group"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-lg border border-accent">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e8ff47"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium mb-0.5">Email</div>
                <div className="text-[11px] text-muted tracking-[0.3px]">
                  fachransandi@gmail.com
                </div>
              </div>
              <div className="text-muted text-[16px] transition-transform group-hover:translate-x-1 group-hover:text-accent">
                →
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
