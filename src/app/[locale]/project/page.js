"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import Card from "@/components/Card";
import projectList from "@/data/projectList.json";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("projectPage");
  const projects = projectList.projects;
  const [filterType, setFilterType] = useState("all");

  const sortProject = [...projects].sort((a, b) => b.id - a.id);

  const filteredProjects =
    filterType === "all"
      ? sortProject
      : sortProject.filter((project) => project.type === filterType);

  const types = ["all", "frontend", "backend", "fullstack"];

  return (
    <div className="flex flex-col px-6">
      <h3 className="mb-6 text-2xl font-bold text-center underline">
        {t("title")}
      </h3>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-full border transition 
              ${
                filterType === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {t(`filters.${type}`)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filterType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((data, index) => (
              <Card key={data.id} data={data} />
            ))
          ) : (
            <p className="w-full text-center text-gray-500">
              {t("noProjects")}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
