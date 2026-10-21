"use client";
import { ArrowRight, Bell, CheckCircle2, GitBranch } from "lucide-react";
import { useRef } from "react";
import { Rotator } from "../rotator";
import { startInquiry } from "@/lib/events";
import { Area, BrowserFrame, Kpi, Sidebar } from "../mockups/parts";

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5).toFixed(3)));
    el.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5).toFixed(3)));
  };
  const onLeave = () => { stage.current?.style.setProperty("--px", "0"); stage.current?.style.setProperty("--py", "0"); };
  return (
    <section id="home" onPointerMove={onMove} onPointerLeave={onLeave} className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-32 text-white lg:pb-28 lg:pt-40">
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div className="absolute -left-40 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-brand/25 blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-32 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-brand/15 blur-[120px]" aria-hidden="true" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.02fr_1fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-soft">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-brand" /> Your ideas. Our technology.
          </p>
          <h1 className="text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl xl:text-[4.25rem]">
            We Build Digital Solutions That <span className="text-grad">Move Your Business Forward.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            From powerful web applications to custom business software, we transform complex business challenges into simple, scalable digital experiences designed around the way you work.
          </p>
          <Rotator />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => startInquiry()}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand to-[#8b5cf6] px-7 py-4 text-base font-semibold shadow-xl shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-brand/50 active:translate-y-0 active:scale-[0.98]"
            >
              <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" aria-hidden="true" />Start a Project <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold backdrop-blur transition hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
            >
              Explore Our Services
            </a>
          </div>
          <p className="mt-8 text-sm font-medium text-slate-400">
            Practical technology. Purpose-built solutions. Business-focused results.
          </p>
        </div>

        {/* hero visual */}
        <div ref={stage} className="relative mx-auto w-full max-w-[620px] lg:max-w-none" aria-hidden="true" style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}>
          <div className="float-b relative">
            <BrowserFrame title="app.yourbusiness.example/overview" className="transition-transform duration-200 ease-out [transform:perspective(1600px)_rotateY(calc(-6deg_+_var(--px)*10deg))_rotateX(calc(2deg_-_var(--py)*8deg))]">
              <div className="flex">
                <Sidebar items={["Overview", "Sales", "Inventory", "Customers", "Automations", "Reports"]} />
                <div className="min-w-0 flex-1 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-xs font-semibold">Operations overview</div>
                    <div className="rounded-md bg-white/5 px-2 py-1 text-[9px] text-slate-400">Illustrative concept</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Kpi label="Revenue" value="₱ 1.24M" delta="▲ sample" />
                    <Kpi label="Open orders" value="86" delta="▲ sample" />
                    <Kpi label="Tasks automated" value="214" delta="▲ sample" />
                  </div>
                  <div className="mt-3 h-28 rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:h-36">
                    <Area id="hero" d="M0 75 C25 70 45 85 75 60 S125 45 155 52 S215 25 250 32 S290 12 300 14" d2="M0 88 C40 82 75 72 115 74 S190 62 230 58 S280 48 300 44" />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                      <div className="mb-1.5 text-[9px] uppercase tracking-wider text-slate-400">Stock health</div>
                      {[78, 52, 31].map((w, i) => <div key={i} className="mb-1.5 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-brand to-cyan-brand" style={{ width: `${w}%` }} /></div>)}
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                      <div className="mb-1.5 text-[9px] uppercase tracking-wider text-slate-400">Team tasks</div>
                      {["Approve quotation", "Send invoice", "Update stock"].map((t) => <div key={t} className="mb-1 flex items-center gap-1.5 text-[9px] text-slate-300"><span className="h-2.5 w-2.5 rounded border border-brand-soft" />{t}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>

          {/* floating UI */}
          <div style={{ translate: "calc(var(--px) * -28px) calc(var(--py) * -20px)" }} className="float-a absolute -left-3 top-[58%] hidden w-52 rounded-2xl border border-white/15 bg-navy-900/80 p-3.5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:block lg:-left-10">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold"><GitBranch className="h-4 w-4 text-cyan-brand" /> Workflow</div>
            {["Order received", "Approval sent", "Stock updated"].map((t, i) => (
              <div key={t} className="flex items-center gap-2 py-1 text-[10px] text-slate-300">
                <span className={`flex h-4 w-4 items-center justify-center rounded-full ${i < 2 ? "bg-emerald-400/20 text-emerald-300" : "bg-brand/30 text-brand-soft"}`}><CheckCircle2 className="h-3 w-3" /></span>{t}
              </div>
            ))}
          </div>
          <div style={{ translate: "calc(var(--px) * 34px) calc(var(--py) * 22px)" }} className="float-b absolute -right-2 -top-6 hidden w-48 rounded-2xl border border-white/15 bg-navy-900/80 p-3.5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:block lg:-right-6">
            <div className="flex items-center gap-2 text-[11px] font-semibold"><Bell className="h-4 w-4 text-brand-soft" /> Automated alert</div>
            <p className="mt-1.5 text-[10px] leading-snug text-slate-300">Reorder notice sent to purchasing when stock runs low.</p>
          </div>
          <div style={{ translate: "calc(var(--px) * 48px) calc(var(--py) * 30px)" }} className="float-a absolute -bottom-8 right-4 hidden w-28 rounded-[1.4rem] border-4 border-[#1b2437] bg-gradient-to-b from-cyan-brand/80 via-[#3b8bf5] to-[#8b3ff0] p-2.5 shadow-2xl shadow-black/50 sm:block lg:right-0">
            <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-black/30" />
            <div className="space-y-1.5">{[1, 2, 3].map((i) => <div key={i} className="rounded-lg bg-white/25 p-1.5"><div className="h-1 w-3/4 rounded bg-white/70" /><div className="mt-1 h-1 w-1/2 rounded bg-white/40" /></div>)}</div>
            <div className="mt-6 h-6 rounded-lg bg-white/90" />
          </div>
        </div>
      </div>
    </section>
  );
}
