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
