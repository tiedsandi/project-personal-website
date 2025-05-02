import Image from "next/image";
import ProfileImage from "@/assets/foto-fachran.jpg";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col justify-between gap-10 p-6 md:flex-row lg:my-16">
      <div className="flex flex-col gap-5 xl:basis-5/12 basis-1/2">
        <Image
          priority
          src={ProfileImage}
          alt="fachran-sandi-image"
          className="object-cover rounded-full w-14 h-14"
        />
        <p className="text-4xl font-bold lg:text-6xl md:text-5xl">
          Halo! Saya Fachran Sandi 👋
        </p>
      </div>
      <div className="flex flex-col basis-1/2 gap-7">
        <p className="text-xl font-bold lg:text-3xl md:text-2xl">
          Fullstack Developer • Laravel • React.js • Next.js • Node.js • REST API
        </p>
        <p className="text-sm font-light lg:text-lg">
          Saya seorang developer yang antusias memecahkan masalah dengan teknologi
          modern. Berpengalaman membangun aplikasi web responsif dan performa tinggi
          menggunakan stack Laravel, React.js, Next.js, hingga pengembangan REST API.
        </p>

        <div className="flex gap-2 text-3xl">
          <Link target="_blank" href={"https://www.linkedin.com/in/fachransandi/"}>
            <i className="transition ease-in-out delay-100 fa-brands fa-linkedin hover:invert"></i>
          </Link>
          <Link target="_blank" href={"https://github.com/TiedSandi"}>
            <i className="transition ease-in-out delay-100 fa-brands fa-square-github hover:invert"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
