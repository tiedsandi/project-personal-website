"use client";

import { formatPeriode } from "@/utils/dateFormat";
import { useEffect, useState } from "react";
import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";

import Modal from "@/components/ui/Modal";
import ExperienceForm from "./ExperienceForm";
import Switch from "@/components/ui/Switch";
import TableWithSkeleton from "@/components/ui/TableWithSkeleton";
import { toast } from "react-hot-toast";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  // ===== FETCH DATA =====
  const fetchExperiences = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCollection("experiences");
      // urutkan berdasarkan tanggal terbaru
      data.sort((a, b) => {
        const dateA = Date.parse(a.startDate) || 0;
        const dateB = Date.parse(b.startDate) || 0;
        return dateB - dateA;
      });
      setExperiences(data);
    } catch (err) {
      setError("Gagal mengambil data experience");
      toast.error("Gagal mengambil data experience");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // ===== CRUD HANDLERS =====
  const handleAddExperience = async (data) => {
    try {
      await addToCollection("experiences", data);
      toast.success("Berhasil menambah experience");
      setShowForm(false);
      setEditData(null);
      fetchExperiences();
    } catch (err) {
      toast.error("Gagal menambah experience");
    }
  };

  const handleEditExperience = async (data) => {
    if (!editData) return;
    try {
      await updateDocument("experiences", editData.id, data);
      toast.success("Berhasil mengedit experience");
      setShowForm(false);
      setEditData(null);
      fetchExperiences();
    } catch (err) {
      toast.error("Gagal mengedit experience");
    }
  };

  const handleToggleActive = async (exp) => {
    try {
      await updateDocument("experiences", exp.id, {
        ...exp,
        isActive: !exp.isActive,
      });
      toast.success("Status aktif berhasil diubah");
      fetchExperiences();
    } catch (err) {
      toast.error("Gagal mengubah status aktif");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus experience ini?")) {
      try {
        await deleteDocument("experiences", id);
        toast.success("Berhasil menghapus experience");
        fetchExperiences();
      } catch (err) {
        toast.error("Gagal menghapus experience");
      }
    }
  };

  // ===== FILTER + PAGINATION =====
  const filteredExperiences = experiences.filter((e) => {
    const term = searchTerm.toLowerCase();
    return (
      e.title?.toLowerCase().includes(term) ||
      e.company?.toLowerCase().includes(term) ||
      formatPeriode(e.startDate, e.endDate, e.isCurrent)
        ?.toLowerCase()
        .includes(term)
    );
  });

  const totalPages = Math.ceil(filteredExperiences.length / limit);
  const paginatedData = filteredExperiences.slice(
    (page - 1) * limit,
    page * limit
  );

  // ===== TABLE CONFIG =====
  const columns = [
    { key: "image", label: "Gambar" },
    { key: "title", label: "Judul" },
    { key: "company", label: "Perusahaan" },
    { key: "periode", label: "Periode" },
    { key: "active", label: "Aktif" },
    { key: "actions", label: "Aksi" },
  ];

  const renderRow = (e, i) => (
    <tr key={e.id || i} className="border-b last:border-b-0">
      <td className="p-2">
        <img
          src={e.imageUrl}
          alt={e.title}
          className="object-cover w-16 h-10 rounded"
          onError={(ev) => {
            ev.target.onerror = null;
            ev.target.src = "https://placehold.co/64x64?text=No+Image";
          }}
        />
      </td>
      <td className="p-2 font-semibold">{e.title}</td>
      <td className="p-2">{e.company}</td>
      <td className="p-2">
        {formatPeriode(e.startDate, e.endDate, e.isCurrent)}
      </td>
      <td className="p-2">
        <Switch checked={e.isActive} onChange={() => handleToggleActive(e)} />
      </td>
      <td className="flex gap-2 p-2">
        <button
          className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => {
            setEditData(e);
            setShowForm(true);
          }}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => handleDelete(e.id)}
        >
          Hapus
        </button>
      </td>
    </tr>
  );

  return (
    <div className="w-full py-8 mx-auto">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Manajemen Experience</h1>

        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
          {/* 🔍 SEARCH BAR */}
          <input
            type="text"
            placeholder="Cari experience..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-sm border rounded-md w-52 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* ADD BUTTON */}
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => {
              setShowForm((v) => !v);
              setEditData(null);
            }}
          >
            {showForm && !editData ? "Batal" : "Tambah Experience"}
          </button>
        </div>
      </div>

      {/* MODAL FORM */}
      <Modal
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);
          if (!open) setEditData(null);
        }}
        title={editData ? "Edit Experience" : "Tambah Experience"}
        className="max-w-xl"
      >
        <ExperienceForm
          onSubmit={editData ? handleEditExperience : handleAddExperience}
          initialData={editData}
        />
      </Modal>

      {/* TABLE DISPLAY */}
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <TableWithSkeleton
          columns={columns}
          data={paginatedData}
          loading={loading}
          skeletonRows={3}
          renderRow={renderRow}
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}
