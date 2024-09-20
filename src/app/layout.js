import localFont from 'next/font/local';
import {Spline_Sans_Mono} from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Link from 'next/link';

const RubikMonoOne = localFont({
  src: './fonts/RubikMonoOne-Regular.ttf',
  variable: '--font-logo',
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata = {
  title: 'Fachran Sandi',
  description: 'Fachran Sandi website',
  keywords: ['Fachran Sandi', 'Web Developer', 'Software Engineer'],
};

export default function RootLayout({children}) {
  return (
    <html lang='en'>
      <head>
        <meta name='keywords' content={metadata.keywords.join(', ')} />

        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
          integrity='sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </head>
      <body className={`${RubikMonoOne.variable} ${splineSansMono.variable} antialiased`}>
        <div className='flex flex-col max-w-screen-2xl m-auto xl:my-4 lg:gap-4 shadow-lg border-[#e9e9e9] border-2'>
          <Header />
          {children}
          <footer className='text-center py-8  lg:my-2'>
            &copy; {new Date().getFullYear()} Fachran Sandi.
            <br />
            <br />
            <Link
              href={'https://www.linkedin.com/in/fachransandi/'}
              className=' hover:underline mr-4'>
              <i className='fab fa-linkedin'></i> FachranSandi
            </Link>
            <Link href={'https://github.com/tiedSandi'} className=' hover:underline mr-4 '>
              <i className='fab fa-github'></i> TiedSandi
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
