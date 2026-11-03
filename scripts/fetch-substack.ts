// Snapshots the dwarkesh.com Substack into `content/substack/`: one JSON
// file per post (metadata plus cleaned body HTML). The site renders those
// at `/p/<slug>/`, the same paths Substack uses, so the domain can move
// here without breaking a single link.
//
//   npm run fetch-substack            # fetch posts not yet on disk
//   npm run fetch-substack -- --all   # refetch everything
//
// Substack stays the place posts are written, emailed and podcast-fed
// from; this only mirrors what's already published.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as cheerio from "cheerio";

const BASE = "https://www.dwarkesh.com";
const OUT = join(process.cwd(), "content/substack");
const refetch = process.argv.includes("--all");

type ArchivePost = {
  slug: string;
  type: "podcast" | "newsletter" | "restack" | string;
  audience: string;
  section_slug?: string | null;
};

async function get(path: string): Promise<any> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(`${BASE}${path}`, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (res.ok) return res.json();
    if (res.status !== 429 && res.status < 500) throw new Error(`${path}: ${res.status}`);
    await sleep(2000 * 2 ** attempt);
  }
  throw new Error(`${path}: gave up after retries`);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Strips Substack's own chrome (subscribe boxes, share buttons, image
// lightbox wrappers) and turns its YouTube embeds into plain iframes.
function clean(html: string): string {
  const $ = cheerio.load(html, null, false);
  $(".subscription-widget-wrap, .subscription-widget, .button-wrapper, .share-dialog, .captioned-button-wrap").remove();
  $("[data-component-name='SubscribeWidgetToDOM'], [data-component-name='ButtonCreateButton']").remove();
  // Old episodes embed Spotify and Apple players beside the video; the
  // page links those instead. Scripts and icon SVGs belong to Substack's UI.
  $("iframe[src*='spotify.com'], iframe[src*='podcasts.apple.com'], script, svg").remove();
  $(".youtube-wrap").each((_, el) => {
    const id = JSON.parse($(el).attr("data-attrs") ?? "{}").videoId;
    $(el).replaceWith(
      id
        ? `<div class="embed-video"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" loading="lazy" allowfullscreen title="YouTube video"></iframe></div>`
        : "",
    );
  });
  // Images come wrapped in lightbox links and <picture> sources; keep the
  // <img> and its caption.
  $("figure").each((_, fig) => {
    const img = $(fig).find("img").first();
    if (!img.length) return;
    const caption = $(fig).find("figcaption").html();
    $(fig).replaceWith(
      `<figure><img src="${img.attr("src")}" alt="${img.attr("alt") ?? ""}" loading="lazy" />${
        caption ? `<figcaption>${caption}</figcaption>` : ""
      }</figure>`,
    );
  });
  $("a").each((_, a) => {
    const href = $(a).attr("href");
    // Links between posts stay on this site.
    if (href?.startsWith(`${BASE}/p/`)) $(a).attr("href", href.slice(BASE.length));
  });
  $("[class]").not(".embed-video, .footnote, .footnote-anchor, .footnote-content, .footnote-number").removeAttr("class");
  $("[data-attrs], [data-component-name]").removeAttr("data-attrs").removeAttr("data-component-name");
  return $.html();
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const archive: ArchivePost[] = [];
  // Pages can come back shorter than the limit, so step by what arrived.
  for (;;) {
    const page: ArchivePost[] = await get(`/api/v1/archive?sort=new&offset=${archive.length}&limit=50`);
    if (!page.length) break;
    archive.push(...page);
  }
  // Restacks are other people's posts; paid posts only come back truncated.
  const posts = archive.filter((p) => p.type !== "restack" && p.audience === "everyone");
  console.log(`${archive.length} posts in the archive, ${posts.length} to mirror`);

  let fetched = 0;
  for (const a of posts) {
    const file = join(OUT, `${a.slug}.json`);
    if (!refetch && existsSync(file)) continue;
    const p = await get(`/api/v1/posts/${a.slug}`);
    const post = {
      slug: p.slug,
      title: p.title.trim(),
      subtitle: p.subtitle?.trim() || undefined,
      type: p.type,
      section: a.section_slug ?? undefined,
      date: p.post_date,
      cover: p.cover_image ?? undefined,
      duration: p.podcast_duration ? Math.round(p.podcast_duration) : undefined,
      words: p.wordcount ?? undefined,
      body: clean(p.body_html ?? ""),
    };
    writeFileSync(file, JSON.stringify(post, null, 1) + "\n");
    fetched++;
    process.stdout.write(`\r${fetched} fetched`);
    await sleep(400);
  }
  console.log(`\ndone: ${fetched} new`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
