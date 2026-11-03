// Essay series: a few long essays meant to be read in order, each with a
// video of me narrating it, released a week or so apart. One folder per
// series in `content/series/<slug>/`:
//
//   series.md     ---
//                 title: How I see the situation
//                 subtitle: ...              # optional
//                 ---
//                 Optional introduction, shown on the series page.
//
//   1.md, 2.md…   ---
//                 slug: superintelligence    # URL: /<series>/<slug>/
//                 title: We are on track to …
//                 subtitle: ...              # optional
//                 date: 2026-11-16           # release day; before it the
//                                            # part is listed as coming,
//                                            # not published (optional)
//                 youtube: https://...       # the video essay (optional)
//                 draft: true                # optional; hides the part
//                 ---
//                 Body in Markdown, footnotes as [^1].
//
// The series page lives at /<series>/, each part at /<series>/<slug>/,
// and the whole series on one page (for reading straight through, or
// printing) at /<series>/all/.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { slugify } from "./sidenotes";

export type Part = {
  n: number;
  slug: string;
  title: string;
  subtitle?: string;
  date?: string;
  youtube?: string;
  body: string;
  words: number;
  // Top-level sections, for the contents.
  sections: { id: string; title: string }[];
  // Released (no date, or the date has passed) and not a draft.
  out: boolean;
};

export type Series = {
  slug: string;
  title: string;
  subtitle?: string;
  intro: string;
  parts: Part[];
};

const DIR = join(process.cwd(), "content/series");

function frontmatter(raw: string, file: string): { fm: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const fm: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: can't parse frontmatter line "${line}"`);
    fm[kv[1]] = kv[2].replace(/^["'](.*)["']$/, "$1");
  }
  return { fm, body: m[2].replace(/<!--[\s\S]*?-->/g, "").trim() };
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
export const roman = (n: number) => ROMAN[n - 1] ?? String(n);

const today = new Date().toISOString().slice(0, 10);
const showDrafts = process.env.SHOW_DRAFTS === "1";

function load(slug: string): Series {
  const dir = join(DIR, slug);
  const { fm, body: intro } = frontmatter(readFileSync(join(dir, "series.md"), "utf8"), `${slug}/series.md`);
  const parts = readdirSync(dir)
    .filter((f) => /^\d+\.md$/.test(f))
    .map((f): Part & { draft: boolean } => {
      const { fm: p, body } = frontmatter(readFileSync(join(dir, f), "utf8"), `${slug}/${f}`);
      const n = parseInt(f, 10);
      if (!p.title) throw new Error(`${slug}/${f}: frontmatter needs "title"`);
      const sections = [...body.matchAll(/^## (.+)$/gm)].map((m) => {
        const title = m[1].replace(/[*_]/g, "").trim();
        return { id: slugify(title), title };
      });
      const draft = p.draft === "true";
      return {
        n,
        slug: p.slug ?? `part-${n}`,
        title: p.title,
        subtitle: p.subtitle,
        date: p.date,
        youtube: p.youtube,
        body,
        words: body.replace(/\[\^\d+\]:?|!\[[^\]]*\]\([^)]*\)|\]\([^)]*\)/g, " ").split(/\s+/).filter(Boolean).length,
        sections,
        draft,
        out: showDrafts || (!draft && (!p.date || p.date <= today)),
      };
    })
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => a.n - b.n);
  if (!fm.title) throw new Error(`${slug}/series.md: frontmatter needs "title"`);
  return { slug, title: fm.title, subtitle: fm.subtitle, intro, parts };
}

export const series: Series[] = existsSync(DIR)
  ? readdirSync(DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && existsSync(join(DIR, d.name, "series.md")))
      .map((d) => load(d.name))
  : [];

export function getSeries(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 230));
}

export function totalWords(s: Series): number {
  return s.parts.reduce((n, p) => n + p.words, 0);
}
