"use client";

import * as Tabs from "@radix-ui/react-tabs";

import Image from "next/image";
import MotionTabContent from "@/components/MotionTabContent";
import clsx from "clsx";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

export default function SkillsTabs() {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto w-full">
      <div className="text-center mb-12 space-y-4">
        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          Keterampilan & Teknologi
        </h3>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Alat dan teknologi yang saya gunakan untuk membangun produk digital yang luar biasa.
        </p>
      </div>

      <Tabs.Root defaultValue="Frontend" className="flex flex-col gap-8">
        <Tabs.List className="flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100 rounded-2xl max-w-fit mx-auto">
          {Object.keys(skillCategories).map((category) => (
            <Tabs.Trigger
              key={category}
              value={category}
              className={clsx(
                "px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50",
                "data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm"
              )}
            >
              {category}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {Object.entries(skillCategories).map(([category, skills]) => (
          <Tabs.Content key={category} value={category} asChild>
            <MotionTabContent
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pt-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group flex flex-col items-center p-6 bg-white border border-gray-100 rounded-3xl hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.4,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                  >
                    <div className="relative w-14 h-14 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                      <Image
                        src={skill.icon || "/placeholder.png"}
                        alt={skill.name}
                        title={skill.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 text-center">
                      {skill.name}
                    </span>
                    <span className="mt-1.5 text-xs font-medium text-gray-500 text-center bg-gray-50 px-2.5 py-1 rounded-full">
                      {skill.experience}
                    </span>
                  </motion.div>
                ))}
              </div>
            </MotionTabContent>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </section>
  );
}
