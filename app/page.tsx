"use client";

import Image from "next/image";
import { useState } from "react";
import logoImage from "../context/screenshots/clear-choice-logo.jpg";

const navItems = [
  { label: "Photography", href: "#services" },
  { label: "Photo Booths", href: "#booths" },
  { label: "Video", href: "#video" },
  { label: "Corporate", href: "#corporate" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const serviceCards = [
  {
    title: "Event Photography",
    description: "Candid moments, portraits, details, and energy.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    theme: "dark",
  },
  {
    title: "Photo Booth Experiences",
    description: "Digital booths, print experiences, 360 video, and custom activations.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
    theme: "dark",
  },
  {
    title: "Event Video",
    description: "Highlight films, social reels, event recaps, and professional coverage.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    theme: "dark",
  },
];

const boothCards = [
  {
    title: "Digital Booth",
    description: "Digital photos, GIFs, boomerangs, and instant sharing.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Print Booth",
    description: "Physical prints guests can take home.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "360 Booth",
    description: "Slow-motion 360° videos designed for social media.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Brand Activations",
    description: "Custom experiences for companies, expos, and launches.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
  },
];

const eventTypes = [
  { name: "Weddings", subtitle: "First looks to last dances", icon: "♡" },
  { name: "Corporate", subtitle: "Conferences & galas", icon: "▣" },
  { name: "Parties", subtitle: "Birthdays & milestones", icon: "✦" },
  { name: "Expos & Trade Shows", subtitle: "Booths & brand booths", icon: "◫" },
  { name: "Celebrations", subtitle: "Showers & reunions", icon: "◍" },
  { name: "Live Events", subtitle: "Concerts & performances", icon: "♫" },
];

const portfolioImages = [
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#071019] text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050d14]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:gap-8 sm:px-6 lg:px-10 lg:py-4">
          <div className="flex items-center gap-3">
            <a href="#home" aria-label="Go to top" onClick={() => setIsMenuOpen(false)}>
              <Image
                src={logoImage}
                alt="Clear Choice Media logo"
                width={160}
                height={56}
                priority
                className="h-auto w-[110px] object-contain sm:w-[130px] md:w-[160px]"
              />
            </a>
          </div>

          <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-200 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition duration-200 hover:text-[#7cd3ff] hover:scale-[1.02]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+15551234567"
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-100 transition hover:border-[#7cd3ff]/60 hover:bg-[#7cd3ff]/10 sm:flex"
            >
              <span>☎</span>
              Call
            </a>
            <a
              href="#contact"
              className="hidden rounded-full bg-[#e9eef2] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(124,211,255,0.25)] sm:inline-flex sm:px-6 sm:py-3 sm:text-[11px]"
            >
              Check Availability
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-white lg:hidden"
            >
              {isMenuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        <div className={`${isMenuOpen ? "block" : "hidden"} border-t border-white/10 bg-[#050d14] px-4 py-3 lg:hidden`}>
          <nav className="flex flex-col gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-200">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition hover:border-[#7cd3ff]/60 hover:text-[#7cd3ff]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="bg-[#071019]">
        <section id="home" className="relative overflow-hidden bg-[#071019]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(89,197,240,0.2),_transparent_35%),linear-gradient(rgba(7,16,25,0.55),rgba(7,16,25,0.9))]" />
          <div className="absolute right-0 top-0 h-full w-[45%] bg-[url('https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40" />

          <div className="relative mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-10 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
                <div className="h-px w-8 bg-[#7cd3ff] sm:w-12" />
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#7cd3ff] sm:text-[11px] sm:tracking-[0.35em]">
                  Rhode Island • Southern New England
                </p>
              </div>

              <h1 className="max-w-[700px] text-[2.75rem] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-6xl lg:text-[7rem]">
                We Capture the Energy.
              </h1>

              <p className="mt-4 max-w-lg text-lg text-slate-200 sm:mt-6 sm:text-2xl">
                Photography. Video. Photo Booth Experiences.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                Professional event photography, video production, and interactive photo booth experiences for weddings, corporate events, parties, expos, and celebrations throughout Rhode Island and Southern New England.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                <button className="rounded-full bg-[#7cd3ff] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_32px_rgba(124,211,255,0.25)] sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[0.2em]">
                  Check Availability
                </button>
                <button className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#7cd3ff]/60 hover:bg-[#7cd3ff]/10 sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[0.2em]">
                  View Our Work
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-8 rounded-[2rem] bg-[#7cd3ff]/10 blur-3xl" />
              <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1821] shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
                <img
                  src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
                  alt="Event crowd celebrating"
                  className="h-[560px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071019] via-[#071019]/15 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 rounded-[1.35rem] border border-white/10 bg-[#0d1a22]/80 p-5 backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7cd3ff]">Featured Event</p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-[-0.06em] text-white">RI Summer Social</h2>
                      <p className="mt-2 text-sm text-slate-300">Photography • Video • Booth Experience</p>
                    </div>
                    <span className="rounded-full bg-[#7cd3ff] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#091923]">
                      Booked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-12 bg-white/40" />
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">What We Do</p>
          </div>

          <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[800px] text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl lg:text-[7rem]">
              More Than Photos.
            </h2>
          </div>

          <p className="mb-12 text-2xl text-slate-200">One event. Multiple ways to experience it.</p>

          <div className="grid gap-8 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className="group overflow-hidden rounded-[1.8rem] bg-[#0b1821] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.32)]"
              >
                <div className="h-[420px] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-4xl font-black uppercase tracking-[-0.06em] text-white">{service.title}</h3>
                  <p className="mt-3 text-lg leading-8 text-slate-300">{service.description}</p>
                  <button className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:text-[#7cd3ff]">
                    Explore {service.title.includes("Photo") ? "Photo Booths" : service.title.includes("Video") ? "Event Video" : "Photography"} →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="booths" className="bg-[#071019] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-white/40" />
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">Photo Booth Experiences</p>
            </div>

            <h2 className="max-w-[900px] text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl lg:text-[7rem]">
              Turn Your Event Into an Experience.
            </h2>

            <p className="mt-6 max-w-[760px] text-xl leading-8 text-slate-300">
              A photo booth is entertainment and engagement — not just a rental.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {boothCards.map((card) => (
                <article
                  key={card.title}
                  className="group overflow-hidden rounded-[1.8rem] bg-[#0d1a22] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.28)]"
                >
                  <div className="h-[280px] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[2rem] font-black uppercase tracking-[-0.06em] text-white">{card.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-300">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <button className="mt-10 rounded-full bg-[#e9eef2] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(124,211,255,0.18)]">
              Explore Photo Booth Experiences →
            </button>
          </div>
        </section>

        <section id="about" className="bg-[#050d14] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-white/40" />
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">Every Occasion</p>
            </div>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[700px] text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl lg:text-[7rem]">
                Events We Cover.
              </h2>
              <p className="max-w-[420px] text-xl leading-8 text-slate-300">
                From intimate celebrations to full-scale corporate productions, we bring the same energy and professionalism to every event.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {eventTypes.map((event, index) => (
                <div
                  key={event.name}
                  className={`flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-[#0c1720] p-6 ${
                    index % 2 === 0 ? "bg-[#0c1720]" : "bg-[#0e1c27]"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#101f2a] text-xl text-[#7cd3ff] ring-1 ring-white/10">
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="text-[2rem] font-black uppercase tracking-[-0.06em] text-white">{event.name}</h3>
                    <p className="mt-1 text-base text-slate-300">{event.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-[#071019] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-white/40" />
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">Recent Work</p>
              </div>
              <button className="text-[11px] font-bold uppercase tracking-[0.25em] text-white transition hover:text-[#7cd3ff]">
                Start Your Project →
              </button>
            </div>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl lg:text-[7rem]">
              The Portfolio.
            </h2>

            <div className="mt-10 grid gap-6 xl:grid-cols-[1.4fr_0.9fr_0.9fr]">
              <div className="overflow-hidden rounded-[1.8rem] bg-[#0d1a22] ring-1 ring-white/10 xl:row-span-2">
                <img src={portfolioImages[0]} alt="Live music performance" className="h-full min-h-[520px] w-full object-cover" />
              </div>

              <div className="overflow-hidden rounded-[1.8rem] bg-[#0d1a22] ring-1 ring-white/10">
                <img src={portfolioImages[1]} alt="Wedding portrait" className="h-[250px] w-full object-cover" />
              </div>

              <div className="overflow-hidden rounded-[1.8rem] bg-[#0d1a22] ring-1 ring-white/10">
                <img src={portfolioImages[2]} alt="Concert crowd" className="h-[250px] w-full object-cover" />
              </div>

              <div className="overflow-hidden rounded-[1.8rem] bg-[#0d1a22] ring-1 ring-white/10 xl:col-span-2">
                <img src={portfolioImages[3]} alt="Corporate event crowd" className="h-[260px] w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section id="video" className="bg-[#071019] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-white/40" />
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">Video</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1a22]">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80"
                    alt="Event video highlight reel"
                    className="h-[520px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071019]/70 via-[#071019]/20 to-transparent" />
                  <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 text-3xl backdrop-blur-sm">
                    ▶
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-[#0d1a22] p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Event Video</p>
                <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white">
                  Capture the moment. Extend the story.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  From highlight films to reels and recap content, we create polished video that keeps your event feeling alive long after it ends.
                </p>
                <button className="mt-8 rounded-full bg-[#7cd3ff] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_30px_rgba(124,211,255,0.2)]">
                  Explore Video →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="corporate" className="bg-[#0a141d] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/10 bg-[#0d1a22] p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="overflow-hidden rounded-[1.8rem] bg-[#101f2a]">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                  alt="Corporate event branding"
                  className="h-[440px] w-full object-cover"
                />
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Corporate</p>
                <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl">
                  Your event. Your brand. Our content.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  We help businesses turn events into content, engagement, and brand momentum with photography, video, booth activations, and social media coverage.
                </p>
                <button className="mt-8 rounded-full bg-[#7cd3ff] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_30px_rgba(124,211,255,0.2)]">
                  Plan Your Corporate Event
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#071019] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/10 bg-[#0d1a22] p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Weddings</p>
                <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl">
                  Your day. Your story. Your way.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  From the quiet details to the joyful moments on the dance floor, we photograph and film every chapter of your celebration with care and intention.
                </p>
                <button className="mt-8 rounded-full bg-[#7cd3ff] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_30px_rgba(124,211,255,0.2)]">
                  View Wedding Services
                </button>
              </div>

              <div className="overflow-hidden rounded-[1.8rem] bg-[#101f2a]">
                <img
                  src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
                  alt="Wedding moment"
                  className="h-[440px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#071019] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/10 bg-[#0d1a22] p-8 lg:p-12">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-white/40" />
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">Contact</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl">
                  Ready to make your event unforgettable?
                </h2>
                <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">
                  Tell us about your event and we’ll help you plan the right mix of photography, video, and experiences.
                </p>
                <div className="mt-8 space-y-4 text-base text-slate-300">
                  <p>Providence, Rhode Island</p>
                  <p>Serving Rhode Island & Southern New England</p>
                  <p>hello@clearchoicemedia.com</p>
                </div>
              </div>

              <form className="grid gap-4 rounded-[1.5rem] bg-[#0b1821] p-6 ring-1 ring-white/10">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
                    Name
                    <input className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none" placeholder="Your name" />
                  </label>
                  <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
                    Email
                    <input className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none" placeholder="Your email" />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
                    Phone
                    <input className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none" placeholder="Your phone" />
                  </label>
                  <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
                    Event Date
                    <input className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none" placeholder="MM/DD/YYYY" />
                  </label>
                </div>

                <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
                  Event Type
                  <input className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none" placeholder="Wedding, corporate, party, etc." />
                </label>

                <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
                  Project Details
                  <textarea className="min-h-[140px] rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none" placeholder="Tell us about your event" />
                </label>

                <button className="mt-2 rounded-full bg-[#7cd3ff] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_32px_rgba(124,211,255,0.22)]">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#050d14] px-6 py-10 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={logoImage}
                alt="Clear Choice Media logo"
                width={180}
                height={60}
                className="h-auto w-[140px] object-contain"
              />
            </div>
            <p className="max-w-sm text-base leading-7 text-slate-300">
              Premium event photography, video, and photo booth experiences for Rhode Island and Southern New England.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7cd3ff]">Navigation</p>
            <ul className="mt-5 space-y-3 text-base text-slate-300">
              <li className="transition hover:text-[#7cd3ff]">Photography</li>
              <li className="transition hover:text-[#7cd3ff]">Photo Booths</li>
              <li className="transition hover:text-[#7cd3ff]">Video</li>
              <li className="transition hover:text-[#7cd3ff]">Corporate</li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7cd3ff]">Company</p>
            <ul className="mt-5 space-y-3 text-base text-slate-300">
              <li className="transition hover:text-[#7cd3ff]">Portfolio</li>
              <li className="transition hover:text-[#7cd3ff]">About</li>
              <li className="transition hover:text-[#7cd3ff]">Reviews</li>
              <li className="transition hover:text-[#7cd3ff]">Contact</li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7cd3ff]">Contact</p>
            <ul className="mt-5 space-y-3 text-base text-slate-300">
              <li className="transition hover:text-[#7cd3ff]">hello@clearchoicemedia.com</li>
              <li className="transition hover:text-[#7cd3ff]">Providence, RI</li>
              <li className="transition hover:text-[#7cd3ff]">Call</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-[1400px] flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Clear Choice Media</p>
          <p>Event photography • video • photo booth experiences</p>
        </div>
      </footer>
    </div>
  );
}
