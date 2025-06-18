"use client";

import Image from "next/image";

import Html from "@/assets/skills/html5.png";
import Css from "@/assets/skills/css3.png";
import Js from "@/assets/skills/js.png";
import Node from "@/assets/skills/node-js.svg";
import ReactLogo from "@/assets/skills/reactjs.png";
import Next from "@/assets/skills/next.webp";
import Redux from "@/assets/skills/redux.png";
import Api from "@/assets/skills/api.jpeg";
import Laravel from "@/assets/skills/laravel.png";

const skills = [
  { name: "HTML", icon: Html, level: "Intermediate" },
  { name: "CSS", icon: Css, level: "Intermediate" },
  { name: "JavaScript", icon: Js, level: "Advanced" },
  { name: "Node.js", icon: Node, level: "Intermediate" },
  { name: "React", icon: ReactLogo, level: "Advanced" },
  { name: "Next.js", icon: Next, level: "Advanced" },
  { name: "Redux", icon: Redux, level: "Intermediate" },
  { name: "REST API", icon: Api, level: "Advanced" },
  { name: "Laravel", icon: Laravel, level: "Intermediate" },
];

const Skills = () => {
  return (
    <section className="px-6 py-10 text-center lg:my-16">
      <h3 className="mb-10 text-3xl font-bold underline text-foreground underline-offset-4 decoration-accent">
        Keterampilan
      </h3>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center">
            <div className="p-4 transition-transform bg-white rounded-xl shadow-soft hover:scale-105">
              <Image
                priority
                src={skill.icon}
                alt={skill.name}
                className="object-contain w-12 h-12"
              />
            </div>
            <span className="mt-2 text-sm text-muted">{skill.name}</span>
            {/* <span className="text-xs text-gray-400">{skill.level}</span> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
