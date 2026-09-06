"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logoImage from "../../context/screenshots/clear-choice-logo.jpg";

export default function NavHeader({ navItems, primaryCta }: { navItems: any[]; primaryCta?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] w-full border-b border-white/10 bg-[#050d14]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:gap-8 sm:px-6 lg:px-10 lg:py-4">
        <div className="flex items-center gap-3">
          <Link href="#home" aria-label="Go to top">
            <Image
              src={logoImage}
              alt="Clear Choice Media logo"
              width={160}
              height={56}
              className="h-auto w-[110px] object-contain sm:w-[130px] md:w-[160px]"
              priority
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-200 lg:flex">
          {navItems?.map((item: any) => (
            <a
              key={item.label}
              href={item.href}
              className="transition duration-200 hover:text-[#7cd3ff] hover:scale-[1.02]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:inline-flex">
            <a
              href="#contact"
              className="rounded-full bg-[#e9eef2] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-white sm:px-6 sm:py-3 sm:text-[11px]"
            >
              {primaryCta}
            </a>
          </div>

          <div className="hidden sm:inline-flex">
            <Link
              href="/admin/login"
              className="rounded-full border border-[#7cd3ff]/40 bg-[#7cd3ff]/10 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7cd3ff] transition duration-200 hover:-translate-y-0.5 sm:px-5 sm:py-3 sm:text-[11px]"
            >
              Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle navigation"
            className="ml-2 inline-flex items-center justify-center rounded p-2 text-slate-200 lg:hidden"
            onClick={() => setOpen((s) => !s)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay - absolute so it doesn't push content */}
      {open && (
        <div className="lg:hidden absolute inset-x-0 top-full z-[9998] bg-[#050d14]/95">
          <div className="px-4 py-4">
            <nav className="flex flex-col gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-slate-200">
              {navItems?.map((item: any) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition hover:border-[#7cd3ff]/60 hover:text-[#7cd3ff]"
                >
                  {item.label}
                </a>
              ))}

              <Link
                href="/admin/login"
                className="rounded-xl border border-[#7cd3ff]/40 bg-[#7cd3ff]/10 px-3 py-2.5 text-[#7cd3ff] transition hover:border-[#7cd3ff]/60 hover:bg-[#7cd3ff]/20"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
