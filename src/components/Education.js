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
    institution: "PPKD Jakarta Pusat",
    date: "Febuari 2025 - April 2025",
    description:
      "Mengikuti pelatihan Web Programming di PPKD Jakarta Pusat, mempelajari HTML, CSS, JavaScript, PHP, Laravel (MVC), RESTful API, MySQL, React.js, Tailwind, dan jQuery. Fokus pada praktik langsung dan pengembangan proyek. Lulus dengan sertifikasi kompetensi BNSP sebagai pengembang web.",
    image: PPKDImage,
    alt: "Logo PPKD Jakarta Pusat",
  },
  {
    id: "upnvj",
    title: "S1 - Informatika",
    institution: "UPN Veteran Jakarta",
    date: "Agustus 2018 - Januari 2023",
    description:
      "Aktif sebagai anggota komite di berbagai kegiatan fakultas dan universitas, seperti acara, kompetisi, dan webinar, yang mengasah kemampuan organisasi, kerja tim, dan komunikasi. Pernah menjadi asisten dosen Pengantar Basis Data (2020), bertugas membimbing praktikum, membantu pemahaman materi, serta mendukung penyusunan soal dan penilaian.",
    image: UpnvjImage,
    alt: "Logo UPN Veteran Jakarta",
  },
  {
    id: "binar",
    title: "Front End JavaScript",
    institution: "Binar Academy",
    date: "Februari 2022 - Juli 2022",
    description:
      "Saya fokus mengembangkan kompetensi di bidang teknologi dan digital melalui metode pembelajaran berbasis proyek, dengan penekanan pada keterampilan non-teknis. Saya juga terlibat dalam proyek-proyek nyata dan mempelajari pembuatan situs web dinamis menggunakan React.js.",
    image: BinarImage,
    alt: "Logo Binar Academy",
  },
];

const Education = () => {
  return (
    <section aria-labelledby="pendidikan-heading" className="h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <h3 id="pendidikan-heading" className="text-2xl font-bold text-gray-900">
          Pendidikan
        </h3>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
      >
        {educationList.map((edu, index) => (
          <AccordionItem 
            key={edu.id} 
            value={`item-${index}`}
            className="border border-gray-100 rounded-2xl px-4 bg-gray-50/50 data-[state=open]:bg-white data-[state=open]:shadow-sm transition-all"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-4 text-left">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 bg-white shrink-0">
                  <Image
                    priority
                    src={edu.image}
                    alt={edu.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">{edu.title}</p>
                  <p className="text-sm font-medium text-gray-500">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {edu.date}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed pb-4 pt-2">
              {edu.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Education;
