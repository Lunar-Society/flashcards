import { CSSProperties } from "react";

// A cover for an essay or blog post, which has none of its own: a
// Penguin-style tri-band, colored top and bottom with the title on a cream
// panel. Text is sized to the cover's width (cqw), so the same design works
// on the shelf, inside a fan of covers, and in a page header.

// Muted band colors; each essay keeps one, picked from its title.
const BANDS = ["#9e2a1f", "#2f5d62", "#a8772a", "#3d4f7a", "#56703f", "#7a4a63"];

function band(title: string): string {
  let h = 0;
  for (const c of title) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return BANDS[h % BANDS.length];
}

export function EssayCover({
  title,
  author,
  source,
  label = "Essay",
  className = "",
  style,
}: {
  title: string;
  author?: string;
  source?: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const color = band(title);
  return (
    <span
      role="img"
      aria-label={`${title}${author ? `, ${author}` : ""}`}
      style={{ containerType: "inline-size", ...style }}
      className={`flex aspect-[2/3] flex-col overflow-hidden bg-[#fbf8ec] ${className}`}
    >
      <span
        className="flex h-[17%] items-center justify-center uppercase tracking-[0.18em] text-white/90"
        style={{ background: color, fontSize: "5.2cqw" }}
      >
        {label}
      </span>
      <span className="flex flex-1 flex-col items-center justify-center px-[9%] text-center">
        <span className="italic leading-[1.12] text-ink" style={{ fontSize: title.length > 40 ? "10cqw" : "12cqw" }}>
          {title}
        </span>
        {author ? (
          <>
            <span className="my-[7cqw] block h-px w-[22%]" style={{ background: color }} />
            <span className="uppercase leading-tight tracking-[0.12em] text-ink-muted" style={{ fontSize: "5.4cqw" }}>
              {author}
            </span>
          </>
        ) : null}
      </span>
      <span
        className="flex h-[17%] items-center justify-center px-[6%] tracking-[0.06em] text-white/85"
        style={{ background: color, fontSize: "4.8cqw" }}
      >
        {source}
      </span>
    </span>
  );
}
