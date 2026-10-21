import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { steps } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="bg-soft py-20 lg:py-28" aria-labelledby="proc-h">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Our process" title="From First Conversation to Working Solution." body="A clear, collaborative process that turns your business requirements into practical software." />
        </Reveal>
        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-5">
          <span className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-brand via-brand-soft to-cyan-brand/30 lg:left-[10%] lg:right-[10%] lg:top-[27px] lg:h-0.5 lg:w-auto lg:bg-gradient-to-r" aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 120} className="relative list-none pl-[72px] lg:pl-0 lg:text-center">
              <span className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-soft bg-gradient-to-br from-brand to-[#8b5cf6] text-sm font-extrabold text-white shadow-lg shadow-brand/30 lg:static lg:mx-auto">
                {s.n}
              </span>
              <div className="lg:mt-6">
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
