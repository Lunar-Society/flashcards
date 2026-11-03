import Link from "next/link";
import { Post, formatDuration, kindOf, relatedPages } from "@/lib/posts";
import { formatDay } from "@/lib/format";
import { Shell } from "./Shell";
import { Subscribe } from "./Subscribe";
import { YouTube } from "./YouTube";

const EMBED = /<div class="embed-video"><iframe src="https:\/\/www\.youtube-nocookie\.com\/embed\/([\w-]+)[^"]*"[^>]*><\/iframe><\/div>/;

// Lifts the post's first YouTube embed out of the body so it can use the
// site's click-to-play player.
function splitVideo(body: string): { video?: string; body: string } {
  const m = body.match(EMBED);
  return m ? { video: `https://youtu.be/${m[1]}`, body: body.replace(m[0], "") } : { body };
}

// A post mirrored from Substack. The body is Substack's HTML, cleaned up
// by the fetch script and set in the same type as the book notes.
export function PostView({ post }: { post: Post }) {
  const related = relatedPages(post);
  const minutes = post.words ? Math.max(1, Math.round(post.words / 230)) : 0;
  const isEpisode = kindOf(post) === "episode";
  const { video, body } = splitVideo(post.body);
  return (
    <Shell>
      <article>
        <header>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="label">{isEpisode ? "Podcast" : "Essay"}</span>
            <span className="label" aria-hidden>·</span>
            <span className="label lining">{formatDay(post.date)}</span>
            {post.duration ? (
              <>
                <span className="label" aria-hidden>·</span>
                <span className="label lining">{formatDuration(post.duration)}</span>
              </>
            ) : !isEpisode && minutes > 1 ? (
              <>
                <span className="label" aria-hidden>·</span>
                <span className="label lining">{minutes} min read</span>
              </>
            ) : null}
          </div>
          <h1 className="mt-3 text-[2.1rem] font-normal italic leading-[1.12] tracking-[-0.01em] sm:text-[2.6rem]">
            {post.title}
          </h1>
          {post.subtitle && post.subtitle !== post.title ? (
            <p className="mt-4 text-[1.3rem] italic leading-snug text-ink-muted">{post.subtitle}</p>
          ) : null}
          {related.length ? (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[1.1rem]">
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="link">
                    {r.label} →
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {video ? (
          <div className="mt-10">
            <YouTube url={video} title={post.title} />
          </div>
        ) : null}

        <div className="prose-book prose-substack mt-10" dangerouslySetInnerHTML={{ __html: body }} />

        <footer className="mt-16 border-t border-rule pt-6">
          <Subscribe />
          <p className="mt-4 text-[1rem] text-ink-muted">
            <a href={`https://www.dwarkesh.com/p/${post.slug}/comments`} className="link">
              Comments on Substack ↗
            </a>
          </p>
        </footer>
      </article>
    </Shell>
  );
}
