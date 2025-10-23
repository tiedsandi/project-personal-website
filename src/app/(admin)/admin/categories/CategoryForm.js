import { useState, useEffect } from "react";


export default function CategoryForm({ onSubmit, initialData, onCancel, categories = [] }) {
  const [name, setName] = useState(initialData?.name || "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [order, setOrder] = useState(initialData?.order ?? (categories.length + 1));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialData) {
      setOrder(categories.length + 1);
    }
  }, [categories, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    // Cek order unik
    if (categories.some(cat => cat.order === Number(order) && (!initialData || cat.id !== initialData.id))) {
      setError("Nomor urut sudah dipakai, pilih urutan lain.");
      return;
    }
    setError("");
    onSubmit({ name, isActive, order: Number(order) });
    setName("");
    setIsActive(true);
    setOrder(categories.length + 2);
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
      <input
        type="number"
        min={1}
        value={order}
        onChange={e => setOrder(e.target.value)}
        placeholder="No urut"
        className="w-20 px-2 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Simpan
      </button>
      {error && <span className="ml-2 text-xs text-red-500">{error}</span>}
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
