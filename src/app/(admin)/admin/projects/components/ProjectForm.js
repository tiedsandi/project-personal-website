"use client";

import { useState, useEffect } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { getCloudinaryPublicId } from "@/lib/cloudinary-util";
import { getCollection } from "@/services/firebaseService";

export default function ProjectForm({ onSubmit, initialData }) {
  const [data, setData] = useState({
    name: initialData?.name || "",
    company: initialData?.company || "",
    date: initialData?.date || "",
    linkGithub: initialData?.linkGithub || "",
    description: initialData?.description || "",
    tags: Array.isArray(initialData?.tags) ? initialData.tags : [],
    type: initialData?.type || "frontend",
    fitur: initialData?.fitur?.join("\n") || "",
    image: null,
    imageUrl: initialData?.imageUrl || "",
    gif: null,
    gifUrl: initialData?.gifUrl || "",
    isHighlighted: initialData?.isHighlighted || false,
    isActive: initialData?.isActive ?? true,
  });

  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTags() {
      const tags = await getCollection("tags");
      setTagList(tags);
    }
    fetchTags();
  }, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagChange = (id, checked) => {
    setData((prev) => ({
      ...prev,
      tags: checked
        ? [...prev.tags, id]
        : prev.tags.filter((tid) => tid !== id),
    }));
  };

  const handleImageChange = (e) => {
    setData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleGifChange = (e) => {
    setData((prev) => ({ ...prev, gif: e.target.files[0] }));
  };

  // 🔹 Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!data.name || !data.date || !data.linkGithub || !data.description) {
        setError("Field bertanda * wajib diisi.");
        setLoading(false);
        return;
      }

      let imageUrl = data.imageUrl;
      let gifUrl = data.gifUrl;

      // Hapus gambar lama jika upload baru
      const deleteOld = async (url) => {
        if (!url) return;
        const publicId = getCloudinaryPublicId(url);
        if (publicId) {
          await fetch("/api/cloudinary/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
          });
        }
      };

      if (data.image && data.imageUrl) await deleteOld(data.imageUrl);
      if (data.gif && data.gifUrl) await deleteOld(data.gifUrl);

      // Upload baru
      if (data.image) imageUrl = await uploadImageToCloudinary(data.image);
      if (data.gif) gifUrl = await uploadImageToCloudinary(data.gif);

      // Submit ke parent
      await onSubmit({
        ...data,
        date: data.date, // sudah ISO string format yyyy-mm-dd
        fitur: data.fitur.split("\n").map((f) => f.trim()).filter(Boolean),
        imageUrl,
        gifUrl,
      });

      // Reset form
      setData({
        name: "",
        company: "",
        date: "",
        linkGithub: "",
        description: "",
        tags: [],
        type: "frontend",
        fitur: "",
        image: null,
        imageUrl: "",
        gif: null,
        gifUrl: "",
        isHighlighted: false,
        isActive: true,
      });
    } catch (err) {
      setError("Gagal menyimpan project");
    } finally {
      setLoading(false);
    }
  };

  // === UI ===
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
      {/* Checkbox Highlight / Active */}
      <div className="flex flex-col gap-2 md:flex-row md:gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isHighlighted"
            checked={data.isHighlighted}
            onChange={handleChange}
            className="accent-blue-600"
          />
          Highlight Project
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={data.isActive}
            onChange={handleChange}
            className="accent-green-600"
          />
          Aktif di Portfolio
        </label>
      </div>

      {/* Nama Project */}
      <div>
        <label className="block mb-1 font-medium">
          Nama Project <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border rounded"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Company */}
      <div>
        <label className="block mb-1 font-medium">Company</label>
        <input
          type="text"
          name="company"
          className="w-full px-3 py-2 border rounded"
          value={data.company}
          onChange={handleChange}
        />
      </div>

      {/* Tanggal */}
      <div>
        <label className="block mb-1 font-medium">
          Tanggal <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date"
          className="w-full px-3 py-2 border rounded"
          value={data.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Link Github */}
      <div>
        <label className="block mb-1 font-medium">
          Link Github <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          name="linkGithub"
          className="w-full px-3 py-2 border rounded"
          value={data.linkGithub}
          onChange={handleChange}
          required
        />
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block mb-1 font-medium">
          Deskripsi <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          className="w-full px-3 py-2 border rounded"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-1 font-medium">
          Tags <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {tagList.map((tag) => (
            <div
              key={tag.id}
              className={`cursor-pointer px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 transition
                ${
                  data.tags.includes(tag.id)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-zinc-100 hover:bg-zinc-200"
                }`}
              onClick={() => handleTagChange(tag.id, !data.tags.includes(tag.id))}
            >
              {tag.name}
              {data.tags.includes(tag.id) && (
                <span className="text-lg">&times;</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block mb-1 font-medium">
          Type <span className="text-red-500">*</span>
        </label>
        <select
          name="type"
          className="w-full px-3 py-2 border rounded"
          value={data.type}
          onChange={handleChange}
          required
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
        </select>
      </div>

      {/* Fitur */}
      <div>
        <label className="block mb-1 font-medium">
          Fitur (1 per baris) <span className="text-red-500">*</span>
        </label>
        <textarea
          name="fitur"
          className="w-full px-3 py-2 border rounded"
          value={data.fitur}
          onChange={handleChange}
          required
        />
      </div>

      {/* Gambar */}
      <div>
        <label className="block mb-1 font-medium">
          Gambar Project <span className="text-red-500">*</span>
        </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt="Preview"
            className="object-cover w-32 h-20 mt-2 rounded"
          />
        )}
      </div>

      {/* GIF */}
      <div>
        <label className="block mb-1 font-medium">Demo GIF</label>
        <input type="file" accept="image/gif" onChange={handleGifChange} />
        {data.gifUrl && (
          <img
            src={data.gifUrl}
            alt="Demo GIF"
            className="object-cover w-32 h-20 mt-2 rounded"
          />
        )}
      </div>

      {/* Error Message */}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan Project"}
      </button>
    </form>
  );
}
