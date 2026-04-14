"use client";

import { useState, useEffect } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Field from "@/components/admin/Field";
import Link from "next/link";

const BADGE_OPTIONS = [
  {
    value: "open_to_work",
    label: "Open to Work",
    desc: "Aktif cari pekerjaan",
  },
  {
    value: "open_to_opportunities",
    label: "Open to Opportunities",
    desc: "Terbuka tapi tidak aktif melamar",
  },
  { value: "employed", label: "Currently Employed", desc: "Sedang bekerja" },
  {
    value: "freelancing",
    label: "Available for Freelance",
    desc: "Tersedia untuk freelance",
  },
  { value: "custom", label: "Custom Text", desc: "Tulis sendiri" },
];

const BADGE_DISPLAY = {
  open_to_work: "Open to Work",
  open_to_opportunities: "Open to Opportunities",
  employed: "Currently Employed",
  freelancing: "Available for Freelance",
};

export default function AdminAboutPage() {
  const [form, setForm] = useState({
    badge_status: "open_to_opportunities",
    badge_custom: "",
    name: "",
    bio: "",
    info_lokasi: "",
    info_fokus: "",
    info_pengalaman: "",
    info_terbuka: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error)
          setForm({
            badge_status: d.badge_status || "open_to_opportunities",
            badge_custom: d.badge_custom || "",
            name: d.name || "",
            bio: d.bio || "",
            info_lokasi: d.info_lokasi || "",
            info_fokus: d.info_fokus || "",
            info_pengalaman: d.info_pengalaman || "",
            info_terbuka: d.info_terbuka || "",
          });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Gagal menyimpan");
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const badgeText =
    form.badge_status === "custom"
      ? form.badge_custom
      : BADGE_DISPLAY[form.badge_status] || "";

  if (loading) {
    return (
      <div className="p-10">
        <div className="h-8 w-40 bg-[#111] animate-pulse mb-4" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-[#111] animate-pulse mb-3" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-10 max-w-[720px]">
      <AdminPageHeader
        label="Master Data"
        title="ABOUT"
        subtitle="Profil dan info yang tampil di section About."
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {/* ── Badge Status ── */}
        <Section title="Status Ketersediaan">
          <div className="grid grid-cols-1 gap-2">
            {BADGE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-4 p-3.5 border cursor-pointer transition-colors ${
                  form.badge_status === opt.value
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-white/20"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                    form.badge_status === opt.value
                      ? "border-accent bg-accent"
                      : "border-muted"
                  }`}
                />
                <input
                  type="radio"
                  name="badge_status"
                  value={opt.value}
                  checked={form.badge_status === opt.value}
                  onChange={(e) =>
                    setForm({ ...form, badge_status: e.target.value })
                  }
                  className="sr-only"
                />
                <div>
                  <div
                    className={`text-[12px] font-medium ${form.badge_status === opt.value ? "text-accent" : "text-white"}`}
                  >
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-muted">{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
          {form.badge_status === "custom" && (
            <Field label="Teks Badge Custom">
              <input
                value={form.badge_custom}
                onChange={(e) =>
                  setForm({ ...form, badge_custom: e.target.value })
                }
                className="input-admin"
                placeholder="Tuliskan status kamu..."
                autoFocus
              />
            </Field>
          )}
          {/* Preview */}
          <div className="flex items-center gap-2 border border-accent/30 px-3.5 py-1.5 w-fit mt-2">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-blink" />
            <span className="text-[10px] tracking-[2px] uppercase text-accent">
              {badgeText || "—"}
            </span>
          </div>
        </Section>

        {/* ── Info Dasar ── */}
        <Section title="Info Dasar">
          <Field label="Nama">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-admin"
              placeholder="Fachran Sandi"
            />
          </Field>
          <Field label="Bio (bisa pakai HTML misal <strong>teks putih</strong>)">
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="input-admin resize-none h-28"
              placeholder="Deskripsi singkat tentang dirimu..."
            />
          </Field>
        </Section>

        {/* ── Detail Info Rows ── */}
        <Section title="Detail Info (bisa pakai HTML misal <span>kuning</span>)">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Lokasi">
              <input
                value={form.info_lokasi}
                onChange={(e) =>
                  setForm({ ...form, info_lokasi: e.target.value })
                }
                className="input-admin"
                placeholder="Indonesia"
              />
            </Field>
            <Field label="Fokus Saat Ini">
              <input
                value={form.info_fokus}
                onChange={(e) =>
                  setForm({ ...form, info_fokus: e.target.value })
                }
                className="input-admin"
                placeholder="Fullstack Web + Three.js / GSAP"
              />
            </Field>
            <Field label="Pengalaman">
              <input
                value={form.info_pengalaman}
                onChange={(e) =>
                  setForm({ ...form, info_pengalaman: e.target.value })
                }
                className="input-admin"
                placeholder="1+ tahun, 16+ proyek dibangun"
              />
            </Field>
            <Field label="Terbuka Untuk">
              <input
                value={form.info_terbuka}
                onChange={(e) =>
                  setForm({ ...form, info_terbuka: e.target.value })
                }
                className="input-admin"
                placeholder="Full-time, Kolaborasi, Diskusi santai"
              />
            </Field>
          </div>
        </Section>

        {/* ── Links to sub-pages ── */}
        <div className="flex gap-3">
          <Link
            href="/admin/journey"
            className="flex items-center gap-2 border border-border px-5 py-3 text-[11px] tracking-[1px] uppercase text-muted hover:text-white hover:border-white transition-colors"
          >
            ✦ Kelola Journey →
          </Link>
          <Link
            href="/admin/skills"
            className="flex items-center gap-2 border border-border px-5 py-3 text-[11px] tracking-[1px] uppercase text-muted hover:text-white hover:border-white transition-colors"
          >
            ⬡ Kelola Currently Learning (via Skills) →
          </Link>
        </div>

        {error && (
          <div className="text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5">
            {error}
          </div>
        )}
        {success && (
          <div className="text-[12px] text-accent bg-accent/10 border border-accent/20 px-4 py-2.5">
            ✓ Berhasil disimpan!
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-accent text-black text-[12px] tracking-[1px] uppercase px-8 py-3 cursor-pointer hover:opacity-85 transition-opacity disabled:opacity-50 w-fit"
        >
          {saving ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
        </button>
      </form>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[11px] tracking-[2px] uppercase text-accent pb-2 border-b border-border">
        {title}
      </div>
      {children}
    </div>
  );
}
