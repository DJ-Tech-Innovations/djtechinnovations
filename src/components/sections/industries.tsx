"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Icon } from "../icon";
import { industries, type Industry } from "@/lib/content";
import { startInquiry } from "@/lib/events";

export function Industries() {
  const [sel, setSel] = useState<Industry | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (sel && !d.open) d.showModal();
    if (!sel && d.open) d.close();
  }, [sel]);

  const close = () => {
    setSel(null);
    opener.current?.focus();
  };

  return (
    <section id="solutions" className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28" aria-labelledby="sol-h">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading tone="dark" eyebrow="Solutions" title="Built Around the Way Your Business Works." body="Every industry has different challenges. We create software that supports the workflows, people, and processes that keep your business moving." />
        </Reveal>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 80} className="list-none">
              <div className="spot spot-dark group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-brand-soft/50 hover:bg-white/[0.07]">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-[#8b5cf6] shadow-lg shadow-brand/30">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{s.summary}</p>
                <button
                  onClick={(e) => { opener.current = e.currentTarget; setSel(s); }}
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-lg py-1 text-sm font-semibold text-brand-soft transition group-hover:text-white"
                >
                  Explore Solutions <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  <span className="sr-only"> for {s.title}</span>
                </button>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-slate-400">These are areas of expertise and potential solutions, not a list of existing client projects.</p>
      </div>

      <dialog
        ref={dlg}
        onClose={() => setSel(null)}
        onClick={(e) => e.target === dlg.current && close()}
        aria-labelledby="ind-title"
        className="m-auto w-[min(92vw,560px)] rounded-3xl border border-line bg-white p-0 text-ink shadow-2xl backdrop:bg-navy-950/70 backdrop:backdrop-blur-sm"
      >
        {sel && (
          <div className="p-7 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand"><Icon name={sel.icon} className="h-6 w-6" /></span>
              <button onClick={close} aria-label="Close" className="rounded-lg p-2 text-muted hover:bg-soft hover:text-ink"><X className="h-5 w-5" /></button>
            </div>
            <h3 id="ind-title" className="mt-4 text-2xl font-extrabold leading-tight">{sel.title}</h3>
            <p className="mt-2 text-muted">How custom software could support this kind of business:</p>
            <ul className="mt-5 space-y-3">
              {sel.points.map((p) => <li key={p} className="flex items-start gap-3 text-sm text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />{p}</li>)}
            </ul>
            <button
              onClick={() => { const g = sel.goal, n = sel.note; setSel(null); setTimeout(() => startInquiry({ goal: g, note: n }), 80); }}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-[#8b5cf6] px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto"
            >
              Discuss this with us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
