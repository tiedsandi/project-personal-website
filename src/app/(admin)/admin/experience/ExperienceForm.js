"use client";

import { useState } from "react";

export default function ExperienceForm({ onSubmit, initialData }) {
  const [data, setData] = useState({
    title: initialData?.title || "",
    company: initialData?.company || "",
    startDate: initialData?.startDate || initialData?.date || "",
    endDate: initialData?.endDate || "",
    isCurrent: initialData?.isCurrent || false,
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
      if (!data.title || !data.company || !data.startDate || (!data.isCurrent && !data.endDate) || !data.description || !data.imageUrl) {
        setError("Semua field wajib diisi!");
        setLoading(false);
        return;
      }
      await onSubmit(data);
      setData({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
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
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Tanggal Mulai *</label>
          <input
            type="date"
            name="startDate"
            className="w-full px-3 py-2 border rounded"
            value={data.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Tanggal Selesai {" "}
            <span className="text-xs font-normal text-zinc-500">{data.isCurrent ? '(Sekarang)' : '(kosongkan jika sudah selesai)'}</span>
          </label>
          <input
            type="date"
            name="endDate"
            className={`w-full px-3 py-2 border rounded ${data.isCurrent ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : ''}`}
            value={data.isCurrent ? '' : data.endDate}
            onChange={handleChange}
            disabled={data.isCurrent}
            placeholder={data.isCurrent ? 'Sekarang' : ''}
          />
          <div className="flex items-center mt-1 gap-2">
            <input
              type="checkbox"
              id="isCurrent"
              name="isCurrent"
              checked={data.isCurrent}
              onChange={handleChange}
            />
            <label htmlFor="isCurrent" className="text-sm">{data.isCurrent ? 'Masih bekerja di sini (aktif)' : 'Masih bekerja di sini'}</label>
          </div>
        </div>
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
          {data.imageUrl && (
            <img src={data.imageUrl} alt="Preview" className="h-10 mt-2" />
          )}
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
