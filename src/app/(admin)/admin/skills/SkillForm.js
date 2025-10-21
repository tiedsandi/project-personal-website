import { useState } from "react";
import Switch from "@/components/ui/Switch";

export default function SkillForm({ onSubmit, initialData, categories = [] }) {
  const [category, setCategory] = useState(initialData?.category || "");
  const [name, setName] = useState(initialData?.name || "");
  const [iconUrl, setIconUrl] = useState(initialData?.iconUrl || "");
  const [experience, setExperience] = useState(initialData?.experience || "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !name || !iconUrl) return;
    onSubmit({ category, name, iconUrl, experience, isActive });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Kategori</label>
        <select
          className="w-full px-3 py-2 border rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">Pilih kategori</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Nama Skill</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Icon URL</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={iconUrl}
          onChange={e => setIconUrl(e.target.value)}
          required
        />
        {iconUrl && (
          <img src={iconUrl} alt="icon preview" className="h-10 mt-2" />
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Experience/Deskripsi</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={experience}
          onChange={e => setExperience(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={isActive} onChange={() => setIsActive(v => !v)} />
        <span className="text-sm">Aktif</span>
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Simpan
      </button>
    </form>
  );
}
