export function BrowserFrame({ title = "app.yourbusiness.example", children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0f1729] shadow-2xl shadow-black/40 ${className}`} role="img" aria-label="Illustrative software interface concept">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-[10px] text-slate-400">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function Sidebar({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="hidden w-[132px] shrink-0 border-r border-white/10 p-3 sm:block">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-5 w-5 rounded-md bg-gradient-to-br from-cyan-brand to-[#8b5cf6]" />
        <span className="h-2 w-12 rounded bg-white/30" />
      </div>
      {items.map((it, i) => (
        <div key={it} className={`mb-1 rounded-lg px-2.5 py-1.5 text-[10px] font-medium ${i === active ? "bg-brand/25 text-white" : "text-slate-400"}`}>
          {it}
        </div>
      ))}
    </div>
  );
}

export function Kpi({ label, value, delta, up = true }: { label: string; value: string; delta: string; up?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="text-[9px] uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-bold text-white">{value}</div>
      <div className={`text-[9px] font-semibold ${up ? "text-emerald-400" : "text-amber-400"}`}>{delta}</div>
    </div>
  );
}

export function Area({ id, d, d2 }: { id: string; d: string; d2?: string }) {
  return (
    <svg viewBox="0 0 300 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#818cf8" stopOpacity=".45" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#fff" strokeOpacity=".07" />)}
      <path d={`${d} L300 100 L0 100Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke="#a5b4fc" strokeWidth="2" className="draw-line" />
      {d2 && <path d={d2} fill="none" stroke="#22d3ee" strokeWidth="2" strokeOpacity=".8" strokeDasharray="4 4" />}
    </svg>
  );
}
