"use client";
import { useEffect } from "react";

/** Sets --mx/--my on any .spot element under the pointer so cards get a cursor-following glow. */
export function Spotlight() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);
  return null;
}
