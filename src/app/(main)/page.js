import FeaturedProject from "@/components/Featured";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import MarqueeData from "@/data/marquee-skills.json";
import HeroData from "@/data/hero.json";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <FadeIn delay={0.1}>
        <Hero
          greeting={HeroData.greeting}
          name={HeroData.name}
          title={HeroData.title}
          description={HeroData.description}
          stats={HeroData.stats}
          photo={HeroData.photo}
        />
      </FadeIn>

      <TechMarquee skills={MarqueeData.skills} />

      <FadeIn delay={0.25}>
        <FeaturedProject />
      </FadeIn>

      {/* CTA Section */}
      <FadeIn delay={0.35}>
        <section className="w-full px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-6 px-8 py-16 text-center bg-gray-900 rounded-3xl">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Let&apos;s work together</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Tertarik untuk berkolaborasi?</h2>
            <p className="max-w-md text-base leading-relaxed text-gray-400">
              Saya terbuka untuk proyek freelance, full-time, maupun diskusi santai. Jangan ragu untuk menghubungi saya.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                className="px-8 py-3.5 text-gray-900 font-medium bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                Hubungi Saya
              </a>
              <Link
                href="/project"
                className="px-8 py-3.5 text-white font-medium border border-white/30 rounded-full hover:bg-white/10 transition-colors"
              >
                Lihat Proyek
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
