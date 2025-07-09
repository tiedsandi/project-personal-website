import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

import UpnvjImage from "@/assets/upnvj.png";
import BinarImage from "@/assets/binar.png";
import PPKDImage from "@/assets/ppkd.jpg";

const educationList = [
  {
    id: "PPKD",
    title: "Web Programming",
    date: "Febuari 2025 - April 2025",
    description:
      "Mengikuti pelatihan Web Programming di PPKD Jakarta Pusat, mempelajari HTML, CSS, JavaScript, PHP, Laravel (MVC), RESTful API, MySQL, React.js, Tailwind, dan jQuery. Fokus pada praktik langsung dan pengembangan proyek. Lulus dengan sertifikasi kompetensi BNSP sebagai pengembang web.",
    image: PPKDImage,
    alt: "Logo PPKD Jakarta Pusat",
  },
  {
    id: "upnvj",
    title: "S1 - Informatika, UPNVJ",
    date: "Agustus 2018 - Januari 2023",
    description:
      "Aktif sebagai anggota komite di berbagai kegiatan fakultas dan universitas, seperti acara, kompetisi, dan webinar, yang mengasah kemampuan organisasi, kerja tim, dan komunikasi. Pernah menjadi asisten dosen Pengantar Basis Data (2020), bertugas membimbing praktikum, membantu pemahaman materi, serta mendukung penyusunan soal dan penilaian.",
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
