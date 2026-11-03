import Link from "next/link";
import { books } from "@/lib/books";
import { siteLectures, siteSubjects } from "@/lib/episodes";
import { formatDate } from "@/lib/format";
import { Shell } from "@/components/Shell";
import { DeckList, Shelf } from "@/components/Shelf";
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
        <Shelf books={books} />
      </section>

      <section id="flashcards" className="mt-20 scroll-mt-8 sm:mt-24">
        <SectionHeading>Flashcards</SectionHeading>
        <DeckList decks={decks} />
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
