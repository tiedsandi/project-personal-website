import Link from 'next/link';
import React from 'react';

const Button = () => {
  return (
    <Link
      className='text-md px-2 py-1 bg-secondary hover:bg-background hover:text-secondary hover:shadow-md text-background rounded-lg transition ease-in-out delay-100'
      href={'/project'}>
      Proyek Saya
    </Link>
  );
};

export default Button;
