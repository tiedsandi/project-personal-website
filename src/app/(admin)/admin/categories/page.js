"use client";
import { useEffect, useState } from "react";
import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";
import Modal from "@/components/ui/Modal";
import Skeleton from "@/components/ui/Skeleton";
import { toast } from "react-hot-toast";
import CategoryForm from "./CategoryForm";


export default function AdminSkillCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCollection("skillCategories");
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
        />
      </Modal>
      {loading ? (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl">
            <thead>
              <tr className="bg-zinc-100">
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Aktif</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td className="p-2"><Skeleton className="w-32 h-4" /></td>
                  <td className="p-2"><Skeleton className="w-16 h-4" /></td>
                  <td className="p-2"><Skeleton className="w-20 h-6 rounded" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl">
            <thead>
              <tr className="bg-zinc-100">
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Aktif</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 && (
                <tr><td colSpan={3} className="p-4 text-center">Tidak ada kategori.</td></tr>
              )}
              {categories.map((c) => (
                <tr key={c.id} className="border-b last:border-b-0">
                  <td className="p-2 font-semibold">{c.name}</td>
                  <td className="p-2">{c.isActive ? "Aktif" : "Nonaktif"}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}