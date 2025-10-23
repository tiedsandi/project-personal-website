import Header from "@/components/Header";
import Link from "next/link";
import "../globals.css";
import localFont from "next/font/local";
import { Spline_Sans_Mono } from "next/font/google";

const RubikMonoOne = localFont({
  src: "../fonts/RubikMonoOne-Regular.ttf",
  variable: "--font-logo",
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function PublicLayout({ children }) {
  return (
    <div
      className={`${RubikMonoOne.variable} ${splineSansMono.variable} font-body antialiased bg-background text-foreground dark:bg-[#111827] dark:text-white`}
    >
      <div className="flex flex-col min-h-screen max-w-[1380px] m-auto xl:my-4 lg:gap-4 2xl:shadow-lg 2xl:border-[#e9e9e9] 2xl:border-2">
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="py-8 text-center lg:my-2">
          &copy; {new Date().getFullYear()} Fachran Sandi.
          <br />
          <br />
          <Link
            href="https://www.linkedin.com/in/fachransandi/"
            className="mr-4 hover:underline"
          >
            <i className="fab fa-linkedin"></i> FachranSandi
          </Link>
          <Link
            href="https://github.com/tiedSandi"
            className="mr-4 hover:underline"
          >
            <i className="fab fa-github"></i> TiedSandi
          </Link>
        </footer>
      </div>
    </div>
  );
}
