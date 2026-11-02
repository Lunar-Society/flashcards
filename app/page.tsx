import Link from "next/link";
import { books, Book, showAuthor } from "@/lib/books";
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
        <a href="#reading" className="link">
          books and essays
        </a>{" "}
        I&rsquo;ve read, and{" "}
        <a href="#flashcards" className="link">
          flashcards
        </a>{" "}
        for episodes of the Dwarkesh Podcast (
        <a href="https://www.dwarkesh.com" className="link">
          Substack
        </a>
        ,{" "}
        <a href="https://www.youtube.com/@DwarkeshPatel" className="link">
          YouTube
        </a>
        ).
      </h1>

      <section id="reading" className="mt-10 scroll-mt-8 sm:mt-12">
        <SectionHeading>Reading</SectionHeading>
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 md:grid-cols-4 md:gap-x-10">
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

function VideoBadge() {
  return (
    <span
      className="absolute bottom-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(17,17,17,0.78)] text-white"
      title="Has a video"
    >
      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true" className="ml-0.5">
        <path d="M7 4.5v15l13-7.5z" />
      </svg>
      <span className="sr-only">Has a video</span>
    </span>
  );
}

function Cover({ src, alt, video = false }: { src: string; alt: string; video?: boolean }) {
  return (
    <div className="relative aspect-[2/3]">
      <img
        src={`/covers/${src}`}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-200 group-hover:-translate-y-1 ${coverShadow}`}
      />
      {video ? <VideoBadge /> : null}
    </div>
  );
}

// Stands in for a cover: articles have none, and a book may not have one
// yet. Same size as a cover so the shelf stays even.
function TitleCard({ book }: { book: Book }) {
  return (
    <div
      className={`relative flex aspect-[2/3] flex-col border border-rule bg-wash p-4 transition-transform duration-200 group-hover:-translate-y-1 sm:p-5 ${coverShadow}`}
    >
      <span className="label">{book.kind === "article" ? "Essay" : "Book"}</span>
      <span className="mt-auto text-[1.25rem] italic leading-[1.15] sm:text-[1.4rem]">{book.title}</span>
      <span className="mt-3 border-t border-rule pt-2 text-[0.95rem] leading-tight text-ink-muted">
        {book.author}
      </span>
      {book.youtube ? <VideoBadge /> : null}
    </div>
  );
}

function BookTile({ book }: { book: Book }) {
  const books = book.books;
  // The covers already name the books, so a multi-book tile is captioned
  // with the piece's own subtitle when it has one.
  const caption = books ? (book.subtitle ?? book.title) : book.title;
  return (
    <li>
      <Link href={`/${book.slug}/`} className="group block">
        {books ? (
          <CoverFan book={book} />
        ) : book.cover ? (
          <Cover src={book.cover} alt={`Cover of ${book.title}`} video={!!book.youtube} />
        ) : (
          <TitleCard book={book} />
        )}
        <h3 className="mt-3.5 text-[1.12rem] italic leading-tight transition-colors group-hover:text-accent">
          {caption}
        </h3>
        {showAuthor(book) || books ? (
          <p className="mt-0.5 text-[0.98rem] leading-tight text-ink-muted">{book.author}</p>
        ) : null}
      </Link>
    </li>
  );
}

// One piece about several books: the first few covers fanned out inside a
// single cover's footprint, front cover bottom-left.
const FAN = 3;

function CoverFan({ book }: { book: Book }) {
  const books = book.books!;
  const shown = books.slice(0, FAN);
  const k = shown.length;
  // Each cover is 80% of the tile's width, stepped up and to the right.
  const stepX = 20 / (k - 1);
  const stepY = 20 / (k - 1);
  return (
    <div className="relative aspect-[2/3] transition-transform duration-200 group-hover:-translate-y-1">
      {shown
        .map((b, i) => (
          <img
            key={b.title}
            src={`/covers/${b.cover}`}
            alt={`Cover of ${b.title}`}
            loading="lazy"
            style={{ left: `${i * stepX}%`, top: `${(k - 1 - i) * stepY}%` }}
            className={`absolute aspect-[2/3] w-[80%] object-cover ${coverShadow}`}
          />
        ))
        .reverse()}
      {books.length > k ? (
        <span className="lining absolute right-0 top-0 rounded-full bg-[rgba(17,17,17,0.78)] px-2 py-0.5 text-[0.8rem] text-white">
          +{books.length - k}
        </span>
      ) : null}
      {book.youtube ? <VideoBadge /> : null}
    </div>
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
