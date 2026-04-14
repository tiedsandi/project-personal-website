"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import Field from "@/components/admin/Field";

const EMPTY_FORM = {
  name: "",
  company: "",
  type: "web app",
  date: "",
  description: "",
  tags: [],
  fitur: "",
  link_demo: "",
  link_github: "",
  img_url: "",
  gif_url: "",
  is_show_gif: false,
  is_highlight: false,
};

const TYPES = ["web app", "landing page", "mobile app"];

const COLUMNS = [
  { key: "name", label: "Nama", sortable: true },
  {
    key: "type",
    label: "Type",
    sortable: true,
    hidden: "hidden md:table-cell",
  },
  {
    key: "date",
    label: "Tanggal",
    sortable: true,
    hidden: "hidden lg:table-cell",
  },
  { key: "is_highlight", label: "Highlight", align: "center" },
  { key: "actions", label: "Aksi", align: "right" },
];

const TYPE_BADGE = {
  "web app": "text-accent border-accent/40 bg-accent/10",
  "landing page": "text-white/70 border-white/20 bg-white/5",
  "mobile app": "text-red-400 border-red-400/30 bg-red-400/10",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const imgInputRef = useRef(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => setProjects(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
    fetch("/api/skills-marquee")
      .then((r) => r.json())
      .then((d) => setSkills(Array.isArray(d) ? d : []));
  }, []);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setError("");
    setModal("create");
  };
  const openEdit = (p) => {
    setForm({
      name: p.name || "",
      company: p.company || "",
      type: p.type || "web app",
      date: p.date || "",
      description: p.description || "",
      tags: Array.isArray(p.tags) ? p.tags : [],
      fitur: (p.fitur || []).join("; "),
      link_demo: p.link_demo || "",
      link_github: p.link_github || "",
      img_url: p.img_url || "",
      gif_url: p.gif_url || "",
      is_show_gif: p.is_show_gif || false,
      is_highlight: p.is_highlight || false,
    });
    setEditId(p.id);
    setError("");
    setModal("edit");
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) setForm((f) => ({ ...f, img_url: data.url }));
    else setError(data.error || "Upload gagal");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      tags: Array.isArray(form.tags) ? form.tags : [],
      fitur: form.fitur
        .split(";")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (modal === "create") {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Gagal menyimpan");
          return;
        }
        setProjects((prev) => [data, ...prev]);
      } else {
        const res = await fetch(`/api/projects/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Gagal menyimpan");
          return;
        }
        setProjects((prev) => prev.map((p) => (p.id === editId ? data : p)));
      }
      setModal(null);
    } catch {
      setError("Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Hapus proyek "${name}"?`)) return;
    setDeletingId(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) {
      fetch("/api/projects")
        .then((r) => r.json())
        .then((d) => setProjects(Array.isArray(d) ? d : []));
    }
    setDeletingId(null);
  };

  const toggleHighlight = async (project) => {
    const updated = { ...project, is_highlight: !project.is_highlight };
    setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_highlight: updated.is_highlight }),
    });
    if (!res.ok)
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? project : p)),
      );
  };

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const displayed = useMemo(() => {
    let list = [...projects];
    if (filterType !== "all") list = list.filter((p) => p.type === filterType);
    if (search.trim())
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.company?.toLowerCase().includes(search.toLowerCase()),
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
  }, [projects, filterType, search, sortKey, sortDir]);

  return (
    <div className="p-10">
      <AdminPageHeader
        label="Master Data"
        title="PROJECTS"
        subtitle={`${projects.filter((p) => p.is_highlight).length} dari ${projects.length} proyek ditampilkan di home`}
        onAdd={openCreate}
        addLabel="+ Tambah Proyek"
      />

      {/* Search + Filter */}
      <div className="flex flex-col gap-3 mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau instansi..."
          className="input-admin max-w-[320px]"
        />
        <div className="flex flex-wrap gap-0.5">
          {["all", ...TYPES].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-1.5 text-[11px] tracking-[1px] uppercase border transition-colors cursor-pointer ${
                filterType === t
                  ? "bg-accent text-black border-accent"
                  : "bg-transparent text-muted border-border hover:text-white hover:border-white"
              }`}
            >
              {t === "all"
                ? `Semua (${projects.length})`
                : `${t} (${projects.filter((p) => p.type === t).length})`}
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
            ? `Tidak ada proyek dengan nama "${search}".`
            : "Belum ada data. Tambahkan proyek pertama!"
        }
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={toggleSort}
        totalCount={projects.length}
        renderRow={(p) => (
          <tr
            key={p.id}
            className={`border-b border-border transition-all duration-200 ${
              deletingId === p.id
                ? "opacity-0"
                : "opacity-100 hover:bg-[#0a0a0a]"
            }`}
          >
            <td className="px-5 py-4">
              <div className="font-medium text-white">{p.name}</div>
              <div className="text-[11px] text-muted mt-0.5">{p.company}</div>
            </td>
            <td className="hidden px-5 py-4 md:table-cell">
              <span
                className={`text-[10px] tracking-[0.5px] uppercase border px-2 py-0.5 ${TYPE_BADGE[p.type] || "text-muted border-border"}`}
              >
                {p.type}
              </span>
            </td>
            <td className="px-5 py-4 text-muted text-[13px] hidden lg:table-cell">
              {p.date}
            </td>
            <td className="px-5 py-4 text-center">
              <button
                onClick={() => toggleHighlight(p)}
                title={
                  p.is_highlight ? "Nonaktifkan dari home" : "Tampilkan di home"
                }
                className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.5px] uppercase border px-2.5 py-1 cursor-pointer transition-all ${
                  p.is_highlight
                    ? "bg-accent/10 text-accent border-accent/40 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/40"
                    : "bg-[#111] text-muted border-border hover:text-accent hover:border-accent/40 hover:bg-accent/5"
                }`}
              >
                {p.is_highlight ? "✓ ON" : "OFF"}
              </button>
            </td>
            <td className="px-5 py-4 text-right">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="text-[11px] text-muted hover:text-white border border-border px-3 py-1.5 transition-colors cursor-pointer bg-transparent"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.name)}
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
        title={modal === "create" ? "TAMBAH PROYEK" : "EDIT PROYEK"}
        onClose={() => setModal(null)}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-6 px-7">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama Proyek *">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-admin"
                placeholder="Roadmind AI"
                autoFocus
              />
            </Field>
            <Field label="Company / Instansi">
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="input-admin"
                placeholder="Personal Project"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Type *">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="input-admin"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tanggal">
              <input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input-admin"
                placeholder="Sep 2025"
              />
            </Field>
          </div>
          <Field label="Deskripsi">
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="h-24 resize-none input-admin"
              placeholder="Deskripsi singkat proyek..."
            />
          </Field>

          {/* Tags multiselect */}
          <Field label={`Tech Stack (${form.tags.length} dipilih)`}>
            <div className="border border-[#252525] p-3 max-h-[180px] overflow-y-auto bg-black">
              {skills.length === 0 ? (
                <div className="text-[12px] text-muted">Memuat skills...</div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => {
                    const selected = form.tags.includes(s.name);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            tags: selected
                              ? f.tags.filter((t) => t !== s.name)
                              : [...f.tags, s.name],
                          }))
                        }
                        className={`text-[10px] tracking-[0.5px] px-2.5 py-1 border transition-colors cursor-pointer ${
                          selected
                            ? "bg-accent text-black border-accent"
                            : "bg-transparent text-muted border-border hover:text-white hover:border-white"
                        }`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </Field>

          <Field label="Fitur Utama (pisah titik-koma ;)">
            <textarea
              value={form.fitur}
              onChange={(e) => setForm({ ...form, fitur: e.target.value })}
              className="resize-none input-admin h-28"
              placeholder="User Authentication; Dashboard Analytics; REST API; Export PDF"
            />
            <div className="text-[10px] text-muted mt-1">
              Pisahkan tiap fitur dengan titik-koma (;)
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Link Demo">
              <input
                value={form.link_demo}
                onChange={(e) =>
                  setForm({ ...form, link_demo: e.target.value })
                }
                className="input-admin"
                placeholder="https://..."
              />
            </Field>
            <Field label="Link GitHub">
              <input
                value={form.link_github}
                onChange={(e) =>
                  setForm({ ...form, link_github: e.target.value })
                }
                className="input-admin"
                placeholder="https://github.com/..."
              />
            </Field>
          </div>

          <Field label="Gambar Cover">
            <div className="flex gap-2">
              <input
                value={form.img_url}
                onChange={(e) => setForm({ ...form, img_url: e.target.value })}
                className="flex-1 input-admin"
                placeholder="URL gambar atau upload →"
              />
              <button
                type="button"
                onClick={() => imgInputRef.current?.click()}
                disabled={uploading}
                className="bg-[#1a1a1a] border border-border text-muted hover:text-white text-[11px] px-4 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                {uploading ? "..." : "Upload"}
              </button>
            </div>
            <input
              ref={imgInputRef}
              type="file"
              accept="image/*,image/gif"
              className="hidden"
              onChange={handleUpload}
            />
            {form.img_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.img_url}
                alt="preview"
                className="object-cover w-full h-24 mt-2 border border-border opacity-70"
              />
            )}
          </Field>

          <Field label="URL GIF (opsional, saat hover)">
            <input
              value={form.gif_url}
              onChange={(e) => setForm({ ...form, gif_url: e.target.value })}
              className="input-admin"
              placeholder="https://media.giphy.com/..."
            />
          </Field>

          <div className="flex gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_show_gif}
                onChange={(e) =>
                  setForm({ ...form, is_show_gif: e.target.checked })
                }
                className="accent-[#e8ff47] w-4 h-4"
              />
              <span className="text-[12px] text-muted">
                Tampilkan GIF di modal
              </span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_highlight}
                onChange={(e) =>
                  setForm({ ...form, is_highlight: e.target.checked })
                }
                className="accent-[#e8ff47] w-4 h-4"
              />
              <span className="text-[12px] text-muted">
                Tampil di Home (highlight)
              </span>
            </label>
          </div>

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
