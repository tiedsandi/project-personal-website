"use client";
import { useEffect, useState } from "react";
import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";
import Modal from "@/components/ui/Modal";
import Switch from "@/components/ui/Switch";
import SkillForm from "./SkillForm";
import { toast } from "react-hot-toast";
import TableWithSkeleton from "@/components/ui/TableWithSkeleton";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // pagination states
  const [page, setPage] = useState(1);
  const limit = 8;

  // search state
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSkills = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCollection("skills");
      setSkills(data);
    } catch (err) {
      setError("Gagal mengambil data skills");
      toast.error("Gagal mengambil data skills");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCollection("skillCategories");
      setCategories(data.filter((cat) => cat.isActive));
    } catch (err) {
      toast.error("Gagal mengambil kategori skill");
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchCategories();
  }, []);

  const handleAddSkill = async (data) => {
    try {
      await addToCollection("skills", data);
      toast.success("Berhasil menambah skill");
      setShowForm(false);
      setEditData(null);
      fetchSkills();
    } catch (err) {
      toast.error("Gagal menambah skill");
    }
  };

  const handleEditSkill = async (data) => {
    if (!editData) return;
    try {
      await updateDocument("skills", editData.id, data);
      toast.success("Berhasil mengedit skill");
      setShowForm(false);
      setEditData(null);
      fetchSkills();
    } catch (err) {
      toast.error("Gagal mengedit skill");
    }
  };

  const handleToggleActive = async (skill) => {
    try {
      await updateDocument("skills", skill.id, {
        ...skill,
        isActive: !skill.isActive,
      });
      toast.success("Status aktif berhasil diubah");
      fetchSkills();
    } catch (err) {
      toast.error("Gagal mengubah status aktif");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus skill ini?")) {
      try {
        await deleteDocument("skills", id);
        toast.success("Berhasil menghapus skill");
        fetchSkills();
      } catch (err) {
        toast.error("Gagal menghapus skill");
      }
    }
  };

  // ======== FILTER DATA BERDASARKAN PENCARIAN ========
  const filteredSkills = skills.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.name?.toLowerCase().includes(term) ||
      s.category?.toLowerCase().includes(term) ||
      s.experience?.toLowerCase().includes(term)
    );
  });

  // ======== PAGINATION SESUDAH FILTER =========
  const totalPages = Math.ceil(filteredSkills.length / limit);
  const paginatedData = filteredSkills.slice((page - 1) * limit, page * limit);

  const columns = [
    { key: "category", label: "Kategori" },
    { key: "name", label: "Nama" },
    { key: "icon", label: "Icon" },
    { key: "experience", label: "Experience" },
    { key: "active", label: "Aktif" },
    { key: "actions", label: "Aksi" },
  ];

  const renderRow = (s, i) => (
    <tr key={s.id || i} className="border-b last:border-b-0">
      <td className="p-2">{s.category}</td>
      <td className="p-2 font-semibold">{s.name}</td>
      <td className="p-2">
        <img src={s.iconUrl} alt={s.name} className="h-8" />
      </td>
      <td className="p-2">{s.experience}</td>
      <td className="p-2">
        <Switch checked={s.isActive} onChange={() => handleToggleActive(s)} />
      </td>
      <td className="flex gap-2 p-2">
        <button
          className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => {
            setEditData(s);
            setShowForm(true);
          }}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => handleDelete(s.id)}
        >
          Hapus
        </button>
      </td>
    </tr>
  );

  return (
    <div className="w-full py-8 mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Manajemen Skills</h1>
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
          {/* 🔍 Input Search */}
          <input
            type="text"
            placeholder="Cari skill..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset ke halaman 1 setiap kali cari
            }}
            className="px-3 py-2 text-sm border rounded-md w-52 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => {
              setShowForm((v) => !v);
              setEditData(null);
            }}
          >
            {showForm && !editData ? "Batal" : "Tambah Skill"}
          </button>
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);
          if (!open) setEditData(null);
        }}
        title={editData ? "Edit Skill" : "Tambah Skill"}
        className="max-w-xl"
      >
        <SkillForm
          onSubmit={editData ? handleEditSkill : handleAddSkill}
          initialData={editData}
          categories={categories.map((cat) => cat.name)}
        />
      </Modal>

      {/* Table Section */}
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
