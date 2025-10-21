"use client";

import { useState } from "react";

export default function ExperienceForm({ onSubmit, initialData }) {
  const [data, setData] = useState({
    title: initialData?.title || "",
    company: initialData?.company || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
    isActive: initialData?.isActive ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!data.title || !data.company || !data.date || !data.description || !data.imageUrl) {
        setError("Semua field wajib diisi!");
        setLoading(false);
        return;
      }
      await onSubmit(data);
      setData({
        title: "",
        company: "",
        date: "",
        description: "",
        imageUrl: "",
        isActive: true,
      });
    } catch (err) {
      setError("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Judul Pengalaman *</label>
        <input
          type="text"
          name="title"
          className="w-full px-3 py-2 border rounded"
          value={data.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Perusahaan *</label>
        <input
          type="text"
          name="company"
          className="w-full px-3 py-2 border rounded"
          value={data.company}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Tanggal *</label>
        <input
          type="text"
          name="date"
          className="w-full px-3 py-2 border rounded"
          value={data.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Deskripsi *</label>
        <textarea
          name="description"
          className="w-full px-3 py-2 border rounded"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">URL Gambar *</label>
        <input
          type="url"
          name="imageUrl"
          className="w-full px-3 py-2 border rounded"
          value={data.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={data.isActive}
          onChange={handleChange}
          className="accent-blue-600"
        />
        <label className="font-medium">Tampilkan di CV Generator</label>
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
