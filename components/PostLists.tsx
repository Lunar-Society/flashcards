import Link from "next/link";
import { Post, formatDuration, thumb } from "@/lib/posts";
import { formatDate, formatDay } from "@/lib/format";

// Episodes as a grid of video frames, newest first.
export function EpisodeGrid({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link href={`/p/${p.slug}/`} className="group block">
            <div className="aspect-video overflow-hidden bg-wash shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_20px_-12px_rgba(0,0,0,0.4)]">
              {p.cover ? (
                <img
                  src={thumb(p.cover, 640)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : null}
            </div>
            <h3 className="mt-3 text-[1.12rem] italic leading-tight transition-colors group-hover:text-accent">
              {p.title}
            </h3>
            <p className="label lining mt-1.5">
              {formatDate(p.date.slice(0, 10))}
              {p.duration ? ` · ${formatDuration(p.duration)}` : ""}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Posts as rows of title, subtitle and date.
export function PostList({ posts, day = false }: { posts: Post[]; day?: boolean }) {
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.slug} className="border-b border-rule">
          <Link
            href={`/p/${p.slug}/`}
            className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <span className="text-[1.2rem] leading-snug">
              <span className="transition-colors group-hover:text-accent">{p.title}</span>
              {p.subtitle && p.subtitle !== p.title ? (
                <span className="italic text-ink-muted">: {p.subtitle}</span>
              ) : null}
            </span>
            <span className="label lining shrink-0 whitespace-nowrap">
              {day ? formatDay(p.date) : formatDate(p.date.slice(0, 10))}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Splits newest-first posts into runs by year.
export function byYear(posts: Post[]): [string, Post[]][] {
  const years = new Map<string, Post[]>();
  for (const p of posts) {
    const y = p.date.slice(0, 4);
    years.set(y, [...(years.get(y) ?? []), p]);
  }
  return [...years];
}
