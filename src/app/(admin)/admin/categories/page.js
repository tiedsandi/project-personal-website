"use client";
import { useEffect, useState } from "react";
import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";
import Modal from "@/components/ui/Modal";
import TableWithSkeleton from "@/components/ui/TableWithSkeleton";
import Switch from "@/components/ui/Switch";
import { toast } from "react-hot-toast";
import CategoryForm from "./CategoryForm";


export default function AdminSkillCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(categories.length / pageSize);
  const pagedCategories = categories.slice((page - 1) * pageSize, page * pageSize);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCollection("skillCategories");
      // Urutkan berdasarkan order ascending
      data.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
      setCategories(data);
    } catch (err) {
      setError("Gagal mengambil data kategori");
      toast.error("Gagal mengambil data kategori");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (data) => {
    try {
      await addToCollection("skillCategories", data);
      toast.success("Berhasil menambah kategori");
      setShowForm(false);
      setEditData(null);
      fetchCategories();
    } catch (err) {
      toast.error("Gagal menambah kategori");
    }
  };

  const handleEditCategory = async (data) => {
    if (!editData) return;
    try {
      await updateDocument("skillCategories", editData.id, data);
      toast.success("Berhasil mengedit kategori");
      setShowForm(false);
      setEditData(null);
      fetchCategories();
    } catch (err) {
      toast.error("Gagal mengedit kategori");
    }
  };

  const handleToggleActive = async (cat) => {
    try {
      await updateDocument("skillCategories", cat.id, { ...cat, isActive: !cat.isActive });
      toast.success("Status aktif berhasil diubah");
      fetchCategories();
    } catch (err) {
      toast.error("Gagal mengubah status aktif");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus kategori ini?")) {
      try {
        await deleteDocument("skillCategories", id);
        toast.success("Berhasil menghapus kategori");
        fetchCategories();
      } catch (err) {
        toast.error("Gagal menghapus kategori");
      }
    }
  };

  return (
    <div className="w-full py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Kategori Skill</h1>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => {
            setShowForm((v) => !v);
            setEditData(null);
          }}
        >
          {showForm && !editData ? "Batal" : "Tambah Kategori"}
        </button>
      </div>
      <Modal
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);
          if (!open) setEditData(null);
        }}
        title={editData ? "Edit Kategori" : "Tambah Kategori"}
        className="max-w-xl"
      >
        <CategoryForm
          onSubmit={editData ? handleEditCategory : handleAddCategory}
          initialData={editData}
          categories={categories}
        />
      </Modal>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <TableWithSkeleton
          columns={[
            { key: "order", label: "No" },
            { key: "name", label: "Nama" },
            { key: "isActive", label: "Aktif" },
            { key: "aksi", label: "Aksi" },
          ]}
          data={pagedCategories}
          loading={loading}
          skeletonRows={pageSize}
          renderRow={(c, idx) => (
            <tr key={c.id} className="border-b last:border-b-0">
              <td className="p-2 font-semibold">{c.order ?? '-'}</td>
              <td className="p-2 font-semibold">{c.name}</td>
              <td className="p-2">
                <Switch checked={c.isActive} onChange={() => handleToggleActive(c)} />
              </td>
              <td className="flex gap-2 p-2">
                <button
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={() => {
                    setEditData(c);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleDelete(c.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          )}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}