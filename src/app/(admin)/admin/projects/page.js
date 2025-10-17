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

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getCollection("projects");
      setProjects(data);
    } catch (err) {
      setError("Gagal mengambil data project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (data) => {
    await addToCollection("projects", data);
    setShowForm(false);
    setEditData(null);
    fetchProjects();
  };

  const handleEditProject = async (data) => {
    if (!editData) return;
    await updateDocument("projects", editData.id, data);
    setShowForm(false);
    setEditData(null);
    fetchProjects();
  };

  const handleDelete = async (id) => {
    const project = projects.find((p) => p.id === id);
    if (confirm("Hapus project ini?")) {
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
      fetchProjects();
    }
  };

  return (
    <div className="max-w-3xl py-8 mx-auto">
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
        className="max-w-2xl"
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
        <div className="grid gap-4 mt-6">
          {projects.length === 0 && <div>Tidak ada project.</div>}
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center p-4 bg-white shadow rounded-2xl"
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="object-cover w-24 h-16 mr-4 rounded"
                />
              )}
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-zinc-600">{p.description}</div>
              </div>
              <button
                className="px-3 py-1 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => {
                  setEditData(p);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => handleDelete(p.id)}
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
