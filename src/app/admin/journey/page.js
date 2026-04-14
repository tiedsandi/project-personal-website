"use client";

import { useState, useEffect } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import Field from "@/components/admin/Field";

const EMPTY_FORM = { year_label: "", text: "", sort_order: 0 };

const COLUMNS = [
  { key: "sort_order", label: "Urutan", sortable: true },
  { key: "year_label", label: "Tahun", sortable: true },
  { key: "text", label: "Cerita" },
  { key: "actions", label: "Aksi", align: "right" },
];

export default function AdminJourneyPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetch("/api/admin/journey")
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setForm({ ...EMPTY_FORM, sort_order: items.length });
    setEditId(null);
    setError("");
    setModal("create");
  };

  const openEdit = (item) => {
    setForm({
      year_label: item.year_label,
      text: item.text,
      sort_order: item.sort_order,
    });
    setEditId(item.id);
    setError("");
    setModal("edit");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (modal === "create") {
        const res = await fetch("/api/admin/journey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Gagal menyimpan");
          return;
        }
        setItems((prev) =>
          [...prev, data].sort((a, b) => a.sort_order - b.sort_order),
        );
      } else {
        const res = await fetch(`/api/admin/journey/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Gagal menyimpan");
          return;
        }
        setItems((prev) =>
          prev
            .map((i) => (i.id === editId ? data : i))
            .sort((a, b) => a.sort_order - b.sort_order),
        );
      }
      setModal(null);
    } catch {
      setError("Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, label) => {
    if (!confirm(`Hapus entri "${label}"?`)) return;
    setDeletingId(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    const res = await fetch(`/api/admin/journey/${id}`, { method: "DELETE" });
    if (!res.ok) {
      fetch("/api/admin/journey")
        .then((r) => r.json())
        .then((d) => setItems(Array.isArray(d) ? d : []));
    }
    setDeletingId(null);
  };

  return (
    <div className="p-10">
      <AdminPageHeader
        label="Master Data"
        title="JOURNEY"
        subtitle="Perjalanan karir yang tampil di section About."
        onAdd={openCreate}
        addLabel="+ Tambah Entri"
      />

      <AdminTable
        columns={COLUMNS}
        data={items}
        loading={loading}
        emptyMessage="Belum ada entri. Tambahkan perjalanan pertamamu!"
        totalCount={items.length}
        renderRow={(item) => (
          <tr
            key={item.id}
            className={`border-b border-border transition-all duration-200 ${
              deletingId === item.id
                ? "opacity-0"
                : "opacity-100 hover:bg-[#0a0a0a]"
            }`}
          >
            <td className="px-5 py-4 text-muted text-[12px] w-[80px]">
              {item.sort_order}
            </td>
            <td className="px-5 py-4">
              <span className="text-[12px] font-mono text-accent">
                {item.year_label}
              </span>
            </td>
            <td className="px-5 py-4 text-muted text-[13px] max-w-[400px]">
              <span className="line-clamp-2">{item.text}</span>
            </td>
            <td className="px-5 py-4 text-right">
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => openEdit(item)}
                  className="text-[11px] text-muted hover:text-white border border-border px-3 py-1.5 transition-colors cursor-pointer bg-transparent"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.year_label)}
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
        title={modal === "create" ? "TAMBAH ENTRI" : "EDIT ENTRI"}
        onClose={() => setModal(null)}
        maxWidth="max-w-[480px]"
      >
        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Label Tahun *">
              <input
                required
                value={form.year_label}
                onChange={(e) =>
                  setForm({ ...form, year_label: e.target.value })
                }
                className="input-admin"
                placeholder="2023 atau now"
                autoFocus
              />
            </Field>
            <Field label="Urutan">
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({
                    ...form,
                    sort_order: parseInt(e.target.value) || 0,
                  })
                }
                className="input-admin"
              />
            </Field>
          </div>
          <Field label="Cerita *">
            <textarea
              required
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="input-admin resize-none h-24"
              placeholder="Ceritakan apa yang terjadi di periode ini..."
            />
          </Field>
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
