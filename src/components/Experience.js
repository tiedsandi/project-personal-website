"use client";

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

const Experience = () => {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCollection("experiences");
        setExperienceList(
          data
            .filter((exp) => exp.isActive)
            .sort((a, b) => {
              const endA = expEndDate(a);
              const endB = expEndDate(b);
              return endB - endA;
            })
        );

  // Helper untuk dapatkan tanggal akhir (endDate atau startDate jika kosong, atau hari ini jika isCurrent)
  function expEndDate(item) {
    if (item.isCurrent) return new Date();
    if (item.endDate) return new Date(item.endDate);
    if (item.startDate) return new Date(item.startDate);
    return new Date(0);
  }
      } catch (err) {
        setError("Gagal mengambil data experience");
        console.log("Experience fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section aria-labelledby="pengalaman-heading">
        <h3 id="pengalaman-heading" className="mb-4 text-2xl font-bold underline">
          Pengalaman
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
  if (experienceList.length === 0) {
    return <div>Tidak ada data pengalaman.</div>;
  }
  return (
    <section aria-labelledby="pengalaman-heading">
      <h3 id="pengalaman-heading" className="mb-4 text-2xl font-bold underline">
        Pengalaman
      </h3>
      <Accordion type="single" collapsible className="w-full text-foreground">
        {experienceList.map((exp, idx) => (
          <AccordionItem key={exp.id} value={`item-${idx}`}>
            <AccordionTrigger>
              <div className="flex items-center gap-4 text-left">
                <img
                  src={exp.imageUrl}
                  alt={exp.title}
                  className="object-cover w-16 h-16 rounded-full bg-background"
                  onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64?text=No+Image"; }}
                />
                <div>
                  <p className="text-sm font-bold md:text-base">{exp.title}{exp.company ? ` - ${exp.company}` : ""}</p>
                  <p className="font-light md:text-sm text-[12px]">
                    {formatPeriode(exp.startDate, exp.endDate, exp.isCurrent)}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>{exp.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Experience;
