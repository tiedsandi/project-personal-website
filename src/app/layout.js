import "./globals.css";

export const metadata = {
  title: "Fachran Sandi — Fullstack Developer",
  description: "Fachran Sandi website",
  keywords: ["Fachran Sandi", "Web Developer", "Software Engineer"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <div className="noise"></div>
        {children}
      </body>
    </html>
  );
}
