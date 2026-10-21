"use client";
import { Reveal } from "../reveal";
import { startInquiry } from "@/lib/events";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-24 text-center text-white lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(99,102,241,0.45),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(34,211,238,0.28),transparent_55%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <Reveal className="container-x max-w-3xl">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">Your Next Big Idea Starts With a Conversation.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
          Let&apos;s explore how the right digital solution can simplify your operations, solve a business challenge, or bring your next idea to life.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => startInquiry()} className="rounded-xl bg-white px-8 py-4 font-bold text-ink shadow-xl transition hover:-translate-y-0.5 hover:bg-brand-soft active:scale-[0.98]">
            Let&apos;s Build Something Great
          </button>
          <button onClick={() => startInquiry({ note: "I'd like to discuss my project." })} className="rounded-xl border border-white/30 px-8 py-4 font-semibold transition hover:bg-white/10 active:scale-[0.98]">
            Discuss Your Project
          </button>
        </div>
        <p className="mt-6 text-sm text-slate-400">No pressure. Just a conversation about your ideas and goals.</p>
      </Reveal>
    </section>
  );
}
