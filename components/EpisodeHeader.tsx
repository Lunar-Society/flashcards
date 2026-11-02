"use client";

import { useState } from "react";
import { Episode, totalCardCount } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { Markdown } from "./Markdown";
import { YouTube } from "./YouTube";

export function EpisodeHeader({ episode }: { episode: Episode }) {
  const [copied, setCopied] = useState(false);
  const slug = episode.slug;
  const cards = totalCardCount(episode);
  const isSubject = episode.kind === "subject";
  const upcoming = !isSubject && !episode.youtubeUrl && !episode.date;
  const transcriptHref = `/exports/${slug}/transcript.md`;

  const onCopyTranscript = async () => {
    try {
      const res = await fetch(transcriptHref);
      await navigator.clipboard.writeText(await res.text());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const meta = [
    "Flashcards",
    episode.date ? formatDate(episode.date) : null,
    `${cards} card${cards === 1 ? "" : "s"}`,
    upcoming ? "Upcoming" : null,
  ].filter(Boolean) as string[];

  return (
    <header>
      <div>
        <p className="label lining">{meta.join(" · ")}</p>
        <h1 className="mt-3 text-[2.3rem] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[2.8rem]">
          {episode.title}
        </h1>
        {episode.blurb ? (
          <p className="mt-3 text-[1.35rem] italic leading-snug text-ink-muted">{episode.blurb}</p>
        ) : null}
        {episode.credit ? (
          <Markdown className="question-prose mt-4 text-[1.02rem] italic leading-relaxed text-ink-faint">
            {episode.credit}
          </Markdown>
        ) : null}
        {episode.substackUrl ? (
          <p className="mt-4 text-[1.1rem]">
            <a href={episode.substackUrl} target="_blank" rel="noreferrer noopener" className="link">
              {isSubject ? "Read the post" : "Read on Substack"}
            </a>{" "}
            <span aria-hidden className="text-ink-faint">↗</span>
          </p>
        ) : null}
      </div>

      {episode.youtubeUrl ? (
        <div className="mt-9">
          <YouTube url={episode.youtubeUrl} title={`${episode.title} on YouTube`} />
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[1.05rem]">
        <span className="label">Download</span>
        {cards > 0 ? (
          <>
            <a href={`/exports/${slug}/flashcards.apkg`} download className="link">
              Anki deck
            </a>
            <a href={`/exports/${slug}/flashcards.md`} download className="link">
              Markdown
            </a>
          </>
        ) : null}
        {episode.transcriptPath ? (
          <>
            <a href={transcriptHref} download className="link">
              Transcript
            </a>
            <button
              type="button"
              onClick={onCopyTranscript}
              className="link"
              title="Copy the transcript to paste into an LLM"
            >
              {copied ? "Copied ✓" : "Copy transcript"}
            </button>
          </>
        ) : null}
      </div>

      {episode.note ? (
        <p className="mt-6 border-l border-accent pl-4 text-[1.05rem] italic leading-relaxed text-ink-muted">
          {episode.note}
        </p>
      ) : null}
    </header>
  );
}
