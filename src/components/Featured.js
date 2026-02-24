import Card from "./Card";
import DataList from "@/data/projectList.json";
import Link from "next/link";
import React from "react";

const FeaturedProject = () => {
  const selectedProjects = DataList.projects.filter(
    (project) => project.selected
  ).slice(0, 3); // Ensure we only show top 3

  return (
    <section
      id="projects"
      className="flex flex-col bg-gray-50 text-gray-900 p-8 lg:p-16 max-w-7xl mx-auto w-full my-8"
    >
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
        <div className="space-y-2">
          <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Proyek Unggulan
          </h3>
          <p className="text-gray-500 max-w-xl">
            Beberapa karya terbaik yang pernah saya buat. Fokus pada performa, aksesibilitas, dan pengalaman pengguna.
          </p>
        </div>
        <Link
          href="/project"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-900 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap"
        >
          Lihat Semua Proyek <span className="ml-2">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedProjects.map((project, index) => (
          <Card key={project.id || index} data={project} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProject;
