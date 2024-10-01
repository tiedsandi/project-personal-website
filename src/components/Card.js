import Image from 'next/image';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {Badge} from '@/components/ui/badge';
import Link from 'next/link';

const Card = (props) => {
  const {name, company, imgName, date, linkGithub, description, tags} = props.data;
  return (
    <Dialog>
      <DialogTrigger className='relative w-full xl:w-[calc(33.333333%-1rem)] sm:w-[calc(50%-1rem)] sm:h-52 md:h-64 h-full after:content-[""] after:absolute after:bg-black after:w-full after:h-full after:bottom-0 after:right-0 after:opacity-30 after:rounded-xl hover:after:opacity-60'>
        <Image
          priority
          src={`/images/demo/${imgName}`}
          alt='my-image'
          width={30}
          height={30}
          sizes='100%'
          className='object-contain sm:object-cover rounded-xl w-full h-full '
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={'flex flex-col gap-4'}>
          <DialogTitle>
            {name} {company && `- ${company}`}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>

          <div className='flex gap-2 flex-wrap justify-center sm:justify-normal'>
            {tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
          <Link target='_blank' href={linkGithub} className='self-end hover:underline'>
            Link <i className='fa-solid fa-arrow-up-right-from-square'></i>
          </Link>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Card;

{
  /* <div className='bg-[url("/images/demo/foodie-app.png")] w-full h-full object-fill bg-cover after:content-[""] after:absolute after:bg-black after:w-full after:h-full after:bottom-0 after:right-0 after:opacity-30 after:rounded-xl hover:after:opacity-60 rounded-xl bg-center' /> */
}
