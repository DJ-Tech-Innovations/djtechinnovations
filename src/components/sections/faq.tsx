"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-20 lg:py-28" aria-labelledby="faq-h">
      <div className="container-x max-w-3xl">
        <Reveal><SectionHeading eyebrow="FAQ" title="Questions Before Getting Started?" /></Reveal>
        <div className="mt-12 divide-y divide-line rounded-3xl border border-line bg-white">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    id={`faq-b-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-p-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold transition hover:bg-soft sm:text-lg"
                  >
                    {f.q}
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${isOpen ? "rotate-45 bg-brand text-white" : "bg-brand/10 text-brand"}`}>
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden"><p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
