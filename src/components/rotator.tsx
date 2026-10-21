"use client";
import { useEffect, useState } from "react";

const words = ["web applications", "business software", "mobile apps", "automations", "custom solutions"];

/** Types and erases a rotating list of what we build. Static text under reduced motion. */
export function Rotator() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(words[0].length);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = words[i];
    const t = setTimeout(
      () => {
        if (!del && n < w.length) setN(n + 1);
        else if (!del) setDel(true);
        else if (n > 0) setN(n - 1);
        else { setDel(false); setI((i + 1) % words.length); }
      },
      !del && n === w.length ? 1500 : del ? 35 : 70,
    );
    return () => clearTimeout(t);
  }, [i, n, del]);

  return (
    <p className="mt-6 flex items-center gap-2 font-mono text-sm text-slate-300 sm:text-base" aria-label={`We build ${words.join(", ")}`}>
      <span aria-hidden="true" className="text-cyan-brand">&gt;</span>
      <span aria-hidden="true">We build&nbsp;<span className="font-semibold text-white">{words[i].slice(0, n)}</span><span className="caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-brand-soft" /></span>
    </p>
  );
}
