import { Area, BrowserFrame, Kpi, Sidebar } from "./parts";

const wide = "min-h-[300px] sm:min-h-[340px]";

export function DashboardUI() {
  return (
    <BrowserFrame title="app.yourbusiness.example/dashboard" className={wide}>
      <div className="flex">
        <Sidebar items={["Overview", "Sales", "Inventory", "Customers", "Reports"]} />
        <div className="min-w-0 flex-1 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-semibold text-white">Business overview</div>
            <div className="rounded-md bg-white/5 px-2 py-1 text-[9px] text-slate-400">This month</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Kpi label="Sales" value="₱ —" delta="sample data" />
            <Kpi label="Orders" value="— " delta="sample data" />
            <Kpi label="Low stock" value="—" delta="sample data" up={false} />
          </div>
          <div className="mt-3 h-24 rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:h-28">
            <Area id="dsh" d="M0 70 C30 60 50 80 80 55 S130 40 160 50 S220 20 250 30 S290 10 300 12" d2="M0 85 C40 80 70 70 110 72 S190 60 230 55 S280 45 300 40" />
          </div>
          <div className="mt-3 space-y-1.5">
            {[["Order #1042", "Packed", "emerald"], ["Order #1043", "Pending", "amber"], ["Order #1044", "Shipped", "sky"]].map(([a, b, c]) => (
              <div key={a} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-1.5 text-[10px] text-slate-300">
                <span>{a}</span>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${c === "emerald" ? "bg-emerald-400/15 text-emerald-300" : c === "amber" ? "bg-amber-400/15 text-amber-300" : "bg-sky-400/15 text-sky-300"}`}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function InventoryUI() {
  const rows = [["Item A-001", 82, "In stock"], ["Item B-014", 34, "Reorder soon"], ["Item C-207", 12, "Low"], ["Item D-310", 91, "In stock"], ["Item E-052", 58, "In stock"]] as const;
  return (
    <BrowserFrame title="app.yourbusiness.example/inventory" className={wide}>
      <div className="flex">
        <Sidebar items={["Overview", "Sales", "Inventory", "Purchasing", "Reports"]} active={2} />
        <div className="min-w-0 flex-1 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="text-xs font-semibold text-white">Stock levels</div>
            <div className="flex gap-1.5">
              <span className="rounded-md bg-white/5 px-2 py-1 text-[9px] text-slate-400">Search items…</span>
              <span className="rounded-md bg-brand px-2 py-1 text-[9px] font-semibold text-white">+ New order</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10">
            {rows.map(([n, q, s]) => (
              <div key={n} className="grid grid-cols-[1fr_1.2fr_auto] items-center gap-3 border-b border-white/5 px-3 py-2 last:border-0">
                <span className="text-[10px] text-slate-200">{n}</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <span className={`block h-full rounded-full ${q < 20 ? "bg-amber-400" : "bg-gradient-to-r from-brand to-cyan-brand"}`} style={{ width: `${q}%` }} />
                </span>
                <span className={`text-[9px] font-semibold ${q < 20 ? "text-amber-300" : q < 40 ? "text-sky-300" : "text-emerald-300"}`}>{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <div className="text-[9px] uppercase tracking-wider text-slate-400">Purchase orders</div>
              <div className="mt-2 flex items-end gap-1">{[40, 65, 50, 80, 60, 90].map((h, i) => <span key={i} className="w-full rounded-t bg-brand/70" style={{ height: h * 0.4 }} />)}</div>
            </div>
            <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-[10px] text-amber-200">
              <b className="block text-amber-100">Low stock alert</b>
              Item C-207 is below its reorder level.
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function CrmUI() {
  const cols = [["New", ["Inquiry A", "Inquiry B"]], ["In talks", ["Client C", "Client D", "Client E"]], ["Quoted", ["Client F"]], ["Won", ["Client G", "Client H"]]] as const;
  return (
    <BrowserFrame title="app.yourbusiness.example/customers" className={wide}>
      <div className="flex">
        <Sidebar items={["Overview", "Customers", "Pipeline", "Tasks", "Reports"]} active={2} />
        <div className="min-w-0 flex-1 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-semibold text-white">Customer pipeline</div>
            <div className="flex -space-x-1.5">{["#6366f1", "#22d3ee", "#a78bfa"].map((c) => <span key={c} className="h-5 w-5 rounded-full border-2 border-[#0f1729]" style={{ background: c }} />)}</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {cols.map(([t, cards]) => (
              <div key={t} className="rounded-xl bg-white/[0.03] p-1.5">
                <div className="mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">{t}</div>
                {cards.map((c, i) => (
                  <div key={c} className="mb-1.5 rounded-lg border border-white/10 bg-white/[0.06] p-2">
                    <div className="text-[9px] font-medium text-slate-100">{c}</div>
                    <div className="mt-1.5 h-1 w-2/3 rounded bg-white/15" />
                    <div className="mt-1 flex items-center gap-1"><span className={`h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-cyan-brand" : "bg-brand-soft"}`} /><span className="h-1 w-6 rounded bg-white/10" /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[10px] text-slate-300">
            <b className="text-white">Follow-up reminder</b> · Scheduled for tomorrow, 10:00
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function WorkflowUI() {
  return (
    <BrowserFrame title="app.yourbusiness.example/automations" className={wide}>
      <div className="relative p-4">
        <div className="mb-2 text-xs font-semibold text-white">Order approval workflow</div>
        <svg viewBox="0 0 520 250" className="w-full" aria-hidden="true">
          <g fill="none" stroke="#818cf8" strokeWidth="2" className="flow-line">
            <path d="M120 60 H190" /><path d="M300 60 C340 60 340 125 380 125" /><path d="M300 190 C340 190 340 125 380 125" /><path d="M240 85 V150" />
          </g>
          {[
            [20, 35, "Trigger", "New order received", "#22d3ee"],
            [190, 35, "Condition", "Amount over limit?", "#818cf8"],
            [190, 150, "Action", "Notify approver", "#a78bfa"],
            [380, 100, "Action", "Update records", "#34d399"],
          ].map(([x, y, t, s, c]) => (
            <g key={String(s)} transform={`translate(${x} ${y})`}>
              <rect width="120" height="50" rx="12" fill="#ffffff" fillOpacity=".06" stroke="#fff" strokeOpacity=".14" />
              <rect x="10" y="10" width="6" height="30" rx="3" fill={String(c)} />
              <text x="24" y="22" fill="#94a3b8" fontSize="9" fontWeight="700" letterSpacing="1">{String(t).toUpperCase()}</text>
              <text x="24" y="38" fill="#fff" fontSize="10.5" fontWeight="600">{s}</text>
            </g>
          ))}
        </svg>
        <div className="mt-1 grid grid-cols-3 gap-2 text-[10px] text-slate-300">
          {["Email notice", "Data sync", "Status update"].map((t) => (
            <div key={t} className="flex items-center gap-2 rounded-lg bg-white/[0.05] px-2.5 py-2"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />{t}</div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
