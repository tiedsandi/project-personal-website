"use client";
import { useEffect, useState } from "react";
import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";

export default function AdminTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchTags = async () => {
    setLoading(true);
    try {
      const data = await getCollection("tags");
      setTags(data);
    } catch (err) {
      setError("Gagal mengambil data tag");
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
    if (editId) {
      await updateDocument("tags", editId, { name });
    } else {
      await addToCollection("tags", { name });
    }
    setName("");
    setEditId(null);
    fetchTags();
  };

  const handleEdit = (tag) => {
    setName(tag.name);
    setEditId(tag.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus tag ini?")) {
      await deleteDocument("tags", id);
      fetchTags();
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
        <div>Loading...</div>
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
