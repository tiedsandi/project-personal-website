"use client";

import React, { useState } from "react";

import Card from "@/components/Card";
import projectList from "@/data/projectList.json";

const Page = () => {
  const projects = projectList.projects;
  const [filterType, setFilterType] = useState("all");

  const sortProject = [...projects].sort((a, b) => b.id - a.id);

  const filteredProjects =
    filterType === "all"
      ? sortProject
      : sortProject.filter((project) => project.type === filterType);

  const types = ["all", "frontend", "backend", "fullstack"];

  return (
    <div className="flex flex-col p-3">
      <h3 className="mb-6 text-2xl font-bold text-center underline">
        Proyek Saya
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
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((data, index) => (
            <Card key={index} data={data} />
          ))
        ) : (
          <p className="w-full text-center text-gray-500">
            Tidak ada proyek yang cocok.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
