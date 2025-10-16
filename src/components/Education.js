import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';
import Image from "next/image";

import UpnvjImage from "@/assets/upnvj.png";
import BinarImage from "@/assets/binar.png";
import PPKDImage from "@/assets/ppkd.jpg";

const Education = () => {
  const t = useTranslations('sections');
  const tEdu = useTranslations('education');

  const educationList = [
    {
      id: "PPKD",
      titleKey: "ppkd.title",
      dateKey: "ppkd.period",
      descriptionKey: "ppkd.description",
      image: PPKDImage,
      alt: "Logo PPKD Jakarta Pusat",
    },
    {
      id: "upnvj",
      titleKey: "upnvj.title",
      dateKey: "upnvj.period",
      descriptionKey: "upnvj.description",
      image: UpnvjImage,
      alt: "Logo UPN Veteran Jakarta",
    },
    {
      id: "binar",
      titleKey: "binar.title",
      dateKey: "binar.period",
      descriptionKey: "binar.description",
      image: BinarImage,
      alt: "Logo Binar Academy",
    },
  ];

  return (
    <section aria-labelledby="pendidikan-heading">
      <h3 id="pendidikan-heading" className="mb-4 text-2xl font-bold underline">
        {t('education')}
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
                  <p className="text-sm font-bold md:text-base">{tEdu(edu.titleKey)}</p>
                  <p className="font-light md:text-sm text-[12px]">
                    {tEdu(edu.dateKey)}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>{tEdu(edu.descriptionKey)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Education;
