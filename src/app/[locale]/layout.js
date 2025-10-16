import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import Header from '@/components/Header';
import Link from 'next/link';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'id'}];
}

export default async function LocaleLayout({children, params: {locale}}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
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
    </NextIntlClientProvider>
  );
}
