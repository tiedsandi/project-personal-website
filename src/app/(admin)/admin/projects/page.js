"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  getCollection,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firebaseService";
import ProjectForm from "./components/ProjectForm";
import Modal from "@/components/ui/Modal";
import { getCloudinaryPublicId } from "@/lib/cloudinary-util";
import { toast } from "react-hot-toast";
import Skeleton from "@/components/ui/Skeleton";
import { formatBulanTahun } from "@/utils/dateFormat";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const observerRef = useRef(null);

  // === FETCH PROJECTS ===
  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCollection("projects");
      const sorted = [...data].sort((a, b) => {
        if (b.isHighlighted !== a.isHighlighted) return b.isHighlighted - a.isHighlighted;
        const dateA = new Date(a.date || 0);
        const dateB = new Date(b.date || 0);
        if (dateB - dateA !== 0) return dateB - dateA;
        return (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0);
      });
      setProjects(sorted);
      setFilteredProjects(sorted);
    } catch (err) {
      setError("Gagal mengambil data project");
      toast.error("Gagal mengambil data project");
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const tags = await getCollection("tags");
      setTagList(tags);
    } catch {}
  };

  useEffect(() => {
    fetchProjects();
    fetchTags();
  }, []);

  // === SEARCH & FILTER ===
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = projects.filter((p) => {
      const matchesSearch =
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.tags?.some((id) => getTagName(id).toLowerCase().includes(term));
      const matchesType = filterType === "all" || p.type === filterType;
      return matchesSearch && matchesType;
    });
    setFilteredProjects(filtered);
    setVisibleCount(6);
  }, [searchTerm, filterType, projects]);

  // === INFINITE SCROLL ===
  const lastElementRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProjects.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 6);
            setLoadingMore(false);
          }, 700);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, filteredProjects.length, visibleCount]
  );

  // === CRUD HANDLERS ===
  const handleAddProject = async (data) => {
    try {
      await addToCollection("projects", data);
      toast.success("Berhasil menambah project");
      setShowForm(false);
      setEditData(null);
      fetchProjects();
    } catch {
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
    } catch {
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
      } catch {
        toast.error("Gagal menghapus project");
      }
    }
  };

  const getTagName = (id) => tagList.find((t) => t.id === id)?.name || id;

  // === UI ===
  return (
    <div className="w-full py-8 mx-auto">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Manajemen Projects</h1>
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Cari project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 text-sm border rounded-md w-52 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Filter Type */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">Semua Tipe</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
          </select>

          {/* Add button */}
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => {
              setShowForm(true);
              setEditData(null);
            }}
          >
            Tambah Project
          </button>
        </div>
      </div>

      {/* MODAL FORM */}
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

      {/* SKELETON LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden bg-white shadow rounded-2xl animate-pulse"
            >
              <Skeleton className="w-full h-32 sm:h-40 lg:h-32" />
              <div className="p-4 space-y-3">
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-1/2 h-3" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="w-10 h-4 rounded-full" />
                  <Skeleton className="w-16 h-4 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {/* PROJECT LIST */}
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.slice(0, visibleCount).map((p, idx) => (
              <div
                key={p.id}
                ref={idx === visibleCount - 1 ? lastElementRef : null}
                className={`relative flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden transition hover:scale-[1.02] hover:shadow-xl border
                  ${
                    p.isHighlighted
                      ? "border-blue-500"
                      : p.isActive
                      ? "border-green-500"
                      : "border-zinc-300"
                  }`}
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
                        className={`px-2 py-0.5 text-xs rounded font-bold ${
                          p.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-zinc-200 text-zinc-500"
                        }`}
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
                  <div className="mt-2 text-xs text-zinc-400">
                    {formatBulanTahun(p.date)}
                  </div>
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

          {/* LOADING MORE INDICATOR */}
          {loadingMore && (
            <div className="flex justify-center py-6">
              <Skeleton className="w-32 h-4" />
            </div>
          )}

          {/* EMPTY STATE */}
          {filteredProjects.length === 0 && !loading && (
            <div className="py-10 text-center text-zinc-500">
              Tidak ada project ditemukan.
            </div>
          )}
        </>
      )}
    </div>
  );
}
