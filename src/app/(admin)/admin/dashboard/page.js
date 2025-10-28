"use client";

import { useState } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { getCloudinaryPublicId } from "@/lib/cloudinary-util";

export default function DashboardPage() {
  // State hero
  const [hero, setHero] = useState({
    name: "",
    role: "",
    description: "",
    emoji: "",
    tags: [],
    socials: { email: "", github: "", linkedin: "" },
    photos: [], // array of url
  });
  const [loading, setLoading] = useState(false);
  const [photoFiles, setPhotoFiles] = useState([]);

  // Upload foto ke Cloudinary
  const handleUploadPhoto = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const uploaded = await Promise.all(
        files.map((file) => uploadImageToCloudinary(file, "personal-photo"))
      );
      setHero((h) => ({ ...h, photos: [...h.photos, ...uploaded] }));
    } catch (err) {
      alert("Gagal upload foto");
    }
    setLoading(false);
  };

  // Hapus foto dari Cloudinary
  const handleDeletePhoto = async (url) => {
    setLoading(true);
    try {
      const publicId = getCloudinaryPublicId(url);
      await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      setHero((h) => ({ ...h, photos: h.photos.filter((p) => p !== url) }));
    } catch (err) {
      alert("Gagal hapus foto");
    }
    setLoading(false);
  };

  // Handler input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHero((h) => ({ ...h, [name]: value }));
  };

  // Handler socials
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setHero((h) => ({ ...h, socials: { ...h.socials, [name]: value } }));
  };

  // Handler tags
  const handleTagsChange = (e) => {
    setHero((h) => ({ ...h, tags: e.target.value.split(",") }));
  };

  // Simpan data hero (dummy, nanti bisa ke Firestore)
  const handleSave = () => {
    alert("Data hero berhasil disimpan (dummy)");
  };

  return (
    <div className="max-w-3xl py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Pengaturan Hero</h1>
      <form className="space-y-6">
        {/* Foto */}
        <div>
          <label className="block mb-2 font-medium">Foto Personal (bisa banyak)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUploadPhoto}
            disabled={loading}
            className="mb-2"
          />
          <div className="flex flex-wrap gap-4">
            {hero.photos.map((url, idx) => (
              <div key={idx} className="relative group">
                <img src={url} alt="Personal" className="object-cover w-24 h-24 border rounded-full" />
                <button
                  type="button"
                  className="absolute px-2 py-1 text-xs text-white bg-red-600 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                  onClick={() => handleDeletePhoto(url)}
                  disabled={loading}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Nama, Role, Emoji */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block mb-1">Nama</label>
            <input name="name" value={hero.name} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <input name="role" value={hero.role} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Emoji</label>
            <input name="emoji" value={hero.emoji} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block mb-1">Deskripsi</label>
          <textarea name="description" value={hero.description} onChange={handleChange} className="w-full px-2 py-1 border rounded" rows={3} />
        </div>

        {/* Tag */}
        <div>
          <label className="block mb-1">Tag (pisahkan dengan koma)</label>
          <input value={hero.tags.join(",")} onChange={handleTagsChange} className="w-full px-2 py-1 border rounded" />
        </div>

        {/* Link Medsos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block mb-1">Email</label>
            <input name="email" value={hero.socials.email} onChange={handleSocialChange} className="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Github</label>
            <input name="github" value={hero.socials.github} onChange={handleSocialChange} className="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="block mb-1">LinkedIn</label>
            <input name="linkedin" value={hero.socials.linkedin} onChange={handleSocialChange} className="w-full px-2 py-1 border rounded" />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button type="button" className="px-4 py-2 text-white bg-blue-600 rounded" onClick={handleSave} disabled={loading}>
            Simpan
          </button>
          <button type="reset" className="px-4 py-2 rounded bg-zinc-300 text-zinc-700" disabled={loading}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}