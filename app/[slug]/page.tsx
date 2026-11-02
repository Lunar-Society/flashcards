import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteEpisode, siteEpisodes } from "@/lib/episodes";
import { books, getBook } from "@/lib/books";
import { EpisodeView } from "@/components/EpisodeView";
import { BookView } from "@/components/BookView";

// Books and flashcard decks share the root URL space (`/<slug>/`).
// lib/books.ts fails the build if two of them ever claim the same slug.
export function generateStaticParams() {
  return [...books.map((b) => ({ slug: b.slug })), ...siteEpisodes.map((e) => ({ slug: e.slug }))];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = getBook(params.slug);
  if (book) {
    const title = `${book.title}, ${book.author}`;
    const description = book.subtitle ?? `Notes on ${book.title} by ${book.author}.`;
    return {
      title,
      description,
      // Pieces mirrored from Substack point search engines at the original.
      alternates: book.substack ? { canonical: book.substack } : undefined,
      openGraph: { title, description, type: "article"},
    };
  }
  const episode = getSiteEpisode(params.slug);
  if (!episode) return { title: "Not found" };
  const title = `${episode.title}${episode.blurb ? `: ${episode.blurb}` : ""} flashcards`;
  return {
    title,
    description: episode.blurb,
    openGraph: { title, description: episode.blurb, type: "website" },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const book = getBook(params.slug);
  if (book) return <BookView book={book} />;
  const episode = getSiteEpisode(params.slug);
  if (!episode) notFound();
  return <EpisodeView episode={episode} />;
}
