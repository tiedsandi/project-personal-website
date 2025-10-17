"use client";
import { useState } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { getCloudinaryPublicId } from "@/lib/cloudinary-util";

export default function ProjectForm({
  onSubmit,
  initialData,
  title = "Tambah Project",
  onClose,
}) {
  const [data, setData] = useState({
    name: initialData?.name || "",
    company: initialData?.company || "",
    date: initialData?.date || "",
    linkGithub: initialData?.linkGithub || "",
    description: initialData?.description || "",
    tags: initialData?.tags?.join(", ") || "",
    type: initialData?.type || "frontend",
    fitur: initialData?.fitur?.join("\n") || "",
    image: null,
    imageUrl: initialData?.imageUrl || "",
    gif: null,
    gifUrl: initialData?.gifUrl || "",
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
  const handleGifChange = (e) => {
    setData((prev) => ({
      ...prev,
      gif: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let url = data.imageUrl;
      let gifUrl = data.gifUrl;
      // Hapus gambar lama jika upload baru
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
      if (data.gif && data.gifUrl) {
        const publicId = getCloudinaryPublicId(data.gifUrl);
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
      if (data.gif) {
        gifUrl = await uploadImageToCloudinary(data.gif);
      }
      await onSubmit({
        name: data.name,
        company: data.company,
        date: data.date,
        linkGithub: data.linkGithub,
        description: data.description,
        tags: data.tags.split(",").map((t) => t.trim()),
        type: data.type,
        fitur: data.fitur.split("\n").map((f) => f.trim()),
        imageUrl: url,
        gifUrl,
      });
      setData({
        name: "",
        company: "",
        date: "",
        linkGithub: "",
        description: "",
        tags: "",
        type: "frontend",
        fitur: "",
        image: null,
        imageUrl: "",
        gif: null,
        gifUrl: "",
      });
    } catch (err) {
      setError("Gagal upload project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow rounded-2xl">
      {/* Modal Header Sticky */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 pt-4 pb-2 bg-white border-b">
        <h2 className="text-lg font-bold">{title}</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xl font-bold text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>
      {/* Modal Body Scrollable */}
      <div className="max-h-[70vh] overflow-y-auto px-4 pb-4">
        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <div>
              <label className="block mb-1 font-medium">
                Tanggal <span className="text-red-500">*</span>
              </label>
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
            <div className="md:col-span-2">
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
            <div>
              <label className="block mb-1 font-medium">
                Tags (pisahkan dengan koma){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tags"
                className="w-full px-3 py-2 border rounded"
                value={data.tags}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">
                Fitur (pisahkan dengan enter){" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="fitur"
                className="w-full px-3 py-2 border rounded"
                value={data.fitur}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Gambar Project <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {data.imageUrl && (
                <img
                  src={data.imageUrl}
                  alt="Preview"
                  className="object-cover w-32 h-20 mt-2 rounded"
                />
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Demo GIF</label>
              <input
                type="file"
                accept="image/gif"
                onChange={handleGifChange}
              />
              {data.gifUrl && (
                <img
                  src={data.gifUrl}
                  alt="Demo GIF"
                  className="object-cover w-32 h-20 mt-2 rounded"
                />
              )}
            </div>
          </div>
          {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 md:w-auto"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
