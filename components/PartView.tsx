import Link from "next/link";
import { Part, Series, readingMinutes, roman } from "@/lib/series";
import { formatDay } from "@/lib/format";
import { Prose } from "./Prose";
import { SectionNav } from "./SectionNav";
import { Shell } from "./Shell";
import { Subscribe } from "./Subscribe";
import { YouTube } from "./YouTube";

// One essay of a series: the video essay up top, the text with its
// footnotes in the margin, contents in the other margin, and the way on to
// the next part.
export function PartView({ series, part }: { series: Series; part: Part }) {
  const i = series.parts.indexOf(part);
  const prev = series.parts[i - 1];
  const next = series.parts[i + 1];
  return (
    <Shell>
      <article className="relative">
        {part.sections.length ? (
          <aside className="absolute bottom-0 right-[calc(100%+3.5rem)] top-0 hidden w-[13rem] xl:block">
            <SectionNav sections={part.sections} />
          </aside>
        ) : null}

        <header>
          <p className="label">
            <Link href={`/${series.slug}/`} className="transition-colors hover:text-accent">
              {series.title}
            </Link>
            {" · "}Part {roman(part.n)} of {roman(series.parts.length)}
          </p>
          <h1 className="mt-4 text-[2.3rem] font-normal italic leading-[1.08] tracking-[-0.012em] sm:text-[3rem]">
            {part.title}
          </h1>
          {part.subtitle ? <p className="mt-4 text-[1.35rem] italic leading-snug text-ink-muted">{part.subtitle}</p> : null}
          <p className="label lining mt-5">
            Dwarkesh Patel
            {part.date ? ` · ${formatDay(part.date)}` : ""} · {readingMinutes(part.words)} min read
          </p>
        </header>

        <div className="mt-10">
          {part.youtube ? (
            <YouTube url={part.youtube} title={`${part.title}, read by Dwarkesh`} />
          ) : (
            <div className="flex aspect-[16/6] flex-col items-center justify-center border border-rule bg-wash px-6 text-center">
              <span className="label">Video essay</span>
              <span className="mt-2 text-[1.15rem] italic text-ink-muted">Dwarkesh reads Part {roman(part.n)}, with charts. Coming soon.</span>
            </div>
          )}
        </div>

        <div className="series-body mt-12">
          <Prose idPrefix={`p${part.n}`}>{part.body}</Prose>
        </div>

        <footer className="mt-20 border-t border-rule pt-8">
          {next ? (
            next.out ? (
              <Link href={`/${series.slug}/${next.slug}/`} className="group block">
                <span className="label">Next · Part {roman(next.n)}</span>
                <span className="mt-2 block text-[1.6rem] italic leading-snug transition-colors group-hover:text-accent">
                  {next.title} →
                </span>
              </Link>
            ) : (
              <div>
                <span className="label">
                  Part {roman(next.n)} · {next.date ? `out ${formatDay(next.date)}` : "coming soon"}
                </span>
                <span className="mt-2 block text-[1.6rem] italic leading-snug text-ink-muted">{next.title}</span>
              </div>
            )
          ) : (
            <p className="text-[1.15rem] italic text-ink-muted">That&rsquo;s the end of the series.</p>
          )}
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[1.05rem]">
            {prev ? (
              <Link href={`/${series.slug}/${prev.slug}/`} className="link">
                ← Part {roman(prev.n)}
              </Link>
            ) : null}
            <Link href={`/${series.slug}/`} className="link">
              All parts
            </Link>
          </p>
          <div className="mt-10">
            <Subscribe />
          </div>
        </footer>
      </article>
    </Shell>
  );
}

// The whole series on one page, for reading straight through or printing.
export function SeriesAllView({ series }: { series: Series }) {
  const parts = series.parts.filter((p) => p.out);
  return (
    <Shell>
      <header className="series-title-page">
        <p className="label">
          <Link href={`/${series.slug}/`} className="transition-colors hover:text-accent">
            An essay series
          </Link>
        </p>
        <h1 className="mt-4 text-[2.9rem] font-normal italic leading-[1.02] tracking-[-0.015em] sm:text-[4rem]">
          {series.title}
        </h1>
        <p className="mt-6 text-[1.15rem] text-ink-muted">Dwarkesh Patel</p>
        <ol className="mt-10 space-y-2 text-[1.15rem]">
          {parts.map((p) => (
            <li key={p.n}>
              <a href={`#part-${p.n}`} className="link">
                <span className="text-accent">{roman(p.n)}.</span> {p.title}
              </a>
            </li>
          ))}
        </ol>
      </header>
      {parts.map((p) => (
        <section key={p.n} id={`part-${p.n}`} className="series-part mt-24 scroll-mt-8">
          <p className="label">Part {roman(p.n)}</p>
          <h2 className="mt-3 text-[2.2rem] font-normal italic leading-[1.1] sm:text-[2.7rem]">{p.title}</h2>
          <div className="series-body mt-10">
            <Prose idPrefix={`p${p.n}`}>{p.body}</Prose>
          </div>
        </section>
      ))}
    </Shell>
  );
}
