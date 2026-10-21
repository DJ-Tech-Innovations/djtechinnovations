/**
 * Renders /public/logo.svg (white wordmark, built for dark backgrounds).
 * The SVG has a 1500x600 canvas with empty margins, so it is cropped to the
 * artwork's bounds (x 140–1358, y 135–465) with CSS instead of editing the file.
 */
const W = 1218;
const H = 330;

export function Logo({ className = "h-11" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="DJ Tech Innovations"
      className={`relative block shrink-0 overflow-hidden ${className}`}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt=""
        draggable={false}
        className="absolute max-w-none select-none"
        style={{
          width: `${(1500 / W) * 100}%`,
          left: `${-(140 / W) * 100}%`,
          top: `${-(135 / H) * 100}%`,
        }}
      />
    </span>
  );
}
