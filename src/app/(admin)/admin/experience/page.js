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
import Skeleton from "@/components/ui/Skeleton";
import { toast } from "react-hot-toast";


function AdminExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await getCollection("experiences");
      // Sort descending by date (assume YYYY-MM-DD or ISO, fallback to string compare)
      data.sort((a, b) => {
        const dateA = Date.parse(a.date) || a.date;
        const dateB = Date.parse(b.date) || b.date;
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
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
      await updateDocument("experiences", exp.id, { ...exp, isActive: !exp.isActive });
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

  return (
    <div className="w-full py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Experience</h1>
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
      {loading ? (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl">
            <thead>
              <tr className="bg-zinc-100">
                <th className="p-2 text-left">Gambar</th>
                <th className="p-2 text-left">Judul</th>
                <th className="p-2 text-left">Perusahaan</th>
                <th className="p-2 text-left">Periode</th>
                <th className="p-2 text-left">Aktif</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td className="p-2"><Skeleton className="w-16 h-10 rounded" /></td>
                  <td className="p-2"><Skeleton className="w-32 h-4" /></td>
                  <td className="p-2"><Skeleton className="w-24 h-4" /></td>
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
                <th className="p-2 text-left">Gambar</th>
                <th className="p-2 text-left">Judul</th>
                <th className="p-2 text-left">Perusahaan</th>
                <th className="p-2 text-left">Tanggal</th>
                <th className="p-2 text-left">Aktif</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {experiences.length === 0 && (
                <tr><td colSpan={6} className="p-4 text-center">Tidak ada experience.</td></tr>
              )}
              {experiences.map((e) => (
                <tr key={e.id} className="border-b last:border-b-0">
                  <td className="p-2">
                    <img
                      src={e.imageUrl}
                      alt={e.title}
                      className="object-cover w-16 h-10 rounded"
                      onError={ev => { ev.target.onerror = null; ev.target.src = "https://placehold.co/64x64?text=No+Image"; }}
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminExperiencePage;
