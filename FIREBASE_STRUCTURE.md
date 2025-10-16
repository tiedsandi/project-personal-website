# Struktur Database Firestore untuk Personal Website

Berikut struktur koleksi dan dokumen yang direkomendasikan untuk komponen Experience, Education, Skills, dan Projects:

## 1. experience
- **Koleksi:** `experience`
- **Dokumen:**
  - `role`: string (contoh: "Outsystems Developer")
  - `company`: string (contoh: "Sinarmas Land")
  - `startDate`: timestamp/string (contoh: "2023-11")
  - `endDate`: timestamp/string/null (contoh: "2024-08" atau null jika masih aktif)
  - `description`: string
  - `logoUrl`: string (opsional, URL gambar perusahaan)

## 2. education
- **Koleksi:** `education`
- **Dokumen:**
  - `title`: string (contoh: "S1 - Informatika, UPNVJ")
  - `institution`: string (contoh: "UPN Veteran Jakarta")
  - `dateStart`: timestamp/string
  - `dateEnd`: timestamp/string
  - `description`: string
  - `imageUrl`: string (opsional, logo kampus/lembaga)

## 3. skills
- **Koleksi:** `skills`
- **Dokumen:**
  - `category`: string (contoh: "Frontend", "Backend", "Tools")
  - `name`: string (contoh: "React.js")
  - `iconUrl`: string (opsional, URL icon skill)

## 4. projects
- **Koleksi:** `projects`
- **Dokumen:**
  - `title`: string
  - `description`: string
  - `type`: string (contoh: "frontend", "backend", "fullstack")
  - `techStack`: array of string
  - `imageUrl`: string (opsional, gambar proyek)
  - `demoGifUrl`: string (opsional, URL GIF demo proyek)
  - `demoUrl`: string (opsional, link demo)
  - `repoUrl`: string (opsional, link repository)

---

## Contoh Struktur Data (JSON)

### experience
```json
{
  "role": "Outsystems Developer",
  "company": "Sinarmas Land",
  "startDate": "2023-11",
  "endDate": "2024-08",
  "description": "Mengembangkan aplikasi web dan mobile...",
  "logoUrl": "https://..."
}
```

### education
```json
{
  "title": "S1 - Informatika, UPNVJ",
  "institution": "UPN Veteran Jakarta",
  "dateStart": "2018-08",
  "dateEnd": "2023-01",
  "description": "Aktif sebagai anggota komite...",
  "imageUrl": "https://..."
}
```

### skills
```json
{
  "category": "Frontend",
  "name": "React.js",
  "iconUrl": "https://..."
}
```

### projects
```json
{
  "title": "Personal Website",
  "description": "Website portofolio pribadi...",
  "type": "frontend",
  "techStack": ["Next.js", "TailwindCSS"],
  "imageUrl": "https://...",
  "demoGifUrl": "https://...",
  "demoUrl": "https://...",
  "repoUrl": "https://..."
}
```

---

> **Tips:**
> - Gunakan nama koleksi sesuai di atas agar konsisten dengan kode.
> - Untuk gambar/icon/GIF, upload ke storage (misal Firebase Storage/Cloudinary) dan simpan URL-nya.
> - Tanggal bisa pakai string ("2023-11") atau Firestore Timestamp.
> - Untuk skills, bisa buat sub-koleksi jika ingin nested (misal: kategori → skill), atau flat dengan field `category`.
