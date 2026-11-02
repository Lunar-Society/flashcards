// Book notes. Each book is one Markdown file in `content/books/`:
//
//   ---
//   slug: his-excellency          # URL: /<slug>/ (must not clash with a deck)
//   title: His Excellency
//   author: Joseph J. Ellis
//   subtitle: George Washington   # optional
//   date: 2026-11-02              # when written; sorts the shelf, newest first
//   cover: his-excellency.jpg     # file in public/covers/ (not needed
//                                 # when `books` lists the covers)
//   youtube: https://youtu.be/... # optional; embedded at the top of the page
//   substack: https://...         # optional; marks this as a mirror of a
//                                 # Substack post (sets the canonical URL)
//   books:                        # optional; for one piece about several
//     - The Power Broker | power-broker.jpg   # books. "Title | cover".
//                                 # Every cover shows on the shelf.
//   draft: true                   # optional; hides the entry
//   ---
//
//   Body in Markdown. Footnotes ([^1]) collect at the end.
//
// Files are read at build time, so a new book is just a new file.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { episodes } from "./episodes";

export type BookRef = { title: string; cover: string };

export type Book = {
  slug: string;
  title: string;
  author: string;
  subtitle?: string;
  date: string;
  cover: string;
  youtube?: string;
  substack?: string;
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
        const [title, cover] = s.split("|").map((x) => x.trim());
        if (!title || !cover) throw new Error(`${file}: books entries look like "Title | cover.jpg"`);
        return { title, cover };
      })
    : undefined;
  const cover = str("cover") ?? books?.[0]?.cover;
  if (!cover) throw new Error(`${file}: frontmatter needs "cover" (or a "books" list)`);
  const body = m[2].replace(/<!--[\s\S]*?-->/g, "").trim();
  return {
    slug: str("slug")!,
    title: str("title")!,
    author: str("author")!,
    subtitle: str("subtitle"),
    date: str("date")!,
    cover,
    youtube: str("youtube"),
    substack: str("substack"),
    draft: str("draft") === "true",
    books: books && books.length > 1 ? books : undefined,
    body,
    words: body.split(/\s+/).filter(Boolean).length,
  };
}

function load(): Book[] {
  const all = readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter((b) => !b.draft);
  const seen = new Set(episodes.map((e) => e.slug));
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
