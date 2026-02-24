import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";

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
        <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto bg-white shadow-2xl shadow-gray-200/50 xl:my-8 xl:rounded-[2.5rem] overflow-hidden border border-gray-100">
          <Header />
          <main className="flex-grow">{children}</main>
          <footer className="py-12 text-center border-t border-gray-100 bg-gray-50/50">
            <p className="text-gray-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Fachran Sandi. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <Link
                href="https://www.linkedin.com/in/fachransandi/"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                target="_blank"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/tiedSandi"
                className="text-gray-400 hover:text-gray-900 transition-colors"
                target="_blank"
              >
                GitHub
              </Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
