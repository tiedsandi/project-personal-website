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
    <section aria-labelledby="pengalaman-heading">
      <h3 id="pengalaman-heading" className="mb-4 text-2xl font-bold underline">
        Pengalaman
      </h3>
      <Accordion type="single" collapsible className="w-full text-foreground">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-4 text-left">
              <Image
                priority
                src={SinarmasLandImage}
                alt="Logo Sinarmas Land"
                className="object-cover w-16 h-16 rounded-full bg-background"
              />
              <div>
                <p className="text-sm font-bold md:text-base">
                  Outsystems Developer - Sinarmas Land
                </p>
                <p className="font-light md:text-sm text-[12px]">
                  November 2023 - Agustus 2024
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Saya mengembangkan aplikasi dengan platform low-code OutSystems
            berbasis workflow React, fokus pada responsivitas web dan mobile.
            Terlibat dalam seluruh proses pengembangan, dari perencanaan hingga
            peluncuran, serta pemeliharaan dan perbaikan bug aplikasi.
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center gap-4 text-left">
              <Image
                priority
                src={MalatoursImage}
                alt="Logo Mala Tours"
                className="object-cover w-16 h-16 p-1 rounded-full bg-background"
              />
              <div>
                <p className="text-sm font-bold md:text-base">
                  Search Engine Optimization - Mala Tours
                </p>
                <p className="font-light md:text-sm text-[12px]">
                  Februari 2021 - Juli 2021
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Saya mengembangkan strategi konten untuk promosi dan optimisasi
            mesin pencari (SEO), yang berhasil meningkatkan peringkat pencarian
            organik hingga 80%. Selain itu, saya melakukan penelitian kata kunci
            dan optimisasi SEO untuk memastikan konten dioptimalkan agar
            mencapai peringkat lebih tinggi di mesin pencari.
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </section>
  );
};

export default Experience;
