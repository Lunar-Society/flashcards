import Link from "next/link";
import { Book, showAuthor } from "@/lib/books";
import { Episode, totalCardCount } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { EssayCover } from "./EssayCover";

// The homepage's reading shelf and list of flashcard decks, shared by both
// versions of the site.

export function Shelf({ books }: { books: Book[] }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 md:grid-cols-4 md:gap-x-10">
      {books.map((b) => (
        <BookTile key={b.slug} book={b} />
      ))}
    </ul>
  );
}

export function DeckList({ decks }: { decks: Episode[] }) {
  return (
    <ul>
      {decks.map((ep) => (
        <DeckRow key={ep.slug} ep={ep} />
      ))}
    </ul>
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
    <div className="relative transition-transform duration-200 group-hover:-translate-y-1">
      <EssayCover
        title={book.title}
        author={book.author}
        source={book.source}
        label={book.kind === "article" ? "Essay" : "Book"}
        className={coverShadow}
      />
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
        .map((b, i) => {
          const style = { left: `${i * stepX}%`, top: `${(k - 1 - i) * stepY}%` };
          return b.cover ? (
            <img
              key={b.title}
              src={`/covers/${b.cover}`}
              alt={`Cover of ${b.title}`}
              loading="lazy"
              style={style}
              className={`absolute aspect-[2/3] w-[80%] object-cover ${coverShadow}`}
            />
          ) : (
            // An essay among the books gets a generated cover.
            <EssayCover key={b.title} title={b.title} style={style} className={`absolute w-[80%] ${coverShadow}`} />
          );
        })
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
