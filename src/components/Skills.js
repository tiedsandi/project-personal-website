import Html from '@/assets/skills/html5.png';
import Css from '@/assets/skills/css3.png';
import Js from '@/assets/skills/js.png';
import Node from '@/assets/skills/node-js.svg';
import React from '@/assets/skills/reactjs.png';
import Next from '@/assets/skills/next.webp';
import Redux from '@/assets/skills/redux.png';
import Api from '@/assets/skills/api.jpeg';

import Image from 'next/image';

const Skills = () => {
  return (
    <div className='p-6 text-center lg:my-16'>
      <h3 className='font-bold text-2xl underline mb-6'>Keterampilan</h3>
      <div className='flex flex-wrap justify-around gap-8'>
        <Image
          priority
          src={Html}
          alt='my-image'
          className='rounded-full w-16 h-16 object-cover '
        />
        <Image priority src={Css} alt='my-image' className='rounded-full w-16 h-16 object-cover' />
        <Image priority src={Js} alt='my-image' className='rounded-full w-16 h-16 object-cover' />
        <Image priority src={Node} alt='my-image' className='rounded-full w-16 h-16 object-cover' />
        <Image
          priority
          src={React}
          alt='my-image'
          className='rounded-full w-16 h-16 object-cover'
        />
        <Image
          priority
          src={Redux}
          alt='my-image'
          className='rounded-full w-16 h-16 object-cover'
        />
        <Image priority src={Next} alt='my-image' className='rounded-full w-16 h-16 object-cover' />
        <Image priority src={Api} alt='my-image' className='rounded-full w-16 h-16 object-cover' />
      </div>
    </div>
  );
};

export default Skills;
