"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login gagal");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="font-logo text-[36px] tracking-[3px] text-white">
            SANDI<span className="text-accent">.</span>
          </div>
          <div className="text-[11px] tracking-[2px] uppercase text-muted mt-1">
            Admin Panel
          </div>
        </div>

        {/* Form */}
        <div className="border border-border bg-[#0d0d0d] p-8">
          <div className="mb-6">
            <div className="text-[18px] font-logo tracking-[1px] mb-1">
              MASUK
            </div>
            <div className="text-[12px] text-muted font-light">
              Masukkan password admin untuk melanjutkan.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] tracking-[1.5px] uppercase text-muted mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoFocus
                className="w-full bg-black border border-border text-white text-[13px] px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-[#333]"
              />
            </div>

            {error && (
              <div className="text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-accent text-black text-[13px] font-medium tracking-[0.5px] py-3 px-6 cursor-pointer transition-opacity hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "MEMPROSES..." : "MASUK →"}
            </button>
          </form>
        </div>

        <div className="mt-5 text-center">
          <a
            href="/"
            className="text-[11px] text-muted hover:text-white transition-colors tracking-[0.5px]"
          >
            ← Kembali ke website
          </a>
        </div>
      </div>
    </div>
  );
}
