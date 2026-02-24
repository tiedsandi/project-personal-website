"use client";

const techStack = [
  "JavaScript", "TypeScript", "React", "Next.js",
  "Node.js", "Laravel", "Golang", "MySQL", "MongoDB", "PostgreSQL",
  "Redux", "PHP", "REST API", "Git", "Firebase",
];

export default function TechMarquee() {
  const items = [...techStack, ...techStack]; // duplicate for seamless loop

  return (
    <section className="w-full py-5 bg-gray-50 overflow-hidden relative">
      {/* fade kiri */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
      {/* fade kanan */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-gray-50 to-transparent" />

      <div className="flex items-center gap-3 w-max animate-marquee">
        {items.map((tech, i) => (
          <span
            key={i}
            className="px-4 py-1.5 text-xs font-semibold text-gray-500 border border-gray-200 rounded-full bg-white whitespace-nowrap tracking-wide"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
