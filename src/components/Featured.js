"use client";

import Card from "./Card";
import DataList from "@/data/projectList.json";
import {Link} from "@/i18n/navigation";
import React from "react";
import {useTranslations} from "next-intl";

const FeaturedProject = () => {
  const selectedProjects = DataList.projects.filter(
    (project) => project.selected
  );

  const t = useTranslations("Featured");

  return (
    <section
      id="projects"
      className="flex flex-col bg-primary lg:bg-[#e9e9e9] text-background lg:text-primary p-6 lg:my-16"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold underline underline-offset-4">
          {t("title")}
        </h3>
        <Link
          href="/project"
          className="text-sm text-background lg:text-primary hover:underline"
        >
          {t("seeAll")} →
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {selectedProjects.map((project, index) => (
          <Card key={project.id || index} data={project} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProject;
