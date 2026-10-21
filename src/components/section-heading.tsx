export function SectionHeading({
  eyebrow, title, body, tone = "light", align = "center",
}: { eyebrow?: string; title: string; body?: string; tone?: "light" | "dark"; align?: "center" | "left" }) {
  const dark = tone === "dark";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>}
      <h2 className={`text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {body && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-slate-300" : "text-muted"}`}>{body}</p>}
    </div>
  );
}
