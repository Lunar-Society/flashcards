import Link from "next/link";
import { Series, readingMinutes, roman, totalWords } from "@/lib/series";
import { formatDay } from "@/lib/format";
import { Prose } from "./Prose";
import { Shell } from "./Shell";
import { Subscribe } from "./Subscribe";

const NUMBER_WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

// The series' own front page: a title page and a contents page.
export function SeriesView({ series }: { series: Series }) {
  const words = totalWords(series);
  const firstOut = series.parts.find((p) => p.out);
  return (
    <Shell>
      <header className="pt-4 sm:pt-10">
        <p className="label">An essay series in {NUMBER_WORDS[series.parts.length - 1] ?? series.parts.length} parts</p>
        <h1 className="mt-4 text-[2.9rem] font-normal italic leading-[1.02] tracking-[-0.015em] sm:text-[4rem]">
          {series.title}
        </h1>
        {series.subtitle ? <p className="mt-5 text-[1.45rem] italic leading-snug text-ink-muted">{series.subtitle}</p> : null}
        <p className="mt-6 text-[1.15rem] text-ink-muted">
          Dwarkesh Patel
          <span className="lining">
            {" "}
            · {words.toLocaleString()} words · about {Math.round(readingMinutes(words) / 10) * 10} minutes to read
          </span>
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[1.15rem]">
          {firstOut ? (
            <Link href={`/${series.slug}/${firstOut.slug}/`} className="link">
              Start with Part {roman(firstOut.n)} →
            </Link>
          ) : null}
          <Link href={`/${series.slug}/all/`} className="link">
            Read it all on one page
          </Link>
        </div>
      </header>

      {series.intro ? (
        <div className="mt-12">
          <Prose>{series.intro}</Prose>
        </div>
      ) : null}

      <ol className="mt-14 border-t border-rule">
        {series.parts.map((p) => {
          const href = `/${series.slug}/${p.slug}/`;
          return (
            <li key={p.n} className="grid grid-cols-[3.2rem_1fr] gap-x-3 border-b border-rule py-9 sm:grid-cols-[4.5rem_1fr]">
              <span className="text-[2.2rem] italic leading-none text-accent sm:text-[2.8rem]" aria-hidden>
                {roman(p.n)}
              </span>
              <div>
                <p className="label">Part {roman(p.n)}</p>
                <h2 className="mt-1.5 text-[1.55rem] font-normal italic leading-[1.18] sm:text-[1.8rem]">
                  {p.out ? (
                    <Link href={href} className="transition-colors hover:text-accent">
                      {p.title}
                    </Link>
                  ) : (
                    <span className="text-ink-muted">{p.title}</span>
                  )}
                </h2>
                {p.subtitle ? <p className="mt-2 text-[1.15rem] italic text-ink-muted">{p.subtitle}</p> : null}
                <p className="label lining mt-3">
                  {p.out ? `${readingMinutes(p.words)} min read` : p.date ? `Out ${formatDay(p.date)}` : "Coming soon"}
                  {" · "}
                  {p.youtube ? "video essay" : "video essay coming"}
                </p>
                {p.sections.length ? (
                  <ul className="mt-4 space-y-1 text-[1.02rem] leading-snug text-ink-muted">
                    {p.sections.map((s) => (
                      <li key={s.id}>
                        {p.out ? (
                          <Link href={`${href}#${s.id}`} className="transition-colors hover:text-accent">
                            {s.title}
                          </Link>
                        ) : (
                          s.title
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-12">
        <Subscribe />
      </div>
    </Shell>
  );
}
