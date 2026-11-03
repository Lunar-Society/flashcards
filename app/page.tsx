import { books } from "@/lib/books";
import { siteLectures, siteSubjects } from "@/lib/episodes";
import { Shell } from "@/components/Shell";
import { SectionHeading } from "@/components/SectionHeading";
import { DeckList, Shelf } from "@/components/Shelf";

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
        <Shelf books={books} />
      </section>

      <section id="flashcards" className="mt-20 scroll-mt-8 sm:mt-24">
        <SectionHeading>Flashcards</SectionHeading>
        <DeckList decks={decks} />
      </section>
    </Shell>
  );
}
