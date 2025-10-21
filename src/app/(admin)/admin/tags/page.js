"use client";
import { useEffect, useState } from "react";

import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";
import Skeleton from "@/components/ui/Skeleton";
import { toast } from "react-hot-toast";

export default function AdminTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchTags = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCollection("tags");
      setTags(data);
    } catch (err) {
      setError("Gagal mengambil data tag");
      toast.error("Gagal mengambil data tag");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      if (editId) {
        await updateDocument("tags", editId, { name });
        toast.success("Berhasil mengedit tag");
      } else {
        await addToCollection("tags", { name });
        toast.success("Berhasil menambah tag");
      }
      setName("");
      setEditId(null);
      fetchTags();
    } catch (err) {
      toast.error(editId ? "Gagal mengedit tag" : "Gagal menambah tag");
    }
  };

  const handleEdit = (tag) => {
    setName(tag.name);
    setEditId(tag.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus tag ini?")) {
      try {
        await deleteDocument("tags", id);
        toast.success("Berhasil menghapus tag");
        fetchTags();
      } catch (err) {
        toast.error("Gagal menghapus tag");
      }
    }
  };

  return (
    <div className="w-full max-w-xl py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Manajemen Tags</h1>
      <form onSubmit={handleAddOrEdit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama tag"
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {editId ? "Update" : "Tambah"}
        </button>
        {editId && (
          <button
            type="button"
            className="px-4 py-2 rounded bg-zinc-200"
            onClick={() => {
              setName("");
              setEditId(null);
            }}
          >
            Batal
          </button>
        )}
      </form>
      {loading ? (
        <div className="grid gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white rounded shadow">
              <Skeleton className="w-32 h-4" />
              <div className="flex gap-2">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-20 h-6 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid gap-2">
          {tags.length === 0 && <div>Tidak ada tag.</div>}
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between p-3 bg-white rounded shadow"
            >
              <span>{tag.name}</span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(tag)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleDelete(tag.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
