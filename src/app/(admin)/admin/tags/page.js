"use client";
import { useEffect, useState } from "react";
import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";
import TableWithSkeleton from "@/components/ui/TableWithSkeleton";
import Modal from "@/components/ui/Modal";
import { toast } from "react-hot-toast";

export default function AdminTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tagName, setTagName] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  // === FETCH TAGS ===
  const fetchTags = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCollection("tags");
      data.sort((a, b) => a.name.localeCompare(b.name));
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

  // === ADD / EDIT ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      toast.error("Nama tag tidak boleh kosong");
      return;
    }

    try {
      if (editData) {
        await updateDocument("tags", editData.id, { name: tagName });
        toast.success("Berhasil mengedit tag");
      } else {
        await addToCollection("tags", { name: tagName });
        toast.success("Berhasil menambah tag");
      }
      setShowForm(false);
      setEditData(null);
      setTagName("");
      fetchTags();
    } catch (err) {
      toast.error(editData ? "Gagal mengedit tag" : "Gagal menambah tag");
    }
  };

  const handleEdit = (tag) => {
    setEditData(tag);
    setTagName(tag.name);
    setShowForm(true);
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

  // === FILTER + PAGINATION ===
  const filteredTags = tags.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTags.length / limit);
  const paginatedData = filteredTags.slice((page - 1) * limit, page * limit);

  // === TABLE CONFIG ===
  const columns = [
    { key: "name", label: "Nama Tag" },
    { key: "actions", label: "Aksi" },
  ];

  const renderRow = (tag, i) => (
    <tr key={tag.id || i} className="border-b last:border-b-0">
      <td className="p-2">{tag.name}</td>
      <td className="flex gap-2 p-2">
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
      </td>
    </tr>
  );

  return (
    <div className="w-full py-8 mx-auto">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Manajemen Tags</h1>

        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
          {/* 🔍 SEARCH BAR */}
          <input
            type="text"
            placeholder="Cari tag..."
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
              setShowForm(true);
              setEditData(null);
              setTagName("");
            }}
          >
            Tambah Tag
          </button>
        </div>
      </div>

      {/* MODAL FORM */}
      <Modal
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);
          if (!open) {
            setEditData(null);
            setTagName("");
          }
        }}
        title={editData ? "Edit Tag" : "Tambah Tag"}
        className="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Nama Tag
            </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Masukkan nama tag"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded text-zinc-700 bg-zinc-200 hover:bg-zinc-300"
              onClick={() => {
                setShowForm(false);
                setEditData(null);
                setTagName("");
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {editData ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </Modal>

      {/* TABLE */}
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
