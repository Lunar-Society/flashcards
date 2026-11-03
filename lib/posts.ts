// Posts mirrored from the dwarkesh.com Substack by
// `scripts/fetch-substack.ts`, one JSON file each in `content/substack/`.
// They render at `/p/<slug>/`, the same paths Substack uses.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { books } from "./books";
import { siteEpisodes } from "./episodes";

export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  // Substack's own type: "podcast" for anything with audio or video.
  type: string;
  date: string;
  cover?: string;
  // Seconds of audio or video.
  duration?: number;
  words?: number;
  body: string;
};

// What a post is on this site. Substack calls every video a podcast, but a
// half-hour video of me reading an essay is an essay.
export type PostKind = "episode" | "essay";

const DIR = join(process.cwd(), "content/substack");

// Audio or video versions of an essay that's also posted as text.
const NARRATIONS = /-(narration|video)$/;
const ALSO_NARRATIONS = new Set(["why-i-dont-think-agi-is-right-around"]);

export const posts: Post[] = readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(DIR, f), "utf8")) as Post)
  .sort((a, b) => b.date.localeCompare(a.date));

export function isNarration(p: Post): boolean {
  return NARRATIONS.test(p.slug) || ALSO_NARRATIONS.has(p.slug);
}

export function kindOf(p: Post): PostKind {
  return p.type === "podcast" && (p.duration ?? 0) >= 30 * 60 ? "episode" : "essay";
}

const path = (url?: string) => url?.replace(/^https?:\/\/(www\.)?dwarkesh\.com/, "").replace(/\/$/, "");

// Essays already on the shelf as book notes. A note that's only one part of
// a longer post (`from` is set) leaves the post listed.
const shelved = new Set(books.filter((b) => b.substack && !b.from).map((b) => path(b.substack)));

// Posts that aren't essays: announcements, contests, hiring, notes on the
// podcast itself, and reading roundups. Their pages still render.
const NOT_ESSAYS = new Set([
  "blog-prize",
  "blog-prize-winners",
  "hiring-scouts-to-help-me-find-guests",
  "coo",
  "thumbnail-competition",
  "clips-competition",
  "japan-at-war-announcement",
  "sarah-paine-lecture-series-public",
  "dec-strategy-doc",
  "progress-update",
  "notes-jan-10-2026",
]);

const listed = posts.filter((p) => !isNarration(p));
export const podcastEpisodes = listed.filter((p) => kindOf(p) === "episode");
export const essays = listed.filter(
  (p) => kindOf(p) === "essay" && !shelved.has(`/p/${p.slug}`) && !NOT_ESSAYS.has(p.slug),
);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

// Other pages on this site about the same post: a flashcard deck for an
// episode, or book notes mirrored from an essay.
export function relatedPages(p: Post): { href: string; label: string }[] {
  const here = `/p/${p.slug}`;
  return [
    ...siteEpisodes
      .filter((e) => path(e.substackUrl) === here)
      .map((e) => ({ href: `/${e.slug}/`, label: "Flashcards for this episode" })),
    ...books
      .filter((b) => path(b.substack) === here)
      .map((b) => ({ href: `/${b.slug}/`, label: `Notes on ${b.title}` })),
  ];
}

// Substack's image CDN resizes on the fly; cover images are full-size
// video frames otherwise.
export function thumb(url: string, width: number): string {
  return `https://substackcdn.com/image/fetch/w_${width},c_limit,f_auto,q_auto:good/${encodeURIComponent(url)}`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h} hr ${m} min` : `${m} min`;
}
