import { Book, BookLink, showAuthor } from "@/lib/books";
import { formatDate } from "@/lib/format";
import { Prose } from "./Prose";
import { Shell } from "./Shell";
import { YouTube } from "./YouTube";

export function BookView({ book }: { book: Book }) {
  const minutes = Math.max(1, Math.round(book.words / 230));
  return (
    <Shell>
      <article>
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
          {book.books || !book.cover ? null : (
            <a href={book.link.url} target="_blank" rel="noreferrer noopener" className="block w-28 shrink-0 sm:w-36">
              <img
                src={`/covers/${book.cover}`}
                alt={`Cover of ${book.title}`}
                className="block w-full shadow-[0_1px_2px_rgba(0,0,0,0.12),0_6px_18px_-8px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
              />
            </a>
          )}
          <div>
            <h1 className="text-[2.3rem] font-normal italic leading-[1.1] tracking-[-0.01em] sm:text-[2.8rem]">
              {book.title}
            </h1>
            {showAuthor(book) ? <p className="mt-2 text-[1.3rem] text-ink-muted">{book.author}</p> : null}
            {book.subtitle ? (
              <p className="mt-4 text-[1.3rem] italic leading-snug text-ink">{book.subtitle}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
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
                    {book.from ? (
                      <>
                        From <span className="italic">{book.from}</span> on Substack ↗
                      </>
                    ) : (
                      "Also on Substack ↗"
                    )}
                  </a>
                </>
              ) : null}
            </div>
            {book.books ? null : (
              <p className="mt-3 text-[1.1rem]">
                <OutLink link={book.link} />
              </p>
            )}
          </div>
        </header>

        {book.books ? (
          <ul className={`mt-9 grid gap-x-4 gap-y-4 ${coverGrid(book.books.length)}`}>
            {book.books.map((b) => (
              <li key={b.title}>
                <a href={b.link.url} target="_blank" rel="noreferrer noopener" className="group block">
                  <img
                    src={`/covers/${b.cover}`}
                    alt={`Cover of ${b.title}`}
                    className="aspect-[2/3] w-full object-cover shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-transform duration-200 group-hover:-translate-y-0.5"
                    loading="lazy"
                  />
                  <p className="mt-1.5 text-[0.95rem] italic leading-tight text-ink-muted transition-colors group-hover:text-accent">
                    {b.title}
                  </p>
                </a>
                <p className="mt-1 text-[0.9rem] leading-tight">
                  <OutLink link={b.link} short />
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {book.youtube ? (
          <div className="mt-10">
            <YouTube url={book.youtube} title={book.subtitle ?? book.title} />
          </div>
        ) : null}

        <div className="mt-10">
          <Prose>{book.body}</Prose>
        </div>

        {/* After reading, a last easy way to go get the book(s). */}
        <aside className="mt-14 border-t border-rule pt-4">
          <h2 className="label">{book.books ? "The books" : book.kind === "article" ? "The essay" : "The book"}</h2>
          <ul className="mt-2 space-y-1">
            {(book.books ?? [{ title: book.title, cover: book.cover, link: book.link }]).map((b) => (
              <li key={b.title} className="text-[1.1rem] leading-snug">
                <span className="italic">{b.title}</span>
                <span className="text-ink-faint"> · </span>
                <OutLink link={b.link} />
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </Shell>
  );
}

// A few books show large; a long series shrinks to fit one row.
function coverGrid(n: number): string {
  if (n === 2) return "max-w-[20rem] grid-cols-2";
  if (n === 3) return "max-w-[30rem] grid-cols-3";
  if (n === 4) return "grid-cols-4";
  return "grid-cols-3 sm:grid-cols-6";
}

function OutLink({ link, short = false }: { link: BookLink; short?: boolean }) {
  const label = short ? (link.label === "Find on Amazon" ? "Amazon" : "Read online") : link.label;
  return (
    <a href={link.url} target="_blank" rel="noreferrer noopener" className="link text-ink-muted">
      {label} ↗
    </a>
  );
}
