"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Star, Upload, ImageIcon } from "lucide-react";

const EMPTY = {
  name: "", company: "", imgName: "", date: "", linkGithub: "",
  linkDemo: "", description: "", tags: "", fitur: "",
  type: "frontend", selected: false, gifProject: "", isShowGif: false,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null); // null = closed, {} = open
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingGif, setUploadingGif] = useState(false);
  const imgInputRef = useRef(null);
  const gifInputRef = useRef(null);

  async function handleImageUpload(file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch("/api/upload-image", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) {
      setForm((prev) => ({ ...prev, imgName: data.filename }));
    } else {
      alert(data.error || "Upload gagal");
    }
    setUploading(false);
  }

  async function handleGifUpload(file) {
    if (!file) return;
    if (file.type !== "image/gif") {
      alert("Hanya file GIF yang diperbolehkan di sini.");
      return;
    }
    setUploadingGif(true);
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch("/api/upload-image", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) {
      setForm((prev) => ({ ...prev, gifProject: data.filename }));
    } else {
      alert(data.error || "Upload GIF gagal");
    }
    setUploadingGif(false);
  }

  async function load() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditId(null);
    setForm({ ...EMPTY });
  }

  function openEdit(project) {
    setEditId(project.id);
    setForm({
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : project.tags,
      fitur: Array.isArray(project.fitur) ? project.fitur.join("; ") : project.fitur,
    });
  }

  function closeForm() { setForm(null); setEditId(null); }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      fitur: form.fitur.split(";").map((s) => s.trim()).filter(Boolean),
    };

    if (editId) {
      await fetch(`/api/projects/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    await load();
    closeForm();
    setSaving(false);
  }

  async function handleDelete(id) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setDeleteId(null);
    await load();
  }

  const typeColor = {
    frontend: "bg-blue-50 text-blue-600",
    backend: "bg-gray-100 text-gray-700",
    fullstack: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proyek</h1>
          <p className="text-sm text-gray-500 mt-0.5">{projects.length} total proyek</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Proyek
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400 text-sm">Memuat...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Nama</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Tanggal</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Featured</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColor[p.type] ?? "bg-gray-100 text-gray-600"}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.date}</td>
                  <td className="px-4 py-3">
                    {p.selected && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="font-bold text-gray-900">{editId ? "Edit Proyek" : "Tambah Proyek"}</h2>
              <button onClick={closeForm} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              {[
                { key: "name", label: "Nama Proyek", required: true },
                { key: "company", label: "Company/Client" },
                { key: "date", label: "Tanggal", placeholder: "contoh: 01 Januari 2025" },
                { key: "linkGithub", label: "Link GitHub" },
                { key: "linkDemo", label: "Link Demo" },
              ].map(({ key, label, placeholder, required }) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                    {label}{required && <span className="text-red-400 ml-0.5">*</span>}
                  </label>
                  <input
                    type="text"
                    value={form[key] || ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              ))}

              {/* Image Upload */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  Gambar Proyek
                </label>
                <div
                  onClick={() => imgInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); handleImageUpload(e.dataTransfer.files[0]); }}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-gray-400 transition-colors"
                >
                  {form.imgName ? (
                    <div className="flex items-center gap-3 justify-center">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700 font-medium">{form.imgName}</span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setForm({ ...form, imgName: "" }); }}
                        className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <X className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-6 h-6 text-gray-300 mx-auto mb-1.5" />
                      <p className="text-sm text-gray-500">{uploading ? "Mengupload..." : "Drag & drop atau klik untuk pilih"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WebP · maks 5MB</p>
                    </div>
                  )}
                </div>
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
              </div>

              {/* GIF Upload */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  GIF Preview{" "}
                  <span className="text-gray-400 font-normal normal-case">(opsional · upload file atau tempel URL)</span>
                </label>
                <div
                  onClick={() => gifInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); handleGifUpload(e.dataTransfer.files[0]); }}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-gray-400 transition-colors mb-2"
                >
                  {form.gifProject ? (
                    <div className="flex items-center gap-3 justify-center">
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">GIF</span>
                      <span className="text-sm text-gray-700 font-medium truncate max-w-[240px]">{form.gifProject}</span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setForm({ ...form, gifProject: "" }); }}
                        className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center shrink-0"
                      >
                        <X className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-5 h-5 text-gray-300 mx-auto mb-1" />
                      <p className="text-sm text-gray-500">{uploadingGif ? "Mengupload..." : "Drag & drop .gif atau klik"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">GIF only · maks 5MB</p>
                    </div>
                  )}
                </div>
                <input
                  ref={gifInputRef}
                  type="file"
                  accept=".gif,image/gif"
                  className="hidden"
                  onChange={(e) => handleGifUpload(e.target.files[0])}
                />
                <input
                  type="text"
                  value={form.gifProject || ""}
                  onChange={(e) => setForm({ ...form, gifProject: e.target.value })}
                  placeholder="Atau tempel URL GIF eksternal (misal dari Giphy)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  Deskripsi
                </label>
                <textarea
                  rows={3}
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  Tags <span className="text-gray-400 font-normal normal-case">(pisah koma)</span>
                </label>
                <input
                  type="text"
                  value={form.tags || ""}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  Fitur <span className="text-gray-400 font-normal normal-case">(pisah titik koma)</span>
                </label>
                <input
                  type="text"
                  value={form.fitur || ""}
                  onChange={(e) => setForm({ ...form, fitur: e.target.value })}
                  placeholder="Login, CRUD, Dashboard"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Fullstack</option>
                </select>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, selected: !form.selected })}
                  className={`w-10 h-6 rounded-full transition-colors flex items-center ${form.selected ? "bg-gray-900" : "bg-gray-200"}`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${form.selected ? "translate-x-4" : "translate-x-0"}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">Tampilkan di Home (Featured)</span>
              </label>

              {form.gifProject && (
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, isShowGif: !form.isShowGif })}
                    className={`w-10 h-6 rounded-full transition-colors flex items-center ${form.isShowGif ? "bg-blue-500" : "bg-gray-200"}`}
                  >
                    <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${form.isShowGif ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Tampilkan GIF di Modal (bukan gambar)</span>
                </label>
              )}
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={closeForm}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name}
                className="flex-1 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="font-bold text-gray-900 mb-2">Hapus Proyek?</h2>
            <p className="text-sm text-gray-500 mb-6">Aksi ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
