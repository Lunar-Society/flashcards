"use client";

import { ReactNode } from "react";
import { Section } from "@/lib/types";
import { QuestionRow } from "./QuestionRow";

export function SectionView({
  section,
  openIds,
  toggle,
  episodeUrl,
  headerExtra,
}: {
  section: Section;
  openIds: Set<string>;
  toggle: (id: string) => void;
  episodeUrl?: string;
  headerExtra?: ReactNode;
}) {
  const youtubeTimestamp =
    section.timestamp && episodeUrl ? sectionTimestampToYouTube(section.timestamp, episodeUrl) : null;

  return (
    <section id={section.id} className="scroll-mt-6 pb-14">
      <div className="mb-3">
        {section.timestamp ? (
          youtubeTimestamp ? (
            <a
              href={youtubeTimestamp}
              target="_blank"
              rel="noreferrer noopener"
              className="lining text-[0.92rem] text-ink-faint transition-colors hover:text-accent"
              title="Jump to this section on YouTube"
            >
              {section.timestamp} ↗
            </a>
          ) : (
            <span className="lining text-[0.92rem] text-ink-faint">{section.timestamp}</span>
          )
        ) : null}
        <div className={`flex items-baseline justify-between gap-4 ${section.timestamp ? "mt-0.5" : ""}`}>
          <h2 className="text-[1.65rem] font-normal italic leading-tight">{section.title}</h2>
          {headerExtra}
        </div>
      </div>

      {section.cards.length === 0 ? (
        <p className="text-[1.05rem] italic text-ink-muted">No flashcards for this section yet.</p>
      ) : (
        <ol className="border-t border-rule">
          {section.cards.map((c, i) => {
            const cardId = `${section.id}-${i}`;
            return (
              <QuestionRow
                key={cardId}
                index={i}
                q={c.q}
                a={c.a}
                open={openIds.has(cardId)}
                onToggle={() => toggle(cardId)}
              />
            );
          })}
        </ol>
      )}
    </section>
  );
}

function sectionTimestampToYouTube(timestamp: string, baseUrl: string): string {
  const parts = timestamp.split(":").map((n) => parseInt(n, 10));
  let seconds = 0;
  if (parts.length === 3) seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  else if (parts.length === 2) seconds = parts[0] * 60 + parts[1];
  const sep = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${sep}t=${seconds}`;
}
