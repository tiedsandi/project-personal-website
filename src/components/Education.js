"use client";

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
import { useTranslations } from "@/hooks/useTranslations";

const getEducationList = (t) => [
  {
    id: "PPKD",
    title: t('education.ppkd.title'),
    date: t('education.ppkd.date'),
    description: t('education.ppkd.description'),
    image: PPKDImage,
    alt: "Logo PPKD Jakarta Pusat",
  },
  {
    id: "upnvj",
    title: t('education.upnvj.title'),
    date: t('education.upnvj.date'),
    description: t('education.upnvj.description'),
    image: UpnvjImage,
    alt: "Logo UPN Veteran Jakarta",
  },
  {
    id: "binar",
    title: t('education.binar.title'),
    date: t('education.binar.date'),
    description: t('education.binar.description'),
    image: BinarImage,
    alt: "Logo Binar Academy",
  },
];

const Education = () => {
  const { t } = useTranslations();
  const educationList = getEducationList(t);
  
  return (
    <section aria-labelledby="pendidikan-heading">
      <h3 id="pendidikan-heading" className="mb-4 text-2xl font-bold underline">
        {t('education.title')}
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
