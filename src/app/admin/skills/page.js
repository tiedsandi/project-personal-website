"use client";

import { useEffect, useState } from "react";
import { Plus, X, Save } from "lucide-react";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills-marquee")
      .then((r) => r.json())
      .then((d) => { setSkills(d.skills); setLoading(false); });
  }, []);

  function addSkill() {
    const trimmed = newSkill.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills([...skills, trimmed]);
    setNewSkill("");
  }

  function removeSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  async function handleSave() {
    setSaving(true);
    await fetch("/api/skills-marquee", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skills Marquee</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola teks yang berjalan di halaman home</p>
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

      {/* Add input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          placeholder="Tambah skill baru..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button
          onClick={addSkill}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {/* Skills list */}
      {loading ? (
        <p className="text-gray-400 text-sm">Memuat...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            {skills.length} skill aktif
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Preview urutan</p>
        <p className="text-sm text-gray-500 leading-relaxed">{skills.join(" · ")}</p>
      </div>
    </div>
  );
}
