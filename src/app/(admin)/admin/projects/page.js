"use client";
import { useEffect, useState } from "react";
import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";
import ProjectForm from "./components/ProjectForm";
import Modal from "@/components/ui/Modal";
import { getCloudinaryPublicId } from "@/lib/cloudinary-util";
import { Toaster, toast } from "react-hot-toast";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");

  // Definisi fetchProjects di luar useEffect
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getCollection("projects");
      // Sort: isHighlighted true dulu, lalu tanggal terbaru, lalu isActive true dulu
      const sorted = [...data].sort((a, b) => {
        if (b.isHighlighted !== a.isHighlighted) {
          return b.isHighlighted - a.isHighlighted;
        }
        // Tanggal format: "10 Mei 2024" → YYYY-MM-DD
        const parseDate = (d) => {
          if (!d) return 0;
          const [day, month, year] = d.split(" ");
          const monthMap = {
            Januari: "01",
            Februari: "02",
            Maret: "03",
            April: "04",
            Mei: "05",
            Juni: "06",
            Juli: "07",
            Agustus: "08",
            September: "09",
            Oktober: "10",
            November: "11",
            Desember: "12",
          };
          return `${year}-${monthMap[month] || "01"}-${day.padStart(2, "0")}`;
        };
        const dateCompare = parseDate(b.date).localeCompare(parseDate(a.date));
        if (dateCompare !== 0) return dateCompare;
        if ((b.isActive ? 1 : 0) !== (a.isActive ? 1 : 0)) {
          return (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0);
        }
        return 0;
      });
      setProjects(sorted);
    } catch (err) {
      setError("Gagal mengambil data project");
      toast.error("Gagal mengambil data project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Ambil semua tag dari Firestore
  const fetchTags = async () => {
    try {
      const tags = await getCollection("tags");
      setTagList(tags);
    } catch {}
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAddProject = async (data) => {
    try {
      await addToCollection("projects", data);
      toast.success("Berhasil menambah project");
      setShowForm(false);
      setEditData(null);
      fetchProjects();
    } catch (err) {
      toast.error("Gagal menambah project");
    }
  };

  const handleEditProject = async (data) => {
    if (!editData) return;
    try {
      await updateDocument("projects", editData.id, data);
      toast.success("Berhasil mengedit project");
      setShowForm(false);
      setEditData(null);
      fetchProjects();
    } catch (err) {
      toast.error("Gagal mengedit project");
    }
  };

  const handleDelete = async (id) => {
    const project = projects.find((p) => p.id === id);
    if (confirm("Hapus project ini?")) {
      try {
        if (project?.imageUrl) {
          const publicId = getCloudinaryPublicId(project.imageUrl);
          if (publicId) {
            await fetch("/api/cloudinary/delete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ publicId }),
            });
          }
        }
        await deleteDocument("projects", id);
        toast.success("Berhasil menghapus project");
        fetchProjects();
      } catch (err) {
        toast.error("Gagal menghapus project");
      }
    }
  };

  // Helper: id ke nama tag
  const getTagName = (id) => tagList.find((t) => t.id === id)?.name || id;

  return (
    <div className="w-full py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Projects</h1>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => {
            setShowForm((v) => !v);
            setEditData(null);
          }}
        >
          {showForm && !editData ? "Batal" : "Tambah Project"}
        </button>
      </div>
      <Modal
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);
          if (!open) setEditData(null);
        }}
        title={editData ? "Edit Project" : "Tambah Project"}
        className="max-w-4xl"
      >
        <ProjectForm
          onSubmit={editData ? handleEditProject : handleAddProject}
          initialData={editData}
        />
      </Modal>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.length === 0 && (
            <div className="col-span-full">Tidak ada project.</div>
          )}
          {projects.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden transition hover:scale-[1.02] hover:shadow-xl border
                ${
                  p.isHighlighted
                    ? "border-blue-500"
                    : p.isActive
                    ? "border-green-500"
                    : "border-zinc-300"
                }
              `}
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="object-cover w-full h-32 sm:h-40 lg:h-32"
                />
              )}
              <div className="flex flex-col flex-1 gap-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold truncate">{p.name}</div>
                  <div className="flex gap-1">
                    {p.isHighlighted && (
                      <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded font-bold">
                        Highlight
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 text-xs rounded font-bold
                        ${
                          p.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-zinc-200 text-zinc-500"
                        }
                      `}
                    >
                      {p.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-zinc-600 line-clamp-2">
                  {p.description}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.tags?.map((tagId) => (
                    <span
                      key={tagId}
                      className="px-2 py-0.5 text-xs bg-zinc-100 rounded text-zinc-700"
                    >
                      {getTagName(tagId)}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-zinc-400">{p.date}</div>
              </div>
              <div className="flex gap-2 px-4 pb-4">
                <button
                  className="flex-1 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={() => {
                    setEditData(p);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="flex-1 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleDelete(p.id)}
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
