"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Save, Upload, Plus, Trash2 } from "lucide-react";

export default function AdminHeroPage() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch("/api/hero").then((r) => r.json()).then((d) => {
      setData(d);
      setPreview(d.photo);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handlePhotoUpload(file) {
    if (!file) return;
    setUploadingPhoto(true);
    setPreview(URL.createObjectURL(file));
    const fd = new FormData();
    fd.append("photo", file);
    const res = await fetch("/api/hero/photo", { method: "POST", body: fd });
    const result = await res.json();
    if (res.ok) {
      setData((prev) => ({ ...prev, photo: result.photo }));
    } else {
      alert(result.error || "Upload gagal");
    }
    setUploadingPhoto(false);
  }

  function updateStat(index, key, value) {
    const updated = [...data.stats];
    updated[index] = { ...updated[index], [key]: value };
    setData({ ...data, stats: updated });
  }

  function addStat() {
    setData({ ...data, stats: [...data.stats, { value: "", label: "" }] });
  }

  function removeStat(index) {
    setData({ ...data, stats: data.stats.filter((_, i) => i !== index) });
  }

  if (!data) return <p className="text-sm text-gray-400">Memuat...</p>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
          <p className="text-sm text-gray-500 mt-1">Edit teks dan foto di halaman home</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Menyimpan..." : saved ? "Tersimpan ✓" : "Simpan"}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Photo */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Foto Profil</h2>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 shrink-0 bg-gray-100">
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              )}
            </div>
            <div>
              <button
                onClick={() => photoInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors"
              >
                <Upload className="w-4 h-4" />
                {uploadingPhoto ? "Mengupload..." : "Ganti Foto"}
              </button>
              <p className="text-xs text-gray-400 mt-1.5">JPG, PNG, WebP · maks 5MB</p>
            </div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handlePhotoUpload(e.target.files[0])}
            />
          </div>
        </div>

        {/* Text content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-700">Teks Hero</h2>

          {[
            { key: "greeting", label: "Sapaan", placeholder: "Halo! Saya" },
            { key: "name", label: "Nama", placeholder: "Fachran Sandi" },
            { key: "title", label: "Jabatan / Title", placeholder: "Fullstack Developer" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                {label}
              </label>
              <input
                type="text"
                value={data[key] || ""}
                onChange={(e) => setData({ ...data, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          ))}

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
              Deskripsi
            </label>
            <textarea
              rows={3}
              value={data.description || ""}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
            />
          </div>
        </div>

        {/* Stats chips */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Stat Chips</h2>
            <button
              onClick={addStat}
              className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {data.stats.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={s.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                  placeholder="16"
                  className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="text"
                  value={s.label}
                  onChange={(e) => updateStat(i, "label", e.target.value)}
                  placeholder="Proyek Personal"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <button
                  onClick={() => removeStat(i)}
                  className="p-2 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
