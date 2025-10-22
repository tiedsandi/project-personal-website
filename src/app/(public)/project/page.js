"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Skeleton from "@/components/ui/Skeleton";
import { getCollection } from "@/services/firebaseService";

const types = ["semua", "frontend", "backend", "fullstack"];

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("semua");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getCollection("projects");
        setProjects(data.filter((p) => p.isActive));
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const sortProject = [...projects].sort((a, b) => b.id - a.id);
  const filteredProjects =
    filterType === "semua"
      ? sortProject
      : sortProject.filter((project) => project.type === filterType);

  return (
    <div className="flex flex-col px-6">
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
      {loading ? (
        <div className="flex flex-wrap justify-center gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-56 w-80 rounded-xl" />
          ))}
        </div>
      ) : (
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
              filteredProjects.map((data) => (
                <Card key={data.id} data={data} />
              ))
            ) : (
              <p className="w-full text-center text-gray-500">
                Tidak ada proyek yang cocok.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ProjectPage;
