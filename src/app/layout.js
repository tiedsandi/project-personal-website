import "./globals.css";

export const metadata = {
  title: "Fachran Sandi",
  description: "Fachran Sandi website",
  keywords: ["Fachran Sandi", "Web Developer", "Software Engineer"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground dark:bg-[#111827] dark:text-white">
        {children}
      </body>
    </html>
  );
}
