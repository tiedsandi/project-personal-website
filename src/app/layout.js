// TODO: Improve UX (Admin)
// [ ] Modal konfirmasi custom untuk delete (bukan confirm bawaan JS)
// [ ] Toast/info untuk aksi non-error (misal: fitur coming soon, dsb)
// [ ] Validasi form lebih jelas (inline error, highlight input, disable submit jika error)
// [ ] Loading spinner di tombol aksi (submit/delete), disable tombol saat loading
// [ ] Pagination & search lebih UX friendly (info jumlah data, tombol prev/next)
// [ ] Empty state dengan ilustrasi/icon dan pesan
// [ ] Aksesibilitas: keyboard navigation, aria-label
// [ ] Feedback visual: animasi transisi data, hover effect
// [ ] Profile dropdown/sidebar admin (nama/email admin, menu logout)
// [ ] Responsive & mobile friendly di semua komponen admin
import localFont from "next/font/local";
import { Spline_Sans_Mono } from "next/font/google";

import { Toaster } from "react-hot-toast";
import "./globals.css";

const RubikMonoOne = localFont({
  src: "./fonts/RubikMonoOne-Regular.ttf",
  variable: "--font-logo",
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Fachran Sandi",
  description: "Fachran Sandi website",
  keywords: ["Fachran Sandi", "Web Developer", "Software Engineer"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${RubikMonoOne.variable} ${splineSansMono.variable}`}
    >
      <body className="font-body">
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'rounded-lg shadow-lg font-medium text-base',
            style: { padding: '14px 24px', minWidth: 280 },
            success: {
              style: { background: '#e6f9ec', color: '#166534', border: '1px solid #bbf7d0' },
              icon: '✔️',
              iconTheme: { primary: '#16a34a', secondary: '#e6f9ec' },
            },
            error: {
              style: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' },
              icon: '✖️',
              iconTheme: { primary: '#dc2626', secondary: '#fef2f2' },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}


        // TODO: Fitur Admin
        // [x] CRUD Project
        // [x] CRUD Education
        // [x] CRUD Experience
        // [x] CRUD Tag
        // [x] Toast Notification (react-hot-toast)
        // [x] Skeleton Loading
        // [x] Toggle isActive
        // [x] Table/Card Layout Admin
        // [x] Login Auth (Firebase)
        // [~]  Form Validation (improve UX)
        // [~]  Error Handling (UX)
        // [ ]  CRUD Skills
        // [ ]  Implementation Skill (public & admin)
        // [ ]  Admin Profile/Settings
        // [ ]  Dashboard Admin
        // [ ]  Implementation Project (deployment, CI/CD, dsb)


        // TODO: harus duluan
        // [ ]  Form Education & Experience: kurang ditambahkan review url seperti di skills page
        // [ ] sorting urutan education & experience dari tanggal terbaru ke terlama
        // [ ] Education dan experience ganti field formnya, date picker untuk tanggal, tambahin juga button sampai sekarang
        // [ ] ganti nama education dan experience, dengan title lihat contoh di tempat lain seperti resume.
        // [ ] sorting bahasa dengan menambahkan urutan di form skills
        // [ ] penambahan project, sekalian date picker untuk tanggal projectnya, text rich text editor untuk deskripsi projectnya, penambahan tags juga