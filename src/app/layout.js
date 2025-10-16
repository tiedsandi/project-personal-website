import localFont from "next/font/local";
import { Spline_Sans_Mono } from "next/font/google";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${RubikMonoOne.variable} ${splineSansMono.variable} antialiased bg-background text-foreground dark:bg-[#111827] dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
