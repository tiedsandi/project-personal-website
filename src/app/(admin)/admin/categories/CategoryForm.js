import { useState } from "react";

export default function CategoryForm({ onSubmit, initialData, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, isActive });
    setName("");
    setIsActive(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nama kategori"
        className="flex-1 px-3 py-2 border rounded"
      />
      <label className="flex items-center gap-1 text-sm">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(v => !v)}
          className="form-checkbox"
        />
        Aktif
      </label>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Simpan
      </button>
      {onCancel && (
        <button
          type="button"
          className="px-4 py-2 rounded bg-zinc-200"
          onClick={onCancel}
        >
          Batal
        </button>
      )}
    </form>
  );
}
