"use client";
import { useSyncExternalStore } from "react";
import { Logo } from "../logo";

const go = (href: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

function Placeholder({ label }: { label: string }) {
  return (
    <span className="inline-block rounded border border-dashed border-slate-500 px-2 py-0.5 text-xs text-slate-400" title="Placeholder: not yet supplied">
      {label}
    </span>
  );
}

export function Footer() {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026,
  );

  const col = (title: string, links: [string, string][]) => (
    <div>
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map(([l, h]) => (
          <li key={l}><a href={h} onClick={go(h)} className="text-sm text-slate-400 transition hover:text-white">{l}</a></li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer id="contact" className="scroll-mt-20 bg-navy-950 pt-16 text-slate-300">
      <div className="container-x grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
        <div className="md:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
            DJ Tech Innovations is a technology partner that builds practical web applications, business software and automation for growing businesses.
          </p>
        </div>
        {col("Company", [["About Us", "#about"], ["Our Process", "#process"], ["Contact", "#contact"]])}
        {col("Services", [["Web Applications", "#services"], ["Business Software", "#services"], ["Mobile Applications", "#services"], ["Custom Solutions", "#services"], ["Integrations and Automation", "#services"]])}
        {col("Resources", [["Frequently Asked Questions", "#faq"], ["Project Inquiry", "#inquiry"]])}
        <div>
          <h3 className="text-sm font-bold text-white">Connect</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>Email: <Placeholder label="[email to be added]" /></li>
            <li>Facebook: <Placeholder label="[link to be added]" /></li>
            <li>LinkedIn: <Placeholder label="[link to be added]" /></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-sm text-slate-400 sm:flex-row">
          <p>© {year} DJ Tech Innovations. All rights reserved.</p>
          <p className="flex gap-5">
            <span title="Placeholder: policy page not yet published">Privacy Policy <Placeholder label="[coming soon]" /></span>
            <span title="Placeholder: terms page not yet published">Terms of Service <Placeholder label="[coming soon]" /></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
