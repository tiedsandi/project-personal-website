import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

import UpnvjImage from '@/assets/upnvj.png';
import BinarImage from '@/assets/binar.png';

const Education = () => {
  return (
    <Accordion type='single' collapsible className='w-full text-background mb-4'>
      <h3 className='font-bold text-2xl mb-4 underline'>Pendidikan</h3>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <div className='flex items-center gap-4'>
            <Image
              priority
              src={UpnvjImage}
              alt='my-image'
              className='rounded-full  w-16 h-16 object-cover bg-background'
            />
            <div className='text-left'>
              <p className='font-bold md:text-base text-sm'>S1 - Informatika, UPNVJ</p>
              <p className='font-light  md:text-sm text-[12px]'>Agustus 2018 - Januari 2023</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Lulus Cum Laude dengan mata kuliah utama Struktur Data, Rekayasa Perangkat Lunak, dan
          Pemrograman Web. Aktif sebagai anggota komite berbagai acara di fakultas, serta menjadi
          asisten dosen Pengantar Basis Data tahun 2020.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>
          <div className='flex items-center gap-4'>
            <Image
              priority
              src={BinarImage}
              alt='my-image'
              className='rounded-full p-1 w-16 h-16 object-cover bg-background '
            />
            <div className='text-left'>
              <p className='font-bold md:text-base text-sm'>
                Front End Java Script - Binar Academy
              </p>
              <p className='font-light  md:text-sm text-[12px]'>Febuari 2022 - Juli 2022</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Saya fokus mengembangkan kompetensi di bidang teknologi dan digital melalui metode
          pembelajaran berbasis proyek, dengan penekanan pada keterampilan non-teknis. Saya juga
          terlibat dalam proyek-proyek nyata di bidang teknologi dan mempelajari pembuatan situs web
          dinamis menggunakan React.JS.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Education;
