"use client";
import { useState } from "react";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Icon } from "../icon";
import { services } from "@/lib/content";
import { startInquiry } from "@/lib/events";

export function Services() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="services" className="bg-soft py-20 lg:py-28" aria-labelledby="services-h">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Services" title="Everything You Need to Build Your Digital Advantage." body="From your first web application to a complete business management platform, we create technology that solves real problems." />
        </Reveal>
        <ul className="mt-14 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <Reveal as="li" key={s.id} delay={(i % 3) * 80} className="list-none">
                <article className={`spot group flex flex-col rounded-3xl border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10 ${isOpen ? "border-brand shadow-xl shadow-brand/10" : "border-line hover:border-brand/40"}`}>
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-5">
                    {s.examples.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {e}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setOpen(isOpen ? null : s.id)}
                    aria-expanded={isOpen}
                    aria-controls={`svc-${s.id}`}
                    className="mt-6 inline-flex items-center gap-1.5 self-start rounded-lg py-1 text-sm font-semibold text-brand hover:text-[#4338ca]"
                  >
                    Learn More <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                    <span className="sr-only"> about {s.title}</span>
                  </button>
                  <div id={`svc-${s.id}`} hidden={!isOpen} className="mt-3 rounded-2xl bg-soft p-5">
                    <p className="text-sm leading-relaxed text-slate-700">{s.detail}</p>
                    <button
                      onClick={() => startInquiry({ need: s.need })}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand active:scale-[0.98]"
                    >
                      Discuss this service <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
