import Image from 'next/image';
import ProfileImage from '@/assets/foto-fachran.jpg';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between gap-10 p-6 lg:my-16'>
      <div className='xl:basis-5/12 basis-1/2 flex flex-col gap-5 '>
        <Image
          priority
          src={ProfileImage}
          alt='my-image'
          className='rounded-full w-14 h-14 object-cover'
        />
        <p className='lg:text-6xl md:text-5xl text-4xl font-bold'>Hallo! Saya Fachran Sandi👋</p>
      </div>
      <div className='basis-1/2 flex flex-col gap-7'>
        <p className='font-bold lg:text-3xl md:text-2xl text-xl'>
          Pengembangan Aplikasi Web Modern dengan React.Js dan Next.JS
        </p>
        <p className='font-light lg:text-lg text-sm'>
          Saya selalu tertarik pada tantangan baru dan menikmati bekerja dalam tim untuk menciptakan
          solusi yang inovatif.
        </p>

        <div className='flex gap-2 text-3xl'>
          <Link target='_blank' href={'https://www.linkedin.com/in/fachransandi/'}>
            <i className='fa-brands fa-linkedin hover:invert transition ease-in-out delay-100'></i>
          </Link>
          <Link target='_blank' href={'https://github.com/TiedSandi'}>
            <i className='fa-brands fa-square-github hover:invert transition ease-in-out delay-100'></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
