import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Icon } from "../icon";
import { values } from "@/lib/content";

export function Value() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="value-h">
      <div className="container-x">
        <Reveal>
          <div id="value-h-wrap">
            <SectionHeading eyebrow="Why it matters" title="Technology Should Make Business Easier." body="Running a business is complicated enough. Your software shouldn't make it harder. We build digital tools that help you organize your operations, reduce repetitive work, and make better decisions with confidence." />
          </div>
        </Reveal>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 90} className="list-none">
              <div className="spot group h-full rounded-3xl border border-line bg-soft p-8 transition duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:bg-white hover:shadow-xl hover:shadow-brand/10">
                <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-[#8b5cf6] text-white shadow-lg shadow-brand/25 transition group-hover:scale-105">
                  <Icon name={v.icon} className="h-7 w-7" />
                </span>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
