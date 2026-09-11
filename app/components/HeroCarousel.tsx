"use client";

import { useEffect, useState } from "react";

type HeroSlide = {
  image: string;
  eventName: string;
  eventMeta: string;
};

type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  slides: HeroSlide[];
};

const SLIDE_INTERVAL_MS = 6000;

export default function HeroCarousel({ hero }: { hero: HeroContent }) {
  const { slides } = hero;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="home" className="relative overflow-hidden bg-[#071019]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(89,197,240,0.2),_transparent_35%),linear-gradient(rgba(7,16,25,0.55),rgba(7,16,25,0.9))]" />

      <div className="absolute right-0 top-0 h-full w-[45%]">
        {slides.map((slide, index) => (
          <div
            key={slide.image + index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${slide.image}')`,
              opacity: index === activeIndex ? 0.4 : 0,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
            <div className="h-px w-8 bg-[#7cd3ff] sm:w-12" />
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#7cd3ff] sm:text-[11px] sm:tracking-[0.35em]">
              {hero.eyebrow}
            </p>
          </div>

          <h1 className="max-w-[700px] text-[2.75rem] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-6xl lg:text-[7rem]">
            {hero.title}
          </h1>

          <p className="mt-4 max-w-lg text-lg text-slate-200 sm:mt-6 sm:text-2xl">{hero.subtitle}</p>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            {hero.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <button className="rounded-full bg-[#7cd3ff] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_32px_rgba(124,211,255,0.25)] sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[0.2em]">
              {hero.primaryCta}
            </button>
            <button className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#7cd3ff]/60 hover:bg-[#7cd3ff]/10 sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[0.2em]">
              {hero.secondaryCta}
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-8 rounded-[2rem] bg-[#7cd3ff]/10 blur-3xl" />
          <div className="relative h-[560px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1821] shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
            {slides.map((slide, index) => (
              <img
                key={slide.image + index}
                src={slide.image}
                alt={slide.eventName}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
                style={{ opacity: index === activeIndex ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071019] via-[#071019]/15 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
