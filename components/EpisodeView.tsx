"use client";

import { useState } from "react";
import { Episode, totalCardCount } from "@/lib/types";
import { EpisodeHeader } from "./EpisodeHeader";
import { SectionView } from "./SectionView";
import { ResourcesView, RESOURCES_ID } from "./ResourcesView";

export function EpisodeView({ episode }: { episode: Episode }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const sectionAllOpen = (sectionId: string, count: number): boolean => {
    if (count === 0) return false;
    for (let i = 0; i < count; i++) {
      if (!openIds.has(`${sectionId}-${i}`)) return false;
    }
    return true;
  };

  const toggleSection = (sectionId: string, count: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      const allOpen = sectionAllOpen(sectionId, count);
      for (let i = 0; i < count; i++) {
        const id = `${sectionId}-${i}`;
        if (allOpen) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-paper">
      <EpisodeHeader episode={episode} />
      <main className="mx-auto max-w-3xl px-5 pt-8 pb-24 sm:px-8 sm:pt-10">
        {episode.sections.length >= 4 && totalCardCount(episode) >= 20 ? <Contents episode={episode} /> : null}
        {episode.sections.map((s) => {
          const count = s.cards.length;
          const allOpen = sectionAllOpen(s.id, count);
          return (
            <SectionView
              key={s.id}
              section={s}
              openIds={openIds}
              toggle={toggle}
              episodeUrl={episode.youtubeUrl}
              headerExtra={
                count > 0 ? (
                  <button
                    onClick={() => toggleSection(s.id, count)}
                    className="shrink-0 whitespace-nowrap text-[0.78rem] text-ink-faint underline decoration-rule decoration-1 underline-offset-[3px] transition-colors hover:text-ink hover:decoration-accent"
                  >
                    {allOpen ? "Collapse all" : "Expand all"}
                  </button>
                ) : null
              }
            />
          );
        })}
        {episode.resources ? <ResourcesView groups={episode.resources} /> : null}
      </main>
    </div>
  );
}

function Contents({ episode }: { episode: Episode }) {
  return (
    <nav aria-label="Contents" className="mb-14">
      <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
        Contents
      </h2>
      <ol className="mt-3 border-y border-rule">
        {episode.sections.map((s) => (
          <ContentsRow key={s.id} href={`#${s.id}`} title={s.title} meta={`${s.cards.length}`} />
        ))}
        {episode.resources ? (
          <ContentsRow href={`#${RESOURCES_ID}`} title="Further reading" meta="" />
        ) : null}
      </ol>
    </nav>
  );
}

function ContentsRow({ href, title, meta }: { href: string; title: string; meta: string }) {
  return (
    <li className="border-b border-rule last:border-b-0">
      <a
        href={href}
        className="group flex items-baseline justify-between gap-4 py-1.5 text-[0.95rem] text-ink-muted transition-colors hover:text-ink"
      >
        <span className="underline decoration-transparent decoration-1 underline-offset-[3px] group-hover:decoration-accent">
          {title}
        </span>
        <span className="shrink-0 text-[0.78rem] tabular-nums text-ink-faint">{meta}</span>
      </a>
    </li>
  );
}
