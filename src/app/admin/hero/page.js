"use client";

import { useState, useEffect } from "react";

export default function AdminHeroPage() {
  const [form, setForm] = useState({
    badge_text: "",
    title_line1: "",
    title_line2: "",
    title_line3: "",
    description: "",
    stat_years: 0,
    stat3_value: 5,
    stat3_label: "Tech Stack",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error)
          setForm({
            badge_text: d.badge_text || "",
            title_line1: d.title_line1 || "",
            title_line2: d.title_line2 || "",
            title_line3: d.title_line3 || "",
            description: d.description || "",
            stat_years: d.stat_years || 0,
            stat3_value: d.stat3_value ?? 5,
            stat3_label: d.stat3_label || "Tech Stack",
          });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const res = await fetch("/api/admin/hero", {
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

  if (loading) {
    return (
      <div className="p-10">
        <div className="h-8 w-48 bg-[#111] animate-pulse mb-4" />
        <div className="h-4 w-72 bg-[#111] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-10 max-w-[680px]">
      <div className="mb-8">
        <div className="text-[11px] tracking-[2px] uppercase text-accent mb-1">
          Master Data
        </div>
        <div className="font-logo text-[38px] tracking-[1px] leading-none">
          HERO
        </div>
        <p className="text-[12px] text-muted mt-1 font-light">
          Teks dan statistik yang tampil di halaman utama.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Preview */}
        <div className="border border-border bg-[#050505] p-6 mb-2">
          <div className="text-[10px] tracking-[2px] uppercase text-muted mb-3">
            Preview
          </div>
          <div className="inline-flex items-center gap-2 border border-border px-3 py-1 text-[10px] tracking-[2px] uppercase text-accent mb-4">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-blink" />
            {form.badge_text || "Badge text..."}
          </div>
          <div className="font-logo text-[clamp(28px,4vw,48px)] leading-[0.9] text-white">
            <div>{form.title_line1 || "LINE 1"}</div>
            <div className="text-outline">{form.title_line2 || "LINE 2"}</div>
            <div className="text-accent">{form.title_line3 || "LINE 3"}</div>
          </div>
          <div className="flex gap-8 mt-4">
            {[
              { val: "auto", suffix: "+", label: "Proyek (otomatis)" },
              { val: form.stat_years, suffix: "+", label: "Tahun" },
              {
                val: form.stat3_value,
                suffix: "",
                label: form.stat3_label || "Stat 3",
              },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-logo text-[28px] text-white leading-none">
                  {s.val}
                  <span className="text-accent">{s.suffix}</span>
                </div>
                <div className="text-[10px] text-muted uppercase tracking-[1px] mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge info */}
        <Field label="Badge Text (status bar kecil)">
          <input
            value={form.badge_text}
            onChange={(e) => setForm({ ...form, badge_text: e.target.value })}
            className="input-admin"
            placeholder="FULLSTACK DEVELOPER — INDONESIA"
          />
        </Field>

        {/* Judul 3 baris */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-[1.5px] uppercase text-muted">
            Judul Hero (3 baris)
          </label>
          <input
            value={form.title_line1}
            onChange={(e) => setForm({ ...form, title_line1: e.target.value })}
            className="input-admin"
            placeholder="Baris 1 — putih"
          />
          <input
            value={form.title_line2}
            onChange={(e) => setForm({ ...form, title_line2: e.target.value })}
            className="input-admin"
            placeholder="Baris 2 — outline"
          />
          <input
            value={form.title_line3}
            onChange={(e) => setForm({ ...form, title_line3: e.target.value })}
            className="input-admin"
            placeholder="Baris 3 — accent (kuning)"
          />
        </div>

        {/* Deskripsi */}
        <Field label="Deskripsi Singkat">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="resize-none input-admin h-28"
            placeholder="Deskripsi diri kamu..."
          />
        </Field>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-border bg-[#0a0a0a] px-4 py-3">
            <div className="text-[10px] tracking-[1.5px] uppercase text-muted mb-1">
              Jumlah Proyek
            </div>
            <div className="text-[12px] text-muted italic">
              Otomatis dari database
            </div>
          </div>
          <Field label="Tahun Pengalaman">
            <input
              type="number"
              value={form.stat_years}
              onChange={(e) =>
                setForm({ ...form, stat_years: parseInt(e.target.value) || 0 })
              }
              className="input-admin"
            />
          </Field>
          <div className="flex flex-col gap-3">
            <Field label="Stat 3 — Nilai">
              <input
                type="number"
                value={form.stat3_value}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stat3_value: parseInt(e.target.value) || 0,
                  })
                }
                className="input-admin"
                placeholder="5"
              />
            </Field>
            <Field label="Stat 3 — Label">
              <input
                value={form.stat3_label}
                onChange={(e) =>
                  setForm({ ...form, stat3_label: e.target.value })
                }
                className="input-admin"
                placeholder="Tech Stack"
              />
            </Field>
          </div>
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

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-[1.5px] uppercase text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
