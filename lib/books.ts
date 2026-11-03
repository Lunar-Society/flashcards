// Reading notes. Each book (or article) is one Markdown file in
// `content/books/`:
//
//   ---
//   slug: his-excellency          # URL: /<slug>/ (must not clash with a deck)
//   title: His Excellency
//   author: Joseph J. Ellis
//   subtitle: George Washington   # optional
//   kind: article                 # optional; for an essay or blog post
//                                 # rather than a book. Needs `link`, and
//                                 # gets a generated essay cover.
//   source: Presidential Studies Quarterly  # optional; shown on an essay
//                                 # cover. Defaults to the link's site.
//   date: 2026-11-02              # when written; sorts the shelf, newest first
//   cover: his-excellency.jpg     # file in public/covers/ (optional;
//                                 # without one the shelf shows a title
//                                 # card)
//   youtube: https://youtu.be/... # optional; only for a video of me
//                                 # narrating this exact piece. Embedded
//                                 # at the top and marks the shelf tile
//                                 # with a play badge.
//   substack: https://...         # optional; marks this as a mirror of a
//                                 # Substack post (sets the canonical URL).
//                                 # "url | Post title" for a piece that is
//                                 # one part of a longer post.
//   link: https://...             # optional; where to get the book. Defaults
//                                 # to an Amazon search for title + author.
//   books:                        # optional; for one piece about several
//     - The Power Broker | power-broker.jpg   # books: "Title | cover", plus
//                                 # an optional "| link". The shelf fans
//                                 # the first few covers into one tile.
//                                 # Leave the cover empty for an essay
//                                 # ("Title | | link"): it gets a
//                                 # generated essay cover.
//   draft: true                   # optional; hides the entry
//   todo: true                    # optional; flags it in the review
//                                 # editor as still to write or clean
//                                 # up. The site ignores it.
//   ---
//
//   Body in Markdown. Footnotes ([^1]) collect at the end.
//
// Files are read at build time, so a new book is just a new file.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { episodes } from "./episodes";
import { series } from "./series";

// Where to get a book: an Amazon page or search, or wherever it's
// published (some books are free online).
export type BookLink = { url: string; label: string };

export type BookRef = { title: string; cover?: string; link: BookLink };

export type Book = {
  slug: string;
  title: string;
  author: string;
  subtitle?: string;
  kind: "book" | "article";
  date: string;
  cover?: string;
  youtube?: string;
  substack?: string;
  // Title of the Substack post, when this piece is one part of it.
  from?: string;
  // Where an essay was published, for its generated cover.
  source?: string;
  link: BookLink;
  books?: BookRef[];
  body: string;
  words: number;
};

const DIR = join(process.cwd(), "content/books");

function parse(file: string): Book & { draft?: boolean } {
  const raw = readFileSync(join(DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const fm: Record<string, string | string[]> = {};
  let listKey: string | null = null;
  for (const line of m[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      (fm[listKey] as string[]).push(item[1].trim());
      continue;
    }
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: can't parse frontmatter line "${line}"`);
    if (kv[2] === "") {
      listKey = kv[1];
      fm[listKey] = [];
    } else {
      listKey = null;
      fm[kv[1]] = kv[2].replace(/^["'](.*)["']$/, "$1");
    }
  }
  const str = (k: string) => (typeof fm[k] === "string" ? (fm[k] as string) : undefined);
  for (const k of ["slug", "title", "author", "date"]) {
    if (!str(k)) throw new Error(`${file}: frontmatter needs "${k}"`);
  }
  const books = Array.isArray(fm.books)
    ? fm.books.map((s) => {
        const [title, cover, url] = s.split("|").map((x) => x.trim());
        if (!title) throw new Error(`${file}: books entries look like "Title | cover.jpg"`);
        if (!cover && !url) throw new Error(`${file}: "${title}" has no cover, so it needs a link`);
        return { title, cover: cover || undefined, link: bookLink(url, title, str("author")!) };
      })
    : undefined;
  const cover = str("cover") ?? books?.[0]?.cover;
  const kind = str("kind") ?? "book";
  if (kind !== "book" && kind !== "article") throw new Error(`${file}: kind is "book" or "article"`);
  if (kind === "article" && !str("link")) throw new Error(`${file}: an article needs a "link"`);
  const [substack, from] = (str("substack") ?? "").split("|").map((x) => x.trim());
  const body = m[2].replace(/<!--[\s\S]*?-->/g, "").trim();
  return {
    slug: str("slug")!,
    title: str("title")!,
    author: str("author")!,
    subtitle: str("subtitle"),
    kind,
    date: str("date")!,
    cover,
    youtube: str("youtube"),
    substack: substack || undefined,
    from: from || undefined,
    source: str("source") ?? (kind === "article" ? siteName(str("link")!) : undefined),
    link: bookLink(str("link"), str("title")!, str("author")!),
    draft: str("draft") === "true",
    books: books && books.length > 1 ? books : undefined,
    body,
    words: body.split(/\s+/).filter(Boolean).length,
  };
}

function siteName(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

function bookLink(url: string | undefined, title: string, author: string): BookLink {
  if (!url) {
    const q = encodeURIComponent(`${title} ${author}`).replace(/%20/g, "+");
    return { url: `https://www.amazon.com/s?k=${q}&i=stripbooks`, label: "Find on Amazon" };
  }
  const host = new URL(url).hostname;
  return { url, label: /(^|\.)amazon\./.test(host) ? "Find on Amazon" : "Read it online" };
}

function load(): Book[] {
  const all = readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    // The review editor (`npm run edit`) previews drafts too.
    .filter((b) => !b.draft || process.env.SHOW_DRAFTS === "1");
  const seen = new Set([...episodes.map((e) => e.slug), ...series.map((s) => s.slug)]);
  for (const b of all) {
    if (seen.has(b.slug)) throw new Error(`Book slug "${b.slug}" clashes with another page`);
    seen.add(b.slug);
  }
  return all.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export const books: Book[] = load();

// The author's name is worth showing unless the title already says it
// ("The books of Robert Caro").
export function showAuthor(book: Book): boolean {
  const surname = book.author.split(" ").pop() ?? "";
  return !book.title.includes(surname);
}

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
