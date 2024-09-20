import React from 'react';
import Button from './Button';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='flex justify-between p-6'>
      <Link href={'/'} className='font-logo text-2xl font-bold hover:underline'>
        Sandi
      </Link>
      <Button />
    </div>
  );
};

export default Header;
