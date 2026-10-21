"use client";
import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

const R = 26;
const C = 2 * Math.PI * R;

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [launch, setLaunch] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.min(scrollY / max, 1) : 0);
      setShow(scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = () => {
    setLaunch(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setLaunch(false), 1400);
  };

  return (
    <div className={`fixed bottom-5 right-5 z-40 transition-all duration-500 sm:bottom-8 sm:right-8 ${show || launch ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"}`}>
      <button
        onClick={go}
        aria-label={`Back to top, ${Math.round(progress * 100)}% scrolled`}
        tabIndex={show ? 0 : -1}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-navy-950 text-white shadow-2xl shadow-brand/40 transition hover:scale-110 active:scale-95"
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="3" />
          <circle cx="32" cy="32" r={R} fill="none" stroke="url(#ringg)" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
          <defs><linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#22d3ee" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient></defs>
        </svg>
        <span className={`relative block h-6 w-6 transition-all ease-in ${launch ? "-translate-y-[60vh] opacity-0 duration-[900ms]" : "duration-300 group-hover:-translate-y-1 group-hover:animate-[shake_0.25s_linear_infinite]"}`}>
          <Rocket aria-hidden="true" className="h-6 w-6 text-white" style={{ transform: "rotate(-45deg)" }} />
          <span aria-hidden="true" className={`absolute left-1/2 top-[92%] h-5 w-2 -translate-x-1/2 origin-top rounded-b-full bg-gradient-to-b from-amber-300 via-orange-500 to-transparent transition-opacity ${launch ? "flame opacity-100" : "opacity-0 group-hover:flame group-hover:opacity-100"}`} />
        </span>
        {launch && [0, 1, 2, 3, 4].map((i) => (
          <span key={i} aria-hidden="true" className="puff absolute bottom-3 left-1/2 h-3 w-3 rounded-full bg-white/60" style={{ ["--x" as string]: `${(i - 2) * 10}px`, animationDelay: `${i * 70}ms` }} />
        ))}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-navy-950 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
          Back to top
        </span>
      </button>
    </div>
  );
}
