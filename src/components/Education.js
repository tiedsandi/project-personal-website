"use client"

import { formatPeriode } from "@/utils/dateFormat";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


import { useEffect, useState } from "react";

import Skeleton from "@/components/ui/Skeleton";
import { getCollection } from "@/services/firebaseService";

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCollection("educations");
        setEducationList(
          data
            .filter((edu) => edu.isActive)
            .sort((a, b) => {
              // Sort by endDate (or startDate if isCurrent)
              const endA = a.isCurrent ? new Date() : new Date(a.endDate || a.startDate);
              const endB = b.isCurrent ? new Date() : new Date(b.endDate || b.startDate);
              return endB - endA;
            })
        );
      } catch (err) {
        setError("Gagal mengambil data education");
        console.log("Education fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  if (loading) {
    return (
      <section aria-labelledby="pendidikan-heading">
        <h3 id="pendidikan-heading" className="mb-4 text-2xl font-bold underline">
          Pendidikan
        </h3>
        <div className="flex flex-col gap-4">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-white shadow rounded-2xl">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <Skeleton className="w-32 h-5 mb-2" />
                <Skeleton className="w-24 h-4 mb-1" />
                <Skeleton className="w-40 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (educationList.length === 0) {
    return <div>Tidak ada data pendidikan.</div>;
  }
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
                {/* Pakai tag img biasa agar support url eksternal */}
                <img
                  src={edu.imageUrl}
                  alt={edu.title}
                  className="object-cover w-16 h-16 rounded-full bg-background"
                  onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64?text=No+Image"; }}
                />
                <div>
                  <p className="text-sm font-bold md:text-base">{edu.title}</p>
                  <p className="font-light md:text-sm text-[12px]">
                    {formatPeriode(edu.startDate, edu.endDate, edu.isCurrent)}
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
