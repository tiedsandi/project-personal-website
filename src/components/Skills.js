"use client";

import * as Tabs from "@radix-ui/react-tabs";

import Image from "next/image";
import MotionTabContent from "@/components/MotionTabContent";
import clsx from "clsx";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { useTranslations } from "next-intl";

export default function SkillsTabs() {
  const t = useTranslations("Skills");
  return (
    <section className="px-6 py-10 lg:my-16">
      <h3 className="mb-8 text-3xl font-bold text-center underline underline-offset-4 decoration-accent text-foreground">
        {t("title")}
      </h3>

      <Tabs.Root defaultValue="Frontend" className="flex flex-col gap-6">
        <Tabs.List className="flex flex-wrap justify-center gap-4 pb-4 border-b border-border">
          {Object.keys(skillCategories).map((category) => (
            <Tabs.Trigger
              key={category}
              value={category}
              className={clsx(
                "px-4 py-2 text-sm font-medium rounded-lg",
                "text-muted-foreground hover:text-foreground",
                "data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-3 md:grid-cols-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="flex flex-col items-center p-4 transition bg-white shadow-sm rounded-2xl dark:bg-zinc-900 hover:shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Image
                      src={skill.icon || "/placeholder.png"}
                      alt={skill.name}
                      title={skill.name}
                      width={48}
                      height={48}
                      className="object-contain w-12 h-12 mb-3"
                    />
                    <span className="text-sm font-medium text-center text-foreground">
                      {skill.name}
                    </span>
                    <span className="mt-1 text-xs text-center text-muted-foreground">
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
