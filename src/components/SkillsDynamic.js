"use client";
import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import MotionTabContent from "@/components/MotionTabContent";
import clsx from "clsx";
import { motion } from "framer-motion";
import Skeleton from "@/components/ui/Skeleton";
import { getCollection } from "@/services/firebaseService";

export default function SkillsDynamic() {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [catData, skillData] = await Promise.all([
          getCollection("skillCategories"),
          getCollection("skills"),
        ]);
  const activeCategories = catData.filter((c) => c.isActive).sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
  setCategories(activeCategories);
        setSkills(skillData.filter((s) => s.isActive));
        if (activeCategories.length > 0) setTab(activeCategories[0].name);
      } catch (err) {
        setError("Gagal mengambil data skills/kategori");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Group skills by category name
  const skillsByCategory = categories.reduce((acc, cat) => {
    acc[cat.name] = skills.filter((s) => s.category === cat.name);
    return acc;
  }, {});

  return (
    <section className="px-6 py-10 lg:my-16">
      <h3 className="mb-8 text-3xl font-bold text-center underline underline-offset-4 decoration-accent text-foreground">
        Keterampilan
      </h3>
      {loading ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-center gap-4 pb-4 border-b border-border">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-24 h-8 rounded" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-3 md:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <Tabs.Root value={tab} onValueChange={setTab} className="flex flex-col gap-6">
          <Tabs.List className="flex flex-wrap justify-center gap-4 pb-4 border-b border-border">
            {categories.map((cat) => (
              <Tabs.Trigger
                key={cat.name}
                value={cat.name}
                className={clsx(
                  "px-4 py-2 text-sm font-medium rounded-lg",
                  "text-muted-foreground hover:text-foreground",
                  "data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent"
                )}
              >
                {cat.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {categories.map((cat) => (
            <Tabs.Content key={cat.name} value={cat.name} asChild>
              <MotionTabContent
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-3 md:grid-cols-4">
                  {skillsByCategory[cat.name]?.length === 0 && (
                    <div className="text-center col-span-full text-zinc-400">Belum ada skill.</div>
                  )}
                  {skillsByCategory[cat.name]?.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      className="flex flex-col items-center p-4 transition bg-white shadow-sm rounded-2xl dark:bg-zinc-900 hover:shadow-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <img
                        src={skill.iconUrl || "/placeholder.png"}
                        alt={skill.name}
                        title={skill.name}
                        width={48}
                        height={48}
                        className="object-contain w-12 h-12 mb-3"
                        loading="lazy"
                        referrerPolicy="no-referrer"
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
      )}
    </section>
  );
}
