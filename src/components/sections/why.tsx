import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Icon } from "../icon";
import { differentiators } from "@/lib/content";

export function Why() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28" aria-labelledby="why-h">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <SectionHeading align="left" eyebrow="Why DJ Tech Innovations" title="Not Just Software. A Better Way to Work." body="We believe the best technology starts with understanding your business. Our approach combines practical problem-solving, thoughtful design, and reliable software engineering to deliver solutions that serve a real purpose." />
          <div className="mt-10 rounded-3xl bg-navy-950 p-6 text-white shadow-2xl shadow-navy-950/20" aria-hidden="true">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400"><span>Before</span><span className="text-cyan-brand">After</span></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 rounded-2xl border border-white/10 p-4">
                {[60, 85, 45, 70].map((w, i) => <div key={i} className="h-2.5 rounded bg-white/10" style={{ width: `${w}%`, transform: `rotate(${(i - 1.5) * 1.2}deg)` }} />)}
                <p className="pt-2 text-[11px] text-slate-400">Scattered spreadsheets and manual follow-ups</p>
              </div>
              <div className="space-y-2 rounded-2xl border border-brand-soft/40 bg-brand/10 p-4">
                {[1, 2, 3].map((i) => <div key={i} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-cyan-brand" /><span className="h-2.5 flex-1 rounded bg-white/25" /></div>)}
                <p className="pt-2 text-[11px] text-slate-300">One organized system built for your workflow</p>
              </div>
            </div>
          </div>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 90} className="list-none">
              <div className="spot h-full rounded-3xl border border-line bg-soft p-7 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white hover:shadow-lg hover:shadow-brand/10">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon name={d.icon} className="h-5 w-5" /></span>
                <h3 className="text-lg font-bold">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
