import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const RubikMonoOne = localFont({
  src: "./fonts/RubikMonoOne-Regular.ttf",
  variable: "--font-logo",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Fachran Sandi",
  description: "Fachran Sandi website",
  keywords: ["Fachran Sandi", "Web Developer", "Software Engineer"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${RubikMonoOne.variable} ${inter.variable} antialiased bg-gray-50 text-gray-900 font-body`}
      >
        {children}
      </body>
    </html>
  );
}
