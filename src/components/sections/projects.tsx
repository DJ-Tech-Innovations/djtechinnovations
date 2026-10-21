"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Handshake, Hammer, Rocket } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { builtProjects, ongoingProjects, partners, phases, type Category } from "@/lib/projects";
import { startInquiry } from "@/lib/events";

const cats: ("All" | Category)[] = ["All", "Web", "Business Software", "Mobile", "Automation"];
const need: Record<Category, string> = { Web: "Web Application", "Business Software": "Business Management Software", Mobile: "Mobile Application", Automation: "Automation and API Integration" };

const Sample = () => <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-800">Sample entry</span>;
const Tag = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${dark ? "bg-white/10 text-slate-200" : "bg-brand/10 text-[#4338ca]"}`}>{children}</span>;

function Thumb({ cat }: { cat: Category }) {
  return (
    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-navy-900 via-[#1e1b4b] to-[#312e81]" aria-hidden="true">
      <div className="absolute inset-x-6 top-6 rounded-xl border border-white/15 bg-white/[0.06] p-3 backdrop-blur">
        <div className="mb-2 flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-white/40" /><span className="h-1.5 w-1.5 rounded-full bg-white/30" /><span className="h-1.5 w-1.5 rounded-full bg-white/20" /></div>
        {cat === "Mobile" ? <div className="mx-auto h-20 w-12 rounded-lg bg-gradient-to-b from-cyan-brand/70 to-[#8b3ff0]/80" />
          : cat === "Automation" ? <div className="flex items-center justify-between py-3">{[0, 1, 2].map((i) => <span key={i} className="flex items-center gap-2"><span className="h-6 w-10 rounded-md bg-brand/60" />{i < 2 && <span className="h-0.5 w-8 bg-cyan-brand/70" />}</span>)}</div>
          : <div className="flex h-16 items-end gap-1.5">{[40, 65, 50, 80, 60, 90, 70].map((h, i) => <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand to-cyan-brand/80" style={{ height: `${h}%` }} />)}</div>}
      </div>
    </div>
  );
}

export function BuiltProjects() {
  const [cat, setCat] = useState<"All" | Category>("All");
  const list = builtProjects.filter((p) => cat === "All" || p.category === cat);
  return (
    <section id="projects" className="bg-white py-20 lg:py-28" aria-labelledby="built-h">
      <div className="container-x">
        <Reveal><SectionHeading eyebrow="Our work" title="Projects We've Built." body="A look at the software we have delivered for businesses, from web platforms to automation." /></Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by type">
          {cats.map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${cat === c ? "bg-ink text-white" : "border border-line text-slate-700 hover:border-brand hover:text-brand"}`}>{c}</button>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-line p-10 text-center text-muted" role="status">No projects in this category yet. <button className="font-semibold text-brand underline" onClick={() => setCat("All")}>Show all projects</button></p>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {list.map((p, i) => (
              <Reveal as="li" key={p.title + i} delay={(i % 2) * 90} className="list-none">
                <article className="spot group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10">
                  <Thumb cat={p.category} />
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700"><CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Delivered</span>
                      <span className="text-xs font-semibold text-muted">{p.category}{p.year ? ` · ${p.year}` : ""}</span>
                      {p.placeholder && <Sample />}
                    </div>
                    <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                    {p.client && <p className="text-sm text-muted">for {p.client}</p>}
                    <p className="mt-3 leading-relaxed text-slate-700">{p.summary}</p>
                    {p.outcome && <p className="mt-3 rounded-xl bg-soft px-4 py-3 text-sm font-medium text-slate-700">{p.outcome}</p>}
                    <div className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                    <div className="mt-6 flex flex-wrap items-center gap-4 pt-1">
                      <button onClick={() => startInquiry({ need: need[p.category], note: `Similar to: ${p.title}` })} className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-[#4338ca]">Discuss a similar project <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                      {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-brand">Visit site <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function OngoingProjects() {
  if (ongoingProjects.length === 0) return null;
  return (
    <section id="ongoing" className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28" aria-labelledby="ongoing-h">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal><SectionHeading tone="dark" eyebrow="In progress" title="What We're Building Right Now." body="Projects currently moving through our development process." /></Reveal>
        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {ongoingProjects.map((p, i) => (
            <Reveal as="li" key={p.title + i} delay={i * 90} className="list-none">
              <article className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition hover:border-brand-soft/50 hover:bg-white/[0.07]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-brand/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-cyan-brand"><Hammer className="h-3 w-3" aria-hidden="true" /> In development</span>
                  {p.placeholder && <Sample />}
                </div>
                <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
                <p className="mt-1 text-xs font-semibold text-brand-soft">{p.category}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.summary}</p>
                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-xs font-semibold"><span className="text-slate-300">Phase: {phases[p.phase]}</span><span className="text-white">{p.progress}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={p.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${p.title} progress`}>
                    <div className="h-full rounded-full bg-gradient-to-r from-brand to-cyan-brand" style={{ width: `${p.progress}%` }} />
                  </div>
                  <ol className="mt-3 flex justify-between" aria-hidden="true">{phases.map((ph, n) => <li key={ph} className={`h-1.5 w-1.5 rounded-full ${n <= p.phase ? "bg-cyan-brand" : "bg-white/20"}`} />)}</ol>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">{p.tech.map((t) => <Tag key={t} dark>{t}</Tag>)}</div>
              </article>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <button onClick={() => startInquiry()} className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-brand-soft active:scale-[0.98]"><Rocket className="h-4 w-4" aria-hidden="true" /> Start yours next</button>
        </div>
      </div>
    </section>
  );
}

export function Partners() {
  if (partners.length === 0) return null;
  return (
    <section id="partners" className="bg-soft py-20 lg:py-24" aria-labelledby="partners-h">
      <div className="container-x">
        <Reveal><SectionHeading eyebrow="Partners" title="Companies We Work With." body="The technology and business partners that help us deliver reliable solutions." /></Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((p, i) => {
            const body = (
              <>
                {p.logo ? <img src={p.logo} alt={p.name} className="h-10 w-auto max-w-full object-contain" /> : <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand"><Handshake className="h-6 w-6" aria-hidden="true" /></span>}
                <span className="mt-3 text-sm font-bold">{p.name}</span>
                <span className="text-xs text-muted">{p.type}</span>
                {p.placeholder && <span className="mt-2"><Sample /></span>}
              </>
            );
            const cls = "flex h-full flex-col items-center rounded-2xl border border-line bg-white p-5 text-center transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg";
            return (
              <Reveal as="li" key={p.name + i} delay={(i % 6) * 60} className="list-none">
                {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a> : <div className={cls}>{body}</div>}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
