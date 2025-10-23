"use client";

import { useEffect, useState } from "react";
import { formatPeriode } from "@/utils/dateFormat";
import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";

import Modal from "@/components/ui/Modal";
import EducationForm from "./EducationForm";
import Switch from "@/components/ui/Switch";

import Skeleton from "@/components/ui/Skeleton";
import { Toaster, toast } from "react-hot-toast";



function AdminEducationPage() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");


  const fetchEducations = async () => {
    setLoading(true);
    try {
      const data = await getCollection("educations");
      data.sort((a, b) => {
        const dateA = Date.parse(a.date) || a.date;
        const dateB = Date.parse(b.date) || b.date;
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
      });
      setEducations(data);
    } catch (err) {
      setError("Gagal mengambil data education");
      toast.error("Gagal mengambil data education");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleAddEducation = async (data) => {
    try {
      await addToCollection("educations", data);
      toast.success("Berhasil menambah education");
      setShowForm(false);
      setEditData(null);
      fetchEducations();
    } catch (err) {
      toast.error("Gagal menambah education");
    }
  };

  const handleEditEducation = async (data) => {
    if (!editData) return;
    try {
      await updateDocument("educations", editData.id, data);
      toast.success("Berhasil mengedit education");
      setShowForm(false);
      setEditData(null);
      fetchEducations();
    } catch (err) {
      toast.error("Gagal mengedit education");
    }
  };

  const handleToggleActive = async (edu) => {
    try {
      await updateDocument("educations", edu.id, { ...edu, isActive: !edu.isActive });
      toast.success("Status aktif berhasil diubah");
      fetchEducations();
    } catch (err) {
      toast.error("Gagal mengubah status aktif");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus education ini?")) {
      try {
        await deleteDocument("educations", id);
        toast.success("Berhasil menghapus education");
        fetchEducations();
      } catch (err) {
        toast.error("Gagal menghapus education");
      }
    }
  };

  return (
    <div className="w-full py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Education</h1>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => {
            setShowForm((v) => !v);
            setEditData(null);
          }}
        >
          {showForm && !editData ? "Batal" : "Tambah Education"}
        </button>
      </div>
      <Modal
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);
          if (!open) setEditData(null);
        }}
        title={editData ? "Edit Education" : "Tambah Education"}
        className="max-w-xl"
      >
        <EducationForm
          onSubmit={editData ? handleEditEducation : handleAddEducation}
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
                <th className="p-2 text-left">Tanggal</th>
                <th className="p-2 text-left">Aktif</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {educations.length === 0 && (
                <tr><td colSpan={6} className="p-4 text-center">Tidak ada education.</td></tr>
              )}
              {educations.map((e) => (
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

export default AdminEducationPage;
      