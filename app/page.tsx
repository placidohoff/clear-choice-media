import Image from "next/image";

import logoImage from "../context/screenshots/clear-choice-logo.jpg";
import ComingSoonButton from "@/app/components/ComingSoonButton";
import ContactForm from "@/app/components/ContactForm";
import HeroCarousel from "@/app/components/HeroCarousel";
import PortfolioLightbox from "@/app/components/PortfolioLightbox";
import SectionLink from "@/app/components/SectionLink";
import VideoGallery from "@/app/components/VideoGallery";
import { readSiteContent } from "@/lib/site-content";

const SERVICE_LINKS: Record<string, string> = {
  "Event Photography": "/#portfolio",
  "Photo Booth Experiences": "/#booths",
  "Event Video": "/#video",
};

export default async function Home() {
  const content = await readSiteContent();
  const navItems = content.nav;
  const serviceCards = content.services;
  const boothCards = content.boothCards;
  const eventTypes = content.eventTypes;
  const portfolioImages = content.portfolioImages;
  const videos = content.videos;

  return (
    <div className="min-h-screen w-full bg-[#071019] text-white" style={{overflowX: 'hidden'}}>
      <main className="bg-[#071019]">
        <HeroCarousel hero={content.hero} />

        <section id="services" className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-12 bg-white/40" />
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">What We Do</p>
          </div>

          <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[800px] text-5xl font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl lg:text-[7rem]">
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
                  <h3 className="text-4xl font-bold uppercase tracking-[-0.05em] text-white">{service.title}</h3>
                  <p className="mt-3 text-lg leading-8 text-slate-300">{service.description}</p>
                  <SectionLink
                    href={SERVICE_LINKS[service.title] ?? "/#contact"}
                    className="mt-6 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:text-[#7cd3ff]"
                  >
                    {service.cta} →
                  </SectionLink>
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

            <h2 className="max-w-[900px] text-5xl font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl lg:text-[7rem]">
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
                    <h3 className="text-[2rem] font-bold uppercase tracking-[-0.05em] text-white">{card.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-300">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <SectionLink
              href="/#contact"
              className="mt-10 inline-block rounded-full bg-[#e9eef2] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(124,211,255,0.18)]"
            >
              Explore Photo Booth Experiences →
            </SectionLink>
          </div>
        </section>

        <section id="about" className="bg-[#050d14] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-white/40" />
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">Every Occasion</p>
            </div>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[700px] text-5xl font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl lg:text-[7rem]">
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
                    <h3 className="text-[2rem] font-bold uppercase tracking-[-0.05em] text-white">{event.name}</h3>
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
              <SectionLink href="/#contact" className="text-[11px] font-bold uppercase tracking-[0.25em] text-white transition hover:text-[#7cd3ff]">
                Start Your Project →
              </SectionLink>
            </div>

            <h2 className="text-5xl font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl lg:text-[7rem]">
              The Portfolio.
            </h2>

            <PortfolioLightbox images={portfolioImages} />
          </div>
        </section>

        <section id="video" className="bg-[#071019] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-white/40" />
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">Video</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <VideoGallery videos={videos} />

              <div className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-[#0d1a22] p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Event Video</p>
                <h2 className="mt-4 text-5xl font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white">
                  Capture the moment. Extend the story.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  From highlight films to reels and recap content, we create polished video that keeps your event feeling alive long after it ends.
                </p>
                <ComingSoonButton
                  label="Explore Video →"
                  message="A dedicated video packages page is coming soon. In the meantime, reach out and we'll help plan your event video coverage."
                  contactCta
                  className="mt-8 inline-block rounded-full bg-[#7cd3ff] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_30px_rgba(124,211,255,0.2)]"
                />
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
                <h2 className="mt-4 text-5xl font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl">
                  Your event. Your brand. Our content.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  We help businesses turn events into content, engagement, and brand momentum with photography, video, booth activations, and social media coverage.
                </p>
                <SectionLink
                  href="/#contact"
                  className="mt-8 inline-block rounded-full bg-[#7cd3ff] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_30px_rgba(124,211,255,0.2)]"
                >
                  Plan Your Corporate Event
                </SectionLink>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#071019] px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/10 bg-[#0d1a22] p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Weddings</p>
                <h2 className="mt-4 text-5xl font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl">
                  Your day. Your story. Your way.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  From the quiet details to the joyful moments on the dance floor, we photograph and film every chapter of your celebration with care and intention.
                </p>
                <ComingSoonButton
                  label="View Wedding Services"
                  message="A dedicated wedding services page is coming soon. In the meantime, reach out and we'll help plan your wedding coverage."
                  contactCta
                  className="mt-8 inline-block rounded-full bg-[#7cd3ff] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_30px_rgba(124,211,255,0.2)]"
                />
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
          <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/10 bg-[#0d1a22] p-4 sm:p-8 lg:p-12">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-white/40" />
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">Contact</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="text-5xl font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl">
                  Ready to make your event unforgettable?
                </h2>
                <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">
                  Tell us about your event and we’ll help you plan the right mix of photography, video, and experiences.
                </p>
                <div className="mt-8 space-y-4 text-base text-slate-300">
                  <p>{content.contact.city}</p>
                  <p>{content.contact.serviceArea}</p>
                  <p>{content.contact.email}</p>
                  <p>{content.contact.phone}</p>
                </div>
              </div>

              <ContactForm eventTypes={eventTypes} />
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
              <li><SectionLink href="/#services" className="transition hover:text-[#7cd3ff]">Photography</SectionLink></li>
              <li><SectionLink href="/#booths" className="transition hover:text-[#7cd3ff]">Photo Booths</SectionLink></li>
              <li><SectionLink href="/#video" className="transition hover:text-[#7cd3ff]">Video</SectionLink></li>
              <li><SectionLink href="/#corporate" className="transition hover:text-[#7cd3ff]">Corporate</SectionLink></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7cd3ff]">Company</p>
            <ul className="mt-5 space-y-3 text-base text-slate-300">
              <li><SectionLink href="/#portfolio" className="transition hover:text-[#7cd3ff]">Portfolio</SectionLink></li>
              <li><SectionLink href="/#about" className="transition hover:text-[#7cd3ff]">About</SectionLink></li>
              <li><ComingSoonButton label="Reviews" className="text-left transition hover:text-[#7cd3ff]" /></li>
              <li><SectionLink href="/#contact" className="transition hover:text-[#7cd3ff]">Contact</SectionLink></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7cd3ff]">Contact</p>
            <ul className="mt-5 space-y-3 text-base text-slate-300">
              <li>
                <a href={`mailto:${content.contact.email}`} className="transition hover:text-[#7cd3ff]">
                  {content.contact.email}
                </a>
              </li>
              <li className="text-slate-300">{content.contact.city}</li>
              <li>
                <a href={`tel:${content.contact.phone.replace(/[^+\d]/g, "")}`} className="transition hover:text-[#7cd3ff]">
                  Call
                </a>
              </li>
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
