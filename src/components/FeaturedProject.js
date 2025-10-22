"use client";

import Card from "./Card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCollection } from "@/services/firebaseService";
import Skeleton from "@/components/ui/Skeleton";

const FeaturedProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getCollection("projects");
        setProjects(data.filter((p) => p.isActive && p.isHighlighted));
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="flex flex-col bg-primary lg:bg-[#e9e9e9] text-background lg:text-primary p-6 lg:my-16"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold underline underline-offset-4">
          Proyek Terpilih
        </h3>
        <Link
          href="/project"
          className="text-sm text-background lg:text-primary hover:underline"
        >
          Lihat Semua Proyek →
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {loading
          ? [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-56 w-80 rounded-xl" />
            ))
          : projects.map((project, index) => (
              <Card key={project.id || index} data={project} />
            ))}
        {!loading && projects.length === 0 && (
          <div className="text-center text-zinc-400">Tidak ada proyek terpilih.</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProject;
