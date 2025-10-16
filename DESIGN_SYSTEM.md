# Design System - Personal Website

## 1. Warna Utama
- **Primary:** #2563eb (blue-700 Tailwind)
- **Accent:** #f59e42 (orange-400 Tailwind)
- **Background:** #f9fafb (zinc-50 Tailwind)
- **Foreground:** #111827 (zinc-900 Tailwind)
- **Sidebar:** #dbeafe (blue-100 Tailwind)
- **Danger:** #ef4444 (red-500 Tailwind)

## 2. Typography
- **Font utama:** Spline Sans Mono (body)
- **Font logo:** Rubik Mono One
- **Ukuran judul:**
  - h1: 2.25rem (text-4xl)
  - h2: 1.5rem (text-2xl)
  - h3: 1.25rem (text-xl)
- **Font weight:**
  - Bold: 700
  - Medium: 500
  - Normal: 400

## 3. Spacing & Border Radius
- **Padding utama:** 1.5rem (p-6)
- **Gap antar elemen:** 1rem (gap-4)
- **Border radius:** 1rem (rounded-2xl)

## 4. Komponen UI
- **Button:**
  - Warna utama: bg-blue-600, text-white, rounded, hover:bg-blue-700
  - Danger: bg-red-500, hover:bg-red-600
- **Card:**
  - bg-white, shadow, rounded-2xl, p-6
- **Input:**
  - border, rounded, px-3 py-2, focus:ring-blue-500
- **Sidebar:**
  - bg-blue-100, nav link hover:underline, tombol logout di bawah
- **Loading Spinner:**
  - Ikon: FaSpinner (react-icons), animasi: animate-spin, warna: text-blue-600

## 5. Ikon
- **Library:** react-icons (fa, lucide, dsb)
- **Ukuran default:** text-xl (1.25rem)
- **Contoh:**
  - Loading: <FaSpinner />
  - Edit: <FaEdit />
  - Delete: <FaTrash />
  - Add: <FaPlus />

## 6. Animasi
- **Transisi:** tailwindcss-animate, framer-motion untuk animasi tab/daftar
- **Hover:** transisi warna, shadow, scale kecil

## 7. Responsive
- **Breakpoint utama:**
  - Mobile: px-4, text-base
  - Desktop: px-6, text-lg
  - Sidebar collapse di mobile (opsional)

## 8. Dokumentasi Komponen
- Semua komponen reusable diletakkan di `src/components/`
- Ikuti style dan utility class di atas agar konsisten
- Gunakan prop `className` untuk custom style jika perlu

---

> **Tips:**
> - Gunakan utility class Tailwind untuk konsistensi.
> - Ikon dari react-icons, pilih yang serasi dan mudah dipahami.
> - Semua warna dan font sudah tersedia di Tailwind config.
> - Update file ini jika ada perubahan design system.

---

## Contoh Penggunaan Button

```jsx
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Simpan
</button>
<button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
  Hapus
</button>
```

## Contoh Penggunaan Ikon

```jsx
import { FaSpinner, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

<FaSpinner className="animate-spin text-xl text-blue-600" />
<FaEdit className="text-xl text-blue-700" />
<FaTrash className="text-xl text-red-500" />
<FaPlus className="text-xl text-green-500" />
```
