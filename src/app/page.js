import Education from "@/components/Education";
import Experience from "@/components/Experience";
import FeaturedProject from "@/components/Featured";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="flex flex-col bg-[#f1f1f1] lg:my-16 ">
        <div className="flex self-start flex-grow w-full gap-10 px-6 py-8 bg-primary lg:px-20 lg:py-20 lg:w-1/2">
          <Experience />
        </div>
        <div className="flex self-end flex-grow w-full gap-10 px-6 py-8 bg-primary lg:px-20 lg:py-20 lg:w-1/2">
          <Education />
        </div>
      </div>

      <Skills />

      <FeaturedProject />
    </>
  );
}
