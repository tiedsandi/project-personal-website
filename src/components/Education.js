import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

import UpnvjImage from "@/assets/upnvj.png";
import BinarImage from "@/assets/binar.png";

const educationList = [
  {
    id: "upnvj",
    title: "S1 - Informatika, UPNVJ",
    date: "Agustus 2018 - Januari 2023",
    description:
      "Lulus Cum Laude dengan mata kuliah utama Struktur Data, Rekayasa Perangkat Lunak, dan Pemrograman Web. Aktif sebagai anggota komite berbagai acara di fakultas, serta menjadi asisten dosen Pengantar Basis Data tahun 2020.",
    image: UpnvjImage,
    alt: "Logo UPN Veteran Jakarta",
  },
  {
    id: "binar",
    title: "Front End JavaScript - Binar Academy",
    date: "Februari 2022 - Juli 2022",
    description:
      "Saya fokus mengembangkan kompetensi di bidang teknologi dan digital melalui metode pembelajaran berbasis proyek, dengan penekanan pada keterampilan non-teknis. Saya juga terlibat dalam proyek-proyek nyata dan mempelajari pembuatan situs web dinamis menggunakan React.js.",
    image: BinarImage,
    alt: "Logo Binar Academy",
  },
];

const Education = () => {
  return (
    <section aria-labelledby="pendidikan-heading">
      <h3 id="pendidikan-heading" className="mb-4 text-2xl font-bold underline">
        Pendidikan
      </h3>
      <Accordion
        type="single"
        collapsible
        className="w-full mb-4 text-foreground"
      >
        {educationList.map((edu, index) => (
          <AccordionItem key={edu.id} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex items-center gap-4 text-left">
                <Image
                  priority
                  src={edu.image}
                  alt={edu.alt}
                  className="object-cover w-16 h-16 rounded-full bg-background"
                />
                <div>
                  <p className="text-sm font-bold md:text-base">{edu.title}</p>
                  <p className="font-light md:text-sm text-[12px]">
                    {edu.date}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>{edu.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Education;
