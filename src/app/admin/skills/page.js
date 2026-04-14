"use client";

import { useState, useEffect, useMemo } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import Field from "@/components/admin/Field";

const CATEGORIES = ["frontend", "backend", "database", "mobile", "other"];
const EMPTY_FORM = {
  name: "",
  category: "frontend",
  is_marquee: false,
  is_learning: false,
};

const COLUMNS = [
  { key: "name", label: "Nama", sortable: true },
  {
    key: "category",
    label: "Kategori",
    sortable: true,
    hidden: "hidden md:table-cell",
  },
  { key: "marquee", label: "Marquee", align: "center" },
  {
    key: "learning",
    label: "Learning",
    align: "center",
    hidden: "hidden lg:table-cell",
  },
  { key: "actions", label: "Aksi", align: "right" },
];

const CAT_COLOR = {
  frontend: "text-accent border-accent/30 bg-accent/10",
  backend: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  database: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  mobile: "text-red-400 border-red-400/30 bg-red-400/10",
  other: "text-muted border-border bg-[#111]",
};

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    fetch("/api/skills-marquee")
      .then((r) => r.json())
      .then((d) => setSkills(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setError("");
    setModal("create");
  };
  const openEdit = (s) => {
    setForm({
      name: s.name,
      category: s.category || "frontend",
      is_marquee: s.is_marquee,
      is_learning: s.is_learning || false,
    });
    setEditId(s.id);
    setError("");
    setModal("edit");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (modal === "create") {
        const res = await fetch("/api/admin/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Gagal menyimpan");
          return;
        }
        setSkills((prev) => [...prev, data]);
      } else {
        const res = await fetch(`/api/admin/skills/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Gagal menyimpan");
          return;
        }
        setSkills((prev) => prev.map((s) => (s.id === editId ? data : s)));
      }
      setModal(null);
    } catch {
      setError("Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Hapus skill "${name}"?`)) return;
    setDeletingId(id);
    setSkills((prev) => prev.filter((s) => s.id !== id));
    const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    if (!res.ok) {
      fetch("/api/skills-marquee")
        .then((r) => r.json())
        .then((d) => setSkills(Array.isArray(d) ? d : []));
    }
    setDeletingId(null);
  };

  const toggleMarquee = async (skill) => {
    const updated = { ...skill, is_marquee: !skill.is_marquee };
    setSkills((prev) => prev.map((s) => (s.id === skill.id ? updated : s)));
    const res = await fetch(`/api/admin/skills/${skill.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_marquee: updated.is_marquee }),
    });
    if (!res.ok)
      setSkills((prev) => prev.map((s) => (s.id === skill.id ? skill : s)));
  };

  const toggleLearning = async (skill) => {
    const updated = { ...skill, is_learning: !skill.is_learning };
    setSkills((prev) => prev.map((s) => (s.id === skill.id ? updated : s)));
    const res = await fetch(`/api/admin/skills/${skill.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_learning: updated.is_learning }),
    });
    if (!res.ok)
      setSkills((prev) => prev.map((s) => (s.id === skill.id ? skill : s)));
  };

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const displayed = useMemo(() => {
    let list = [...skills];
    if (filter !== "all") list = list.filter((s) => s.category === filter);
    if (search.trim())
      list = list.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()),
      );
    list.sort((a, b) => {
      let va = a[sortKey] ?? "";
      let vb = b[sortKey] ?? "";
      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [skills, filter, search, sortKey, sortDir]);

  return (
    <div className="p-10">
      <AdminPageHeader
        label="Master Data"
        title="SKILLS"
        subtitle={`${skills.filter((s) => s.is_marquee).length} marquee · ${skills.filter((s) => s.is_learning).length} currently learning`}
        onAdd={openCreate}
        addLabel="+ Tambah Skill"
      />

      <div className="flex flex-col gap-3 mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama skill..."
          className="input-admin max-w-[320px]"
        />
        <div className="flex flex-wrap gap-0.5">
          {["all", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 text-[11px] tracking-[1px] uppercase border transition-colors cursor-pointer ${
                filter === c
                  ? "bg-accent text-black border-accent"
                  : "bg-transparent text-muted border-border hover:text-white hover:border-white"
              }`}
            >
              {c === "all"
                ? `Semua (${skills.length})`
                : `${c} (${skills.filter((s) => s.category === c).length})`}
            </button>
          ))}
        </div>
      </div>

      <AdminTable
        columns={COLUMNS}
        data={displayed}
        loading={loading}
        emptyMessage={
          search
            ? `Tidak ada skill dengan nama "${search}".`
            : "Tidak ada skill."
        }
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={toggleSort}
        totalCount={skills.length}
        renderRow={(s) => (
          <tr
            key={s.id}
            className={`border-b border-border transition-all duration-200 ${
              deletingId === s.id
                ? "opacity-0"
                : "opacity-100 hover:bg-[#0a0a0a]"
            }`}
          >
            <td className="px-5 py-3 font-medium text-white">{s.name}</td>
            <td className="px-5 py-3 hidden md:table-cell">
              <span
                className={`text-[10px] tracking-[0.5px] uppercase border px-2 py-0.5 ${CAT_COLOR[s.category] || CAT_COLOR.other}`}
              >
                {s.category}
              </span>
            </td>
            <td className="px-5 py-3 text-center">
              <button
                onClick={() => toggleMarquee(s)}
                title={
                  s.is_marquee
                    ? "Nonaktifkan dari marquee"
                    : "Tampilkan di marquee"
                }
                className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.5px] uppercase border px-2.5 py-1 cursor-pointer transition-all ${
                  s.is_marquee
                    ? "bg-accent/10 text-accent border-accent/40 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/40"
                    : "bg-[#111] text-muted border-border hover:text-accent hover:border-accent/40 hover:bg-accent/5"
                }`}
              >
                {s.is_marquee ? "✓ ON" : "OFF"}
              </button>
            </td>
            <td className="px-5 py-3 text-center hidden lg:table-cell">
              <button
                onClick={() => toggleLearning(s)}
                title={
                  s.is_learning
                    ? "Hapus dari Currently Learning"
                    : "Tandai sedang dipelajari"
                }
                className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.5px] uppercase border px-2.5 py-1 cursor-pointer transition-all ${
                  s.is_learning
                    ? "bg-blue-400/10 text-blue-400 border-blue-400/40 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/40"
                    : "bg-[#111] text-muted border-border hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-400/5"
                }`}
              >
                {s.is_learning ? "✓ ON" : "OFF"}
              </button>
            </td>
            <td className="px-5 py-3 text-right">
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => openEdit(s)}
                  className="text-[11px] text-muted hover:text-white border border-border px-3 py-1.5 transition-colors cursor-pointer bg-transparent"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id, s.name)}
                  className="text-[11px] text-muted hover:text-red-400 border border-border hover:border-red-400/40 px-3 py-1.5 transition-colors cursor-pointer bg-transparent"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      <AdminModal
        open={!!modal}
        title={modal === "create" ? "TAMBAH SKILL" : "EDIT SKILL"}
        onClose={() => setModal(null)}
        maxWidth="max-w-[420px]"
      >
        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
          <Field label="Nama Skill *">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-admin"
              placeholder="Next.js"
              autoFocus
            />
          </Field>
          <Field label="Kategori">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="input-admin"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_marquee}
              onChange={(e) =>
                setForm({ ...form, is_marquee: e.target.checked })
              }
              className="accent-[#e8ff47] w-4 h-4"
            />
            <span className="text-[12px] text-muted">
              Tampilkan di Marquee Homepage
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_learning}
              onChange={(e) =>
                setForm({ ...form, is_learning: e.target.checked })
              }
              className="accent-[#60a5fa] w-4 h-4"
            />
            <span className="text-[12px] text-muted">
              Tampil di Currently Learning
            </span>
          </label>
          {error && (
            <div className="text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5">
              {error}
            </div>
          )}
          <div className="flex gap-3 pt-2 border-t border-border">
            <button
              type="submit"
              disabled={saving}
              className="bg-accent text-black text-[12px] tracking-[0.5px] px-6 py-2.5 cursor-pointer hover:opacity-85 disabled:opacity-50"
            >
              {saving
                ? "MENYIMPAN..."
                : modal === "create"
                  ? "SIMPAN"
                  : "UPDATE"}
            </button>
            <button
              type="button"
              onClick={() => setModal(null)}
              className="bg-transparent text-muted border border-border text-[12px] px-6 py-2.5 cursor-pointer hover:text-white hover:border-white transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
