"use client";
const colors = ["#22d3ee", "#818cf8", "#8b5cf6", "#f472b6", "#fbbf24", "#34d399"];

export function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-visible">
      {Array.from({ length: 44 }, (_, i) => (
        <span
          key={i}
          className="confetti absolute top-8 block h-2.5 w-1.5 rounded-sm"
          style={{
            left: `${(i * 37) % 100}%`,
            background: colors[i % colors.length],
            ["--dx" as string]: `${((i * 53) % 160) - 80}px`,
            ["--r" as string]: `${(i * 97) % 720}deg`,
            animationDelay: `${(i % 9) * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}
