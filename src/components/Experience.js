import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

import SinarmasLandImage from '@/assets/sinarmas-land.jpeg';
import MalatoursImage from '@/assets/mala-tours.jpeg';

const Experience = () => {
  return (
    <Accordion type='single' collapsible className='w-full text-background'>
      <h3 className='font-bold  text-2xl mb-4 underline'>Pengalaman</h3>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <div className='flex items-center gap-4'>
            <Image
              priority
              src={SinarmasLandImage}
              alt='my-image'
              className='rounded-full  w-16 h-16 object-cover bg-background'
            />
            <div className='text-left'>
              <p className='font-bold md:text-base text-sm'>Outsytems Developer - Sinarmas Land</p>
              <p className='font-light md:text-sm text-[12px]'>November 2023 - Agustus 2024</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Saya mengembangkan aplikasi dengan platform low-code OutSystems berbasis workflow React,
          fokus pada responsivitas web dan mobile. Terlibat dalam seluruh proses pengembangan, dari
          perencanaan hingga peluncuran, serta pemeliharaan dan perbaikan bug aplikasi.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>
          <div className='flex items-center gap-4'>
            <Image
              priority
              src={MalatoursImage}
              alt='my-image'
              className='rounded-full p-1 w-16 h-16 object-cover bg-background '
            />
            <div className='text-left'>
              <p className='font-bold md:text-base text-sm'>
                Search Engine Optimization - Mala Tours
              </p>
              <p className='font-light md:text-sm text-[12px]'>Febuari 2021 - Juli 2021</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Saya mengembangkan strategi konten untuk promosi dan optimisasi mesin pencari (SEO), yang
          berhasil meningkatkan peringkat pencarian organik hingga 80%. Selain itu, saya melakukan
          penelitian kata kunci dan optimisasi SEO untuk memastikan konten dioptimalkan agar
          mencapai peringkat lebih tinggi di mesin pencari.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Experience;
