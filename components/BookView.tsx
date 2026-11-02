import { Book } from "@/lib/books";
import { formatDate } from "@/lib/format";
import { Prose } from "./Prose";
import { Shell } from "./Shell";
import { YouTube } from "./YouTube";

export function BookView({ book }: { book: Book }) {
  const minutes = Math.max(1, Math.round(book.words / 230));
  return (
    <Shell>
      <article>
        <header className="max-w-col">
          {/* Cover: in the right margin on wide screens, above the title otherwise. */}
          {book.books ? null : (
          <img
            src={`/covers/${book.cover}`}
            alt={`Cover of ${book.title}`}
            className="mb-7 block w-28 shadow-[0_1px_2px_rgba(0,0,0,0.12),0_6px_18px_-8px_rgba(0,0,0,0.35)] sm:w-32 lg:float-right lg:clear-right lg:mb-6 lg:mr-[-13rem] lg:mt-1 lg:w-40"
          />
          )}
          <h1 className="text-[2.3rem] font-normal italic leading-[1.1] tracking-[-0.01em] sm:text-[2.8rem]">
            {book.title}
          </h1>
          {book.books ? null : <p className="mt-2 text-[1.3rem] text-ink-muted">{book.author}</p>}
          {book.subtitle ? (
            <p className="mt-5 text-[1.3rem] italic leading-snug text-ink">{book.subtitle}</p>
          ) : null}
          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="label">{formatDate(book.date)}</span>
            {book.words > 60 ? (
              <>
                <span className="label" aria-hidden>·</span>
                <span className="label">{minutes} min read</span>
              </>
            ) : null}
            {book.substack ? (
              <>
                <span className="label" aria-hidden>·</span>
                <a href={book.substack} className="label transition-colors hover:text-accent">
                  Also on Substack ↗
                </a>
              </>
            ) : null}
          </div>
        </header>

        {book.books ? (
          <ul className="mt-9 grid max-w-col grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-6">
            {book.books.map((b) => (
              <li key={b.title}>
                <img
                  src={`/covers/${b.cover}`}
                  alt={`Cover of ${b.title}`}
                  className="aspect-[2/3] w-full object-cover shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                  loading="lazy"
                />
                <p className="mt-1.5 text-[0.85rem] italic leading-tight text-ink-muted">{b.title}</p>
              </li>
            ))}
          </ul>
        ) : null}

        {book.youtube ? (
          <div className="mt-10 max-w-[48rem]">
            <YouTube url={book.youtube} title={book.subtitle ?? book.title} />
          </div>
        ) : null}

        <div className="mt-10 max-w-col">
          <Prose>{book.body}</Prose>
        </div>
      </article>
    </Shell>
  );
}
