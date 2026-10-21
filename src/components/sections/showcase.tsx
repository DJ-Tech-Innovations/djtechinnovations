"use client";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { startInquiry } from "@/lib/events";
import { CrmUI, DashboardUI, InventoryUI, WorkflowUI } from "../mockups/showcase";

const items = [
  { id: "dash", tab: "Management Dashboard", title: "Business Management Dashboard", problem: "Numbers live in different files, so owners wait for reports and decide on partial information.", solution: "One live dashboard that brings sales, orders, stock and team activity together, with role-based access for each person.", need: "Business Management Software", UI: DashboardUI },
  { id: "inv", tab: "Inventory and Sales", title: "Inventory and Sales Management", problem: "Stock counts drift from reality, items run out unexpectedly, and purchasing is reactive.", solution: "Track stock, sales and purchase orders in one place, with reorder alerts and clear reports for each branch.", need: "Business Management Software", UI: InventoryUI },
  { id: "crm", tab: "Customer Relationships", title: "Customer Relationship Management", problem: "Inquiries, quotes and follow-ups are scattered across chats, notebooks and spreadsheets.", solution: "A shared pipeline where every customer, conversation and follow-up is recorded and nothing falls through the cracks.", need: "Custom-Built Application", UI: CrmUI },
  { id: "flow", tab: "Workflow and Automation", title: "Workflow and Automation Platform", problem: "Approvals and updates depend on people copying data and sending reminders by hand.", solution: "Rules-based workflows that route approvals, send notifications and sync data between the tools you already use.", need: "Automation and API Integration", UI: WorkflowUI },
];

export function Showcase() {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = items[i];

  const onKey = (e: React.KeyboardEvent) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = items.length - 1;
    else return;
    e.preventDefault();
    setI(n);
    refs.current[n]?.focus();
  };

  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28" aria-labelledby="show-h">
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading tone="dark" eyebrow="Featured capabilities" title="Software That Works the Way You Do." body="See how thoughtfully designed applications can transform the way a business operates." />
        </Reveal>

        <div role="tablist" aria-label="Product concepts" onKeyDown={onKey} className="mt-12 flex gap-2 overflow-x-auto pb-2 lg:justify-center">
          {items.map((it, n) => (
            <button
              key={it.id}
              ref={(el) => { refs.current[n] = el; }}
              role="tab"
              id={`tab-${it.id}`}
              aria-selected={i === n}
              aria-controls={`panel-${it.id}`}
              tabIndex={i === n ? 0 : -1}
              onClick={() => setI(n)}
              className={`shrink-0 rounded-xl px-5 py-3 text-sm font-semibold transition ${i === n ? "bg-gradient-to-r from-brand to-[#8b5cf6] text-white shadow-lg shadow-brand/30" : "border border-white/15 text-slate-300 hover:bg-white/10 hover:text-white"}`}
            >
              {it.tab}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${cur.id}`} aria-labelledby={`tab-${cur.id}`} className="mt-8 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div key={cur.id} className="fade-in">
            <cur.UI />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-brand">Illustrative concept</p>
            <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">{cur.title}</h3>
            <dl className="mt-6 space-y-5">
              <div><dt className="text-sm font-bold text-brand-soft">The problem</dt><dd className="mt-1 leading-relaxed text-slate-300">{cur.problem}</dd></div>
              <div><dt className="text-sm font-bold text-brand-soft">The proposed solution</dt><dd className="mt-1 leading-relaxed text-slate-300">{cur.solution}</dd></div>
            </dl>
            <button
              onClick={() => startInquiry({ need: cur.need, note: `Similar to: ${cur.title}` })}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-brand-soft active:scale-[0.98]"
            >
              Discuss a Similar Project <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-slate-400">Interface previews are fictional design concepts with placeholder data. They are not completed client projects.</p>
      </div>
    </section>
  );
}
