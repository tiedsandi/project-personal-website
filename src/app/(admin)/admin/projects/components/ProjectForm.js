"use client";
import { useState } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { getCloudinaryPublicId } from "@/lib/cloudinary-util";

// ...existing code...

export default function ProjectForm({ onSubmit, initialData }) {
  const [data, setData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: null,
    imageUrl: initialData?.imageUrl || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let url = data.imageUrl;
      if (data.image && data.imageUrl) {
        const publicId = getCloudinaryPublicId(data.imageUrl);
        if (publicId) {
          await fetch("/api/cloudinary/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
          });
        }
      }
      if (data.image) {
        url = await uploadImageToCloudinary(data.image);
      }
      await onSubmit({
        name: data.name,
        description: data.description,
        imageUrl: url,
      });
      setData({
        name: "",
        description: "",
        image: null,
        imageUrl: "",
      });
    } catch (err) {
      setError("Gagal upload project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white shadow rounded-2xl">
      <div>
        <label className="block mb-1 font-medium">Nama Project</label>
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border rounded"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Deskripsi</label>
        <textarea
          name="description"
          className="w-full px-3 py-2 border rounded"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Gambar/GIF</label>
        <input type="file" accept="image/*,image/gif" onChange={handleImageChange} />
        {data.imageUrl && (
          <img src={data.imageUrl} alt="Preview" className="object-cover w-32 h-20 mt-2 rounded" />
        )}
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan Project"}
      </button>
    </form>
  );
}
