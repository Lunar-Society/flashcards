import Link from "next/link";
import { books, Book } from "@/lib/books";
import { siteLectures, siteSubjects } from "@/lib/episodes";
import { Episode, totalCardCount } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { Shell } from "@/components/Shell";

export default function Page() {
  const decks = [...siteLectures, ...siteSubjects];
  return (
    <Shell home={false} wide>
      <h1 className="max-w-col text-[1.35rem] font-normal italic leading-snug text-ink-muted">
        Notes on{" "}
        <a href="#books" className="link">
          books
        </a>{" "}
        I&rsquo;ve read, and{" "}
        <a href="#flashcards" className="link">
          flashcards
        </a>{" "}
        for episodes of the{" "}
        <a href="https://www.youtube.com/@DwarkeshPatel" className="link">
          Dwarkesh Podcast
        </a>
        .
      </h1>

      <section id="books" className="mt-10 scroll-mt-8 sm:mt-12">
        <SectionHeading>Books</SectionHeading>
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 md:grid-cols-4">
          {books.map((b) => (
            <BookTile key={b.slug} book={b} />
          ))}
        </ul>
      </section>

      <section id="flashcards" className="mt-20 scroll-mt-8 sm:mt-24">
        <SectionHeading>Flashcards</SectionHeading>
        <ul>
          {decks.map((ep) => (
            <DeckRow key={ep.slug} ep={ep} />
          ))}
        </ul>
      </section>
    </Shell>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-rule pb-2 text-[1.5rem] font-normal italic leading-none">{children}</h2>
  );
}

const coverShadow = "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_20px_-10px_rgba(0,0,0,0.4)]";

function BookTile({ book }: { book: Book }) {
  // An entry about several books shows a small stack of their covers.
  const behind = (book.books ?? []).filter((b) => b.cover !== book.cover).slice(0, 2);
  return (
    <li>
      <Link href={`/${book.slug}/`} className="group block">
        <div className="relative aspect-[2/3]">
          {behind
            .slice()
            .reverse()
            .map((b, i, arr) => {
              const depth = arr.length - i; // 2 = furthest back
              return (
                <img
                  key={b.cover}
                  src={`/covers/${b.cover}`}
                  alt=""
                  loading="lazy"
                  className={`absolute h-full w-full object-cover ${coverShadow}`}
                  style={{ transform: `translate(${depth * 7}px, ${-depth * 7}px)`, filter: "brightness(0.9)" }}
                />
              );
            })}
          <img
            src={`/covers/${book.cover}`}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            className={`relative h-full w-full object-cover transition-transform duration-200 group-hover:-translate-y-1 ${coverShadow}`}
          />
          {book.youtube ? (
            <span
              className="absolute bottom-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(17,17,17,0.78)] text-white"
              title="Has a video"
            >
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true" className="ml-0.5">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
              <span className="sr-only">Has a video</span>
            </span>
          ) : null}
        </div>
        <h3 className="mt-3.5 text-[1.12rem] italic leading-tight transition-colors group-hover:text-accent">
          {book.title}
        </h3>
        <p className="mt-0.5 text-[0.98rem] leading-tight text-ink-muted">{book.books ? `${book.books.length} books` : book.author}</p>
      </Link>
    </li>
  );
}

function DeckRow({ ep }: { ep: Episode }) {
  const cards = totalCardCount(ep);
  const upcoming = !ep.youtubeUrl && !ep.date && (ep.kind ?? "lecture") === "lecture";
  const heading = ep.guest ?? ep.title;
  return (
    <li className="border-b border-rule">
      <Link
        href={`/${ep.slug}/`}
        className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
      >
        <span className="text-[1.2rem] leading-snug">
          <span className="transition-colors group-hover:text-accent">{heading}</span>
          {ep.blurb ? <span className="italic text-ink-muted">: {ep.blurb}</span> : null}
        </span>
        <span className="label lining shrink-0 whitespace-nowrap">
          {ep.date ? `${formatDate(ep.date)} · ` : ""}
          {cards} card{cards === 1 ? "" : "s"}
          {upcoming ? " · upcoming" : ""}
        </span>
      </Link>
    </li>
  );
}
