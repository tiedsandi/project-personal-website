import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";
import MalatoursImage from "@/assets/mala-tours.jpeg";
import SinarmasLandImage from "@/assets/sinarmas-land.jpeg";

const Experience = () => {
  return (
    <section aria-labelledby="pengalaman-heading" className="h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 id="pengalaman-heading" className="text-2xl font-bold text-gray-900">
          Pengalaman
        </h3>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border border-gray-100 rounded-2xl px-4 bg-gray-50/50 data-[state=open]:bg-white data-[state=open]:shadow-sm transition-all">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-4 text-left">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 bg-white shrink-0">
                <Image
                  priority
                  src={SinarmasLandImage}
                  alt="Logo Sinarmas Land"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-base font-bold text-gray-900">
                  Outsystems Developer
                </p>
                <p className="text-sm font-medium text-gray-500">
                  Sinarmas Land
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  November 2023 - Agustus 2024
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed pb-4 pt-2">
            Saya mengembangkan aplikasi web dan mobile menggunakan platform
            low-code OutSystems pada berbagai proyek internal perusahaan. Dalam
            pekerjaan saya, saya mengimplementasikan fitur berdasarkan kebutuhan
            user dan spesifikasi yang telah ditentukan. Selain itu, saya juga
            terlibat dalam pemeliharaan aplikasi, termasuk penyelidikan serta
            perbaikan bug pada beberapa proyek yang sudah berjalan.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Experience;
