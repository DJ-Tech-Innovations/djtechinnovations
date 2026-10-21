"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { nav } from "@/lib/content";
import { startInquiry } from "@/lib/events";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive("#" + e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-navy-950/90 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="container-x flex h-[68px] items-center justify-between">
        <a href="#home" onClick={go("#home")} aria-label="DJ Tech Innovations, home" className="rounded-md">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={go(n.href)}
              aria-current={active === n.href ? "true" : undefined}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white active:bg-white/15 ${
                active === n.href ? "text-white" : "text-slate-300"
              }`}
            >
              {n.label}
              <span className={`mx-auto mt-0.5 block h-0.5 rounded-full bg-gradient-to-r from-cyan-brand to-brand-soft transition-all ${active === n.href ? "w-5" : "w-0"}`} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => startInquiry()}
            className="hidden rounded-xl bg-gradient-to-r from-brand to-[#8b5cf6] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-brand/50 active:translate-y-0 active:scale-[0.98] sm:inline-flex"
          >
            Start a Project
          </button>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white hover:bg-white/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-white/10 lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-4">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={go(n.href)}
              className={`rounded-xl px-4 py-3.5 text-base font-medium hover:bg-white/10 ${active === n.href ? "bg-white/10 text-white" : "text-slate-300"}`}
            >
              {n.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              setTimeout(() => startInquiry(), 50);
            }}
            className="mt-2 rounded-xl bg-gradient-to-r from-brand to-[#8b5cf6] px-5 py-3.5 text-base font-semibold text-white"
          >
            Start a Project
          </button>
        </nav>
      </div>
    </header>
  );
}
