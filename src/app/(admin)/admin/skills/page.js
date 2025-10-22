"use client"
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
import Skeleton from "@/components/ui/Skeleton";
import { toast } from "react-hot-toast";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

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
      await updateDocument("skills", skill.id, { ...skill, isActive: !skill.isActive });
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

  return (
    <div className="w-full py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Skills</h1>
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
      {loading ? (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl">
            <thead>
              <tr className="bg-zinc-100">
                <th className="p-2 text-left">Kategori</th>
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Icon</th>
                <th className="p-2 text-left">Experience</th>
                <th className="p-2 text-left">Aktif</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td className="p-2"><Skeleton className="w-24 h-4" /></td>
                  <td className="p-2"><Skeleton className="w-32 h-4" /></td>
                  <td className="p-2"><Skeleton className="w-10 h-8 rounded" /></td>
                  <td className="p-2"><Skeleton className="w-20 h-4" /></td>
                  <td className="p-2"><Skeleton className="w-10 h-6 rounded-full" /></td>
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
                <th className="p-2 text-left">Kategori</th>
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Icon</th>
                <th className="p-2 text-left">Experience</th>
                <th className="p-2 text-left">Aktif</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {skills.length === 0 && (
                <tr><td colSpan={6} className="p-4 text-center">Tidak ada skill.</td></tr>
              )}
              {skills.map((s) => (
                <tr key={s.id} className="border-b last:border-b-0">
                  <td className="p-2">{s.category}</td>
                  <td className="p-2 font-semibold">{s.name}</td>
                  <td className="p-2"><img src={s.iconUrl} alt={s.name} className="h-8" /></td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}