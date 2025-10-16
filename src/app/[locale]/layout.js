import localFont from "next/font/local";
import { Spline_Sans_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const RubikMonoOne = localFont({
  src: "../fonts/RubikMonoOne-Regular.ttf",
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

const locales = ["en", "id"];

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${RubikMonoOne.variable} ${splineSansMono.variable} antialiased bg-background text-foreground dark:bg-[#111827] dark:text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen max-w-[1380px] m-auto xl:my-4 lg:gap-4 2xl:shadow-lg 2xl:border-[#e9e9e9] 2xl:border-2">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
