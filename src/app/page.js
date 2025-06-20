import Education from "@/components/Education";
import Experience from "@/components/Experience";
import FeaturedProject from "@/components/Featured";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        aria-label="Experience and Education"
        className="grid grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-2"
      >
        <div className="p-6 bg-card text-foreground rounded-2xl shadow-soft">
          <Experience />
        </div>
        <div className="p-6 bg-card text-foreground rounded-2xl shadow-soft">
          <Education />
        </div>
      </section>

      <Skills />

      <FeaturedProject />
    </>
  );
}
