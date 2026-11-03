import Link from "next/link";
import { books, Book, showAuthor } from "@/lib/books";
import { siteLectures, siteSubjects } from "@/lib/episodes";
import { Episode, totalCardCount } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { Shell } from "@/components/Shell";
import { EssayCover } from "@/components/EssayCover";
import { Subscribe } from "@/components/Subscribe";
import { SectionHeading } from "@/components/SectionHeading";
import { EpisodeGrid, PostList } from "@/components/PostLists";
import { essays, podcastEpisodes } from "@/lib/posts";
import { Series, series, readingMinutes, roman } from "@/lib/series";

export default function Page() {
  const decks = [...siteLectures, ...siteSubjects];
  return (
    <Shell home={false} wide>
      <h1 className="text-[2.3rem] font-normal italic leading-none sm:text-[2.6rem]">Dwarkesh Patel</h1>
      <p className="mt-4 max-w-col text-[1.35rem] italic leading-snug text-ink-muted">
        Interviews from the{" "}
        <a href="#podcast" className="link">
          Dwarkesh Podcast
        </a>
        ,{" "}
        <a href="#essays" className="link">
          essays
        </a>
        , notes on{" "}
        <a href="#reading" className="link">
          books
        </a>{" "}
        I&rsquo;ve read, and{" "}
        <a href="#flashcards" className="link">
          flashcards
        </a>{" "}
        for the more technical episodes.
      </p>
      <div className="mt-5">
        <Subscribe />
      </div>

      {series.map((sr) => (
        <SeriesFeature key={sr.slug} series={sr} />
      ))}

      <section id="podcast" className="mt-20 scroll-mt-8 sm:mt-24">
        <SectionHeading>Podcast</SectionHeading>
        <div className="mt-8">
          <EpisodeGrid posts={podcastEpisodes.slice(0, 6)} />
        </div>
        <MoreLink href="/podcast/">All {podcastEpisodes.length} episodes</MoreLink>
      </section>

      <section id="essays" className="mt-20 scroll-mt-8 sm:mt-24">
        <SectionHeading>Essays</SectionHeading>
        <PostList posts={essays.slice(0, 8)} />
        <MoreLink href="/essays/">All {essays.length} essays</MoreLink>
      </section>

      <section id="reading" className="mt-20 scroll-mt-8 sm:mt-24">
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

// An essay series gets the top of the page: its title, and its parts
// like a contents page.
function SeriesFeature({ series: sr }: { series: Series }) {
  return (
    <section className="mt-14 border-y border-ink py-10 sm:mt-16 sm:py-12">
      <p className="label">Essay series</p>
      <h2 className="mt-3 text-[2.4rem] font-normal italic leading-[1.05] tracking-[-0.01em] sm:text-[3.2rem]">
        <Link href={`/${sr.slug}/`} className="transition-colors hover:text-accent">
          {sr.title}
        </Link>
      </h2>
      <ol className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-3">
        {sr.parts.map((p) => (
          <li key={p.n} className="md:border-l md:border-rule md:pl-5">
            <span className="text-[1.6rem] italic leading-none text-accent">{roman(p.n)}</span>
            {p.out ? (
              <Link href={`/${sr.slug}/${p.slug}/`} className="mt-2 block text-[1.2rem] leading-snug transition-colors hover:text-accent">
                {p.title}
              </Link>
            ) : (
              <span className="mt-2 block text-[1.2rem] leading-snug text-ink-muted">{p.title}</span>
            )}
            <span className="label lining mt-2 block">
              {p.out ? `${readingMinutes(p.words)} min read` : p.date ? `Out ${formatDate(p.date)}` : "Coming soon"}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p className="mt-6 text-[1.15rem]">
      <Link href={href} className="link">
        {children} →
      </Link>
    </p>
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
