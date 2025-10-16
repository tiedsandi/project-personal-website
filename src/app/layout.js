import { notFound } from 'next/navigation';

const locales = ['en', 'id'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params }) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(params?.locale)) {
    notFound();
  }

  return children;
}