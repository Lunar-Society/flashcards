"use client";

import { useState } from "react";
import { Episode, totalCardCount } from "@/lib/types";
import { EpisodeHeader } from "./EpisodeHeader";
import { SectionView } from "./SectionView";
import { ResourcesView, RESOURCES_ID } from "./ResourcesView";
import { Shell } from "./Shell";

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
    <Shell>
      <EpisodeHeader episode={episode} />
      <div className="mt-14">
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
                    type="button"
                    onClick={() => toggleSection(s.id, count)}
                    className="label shrink-0 whitespace-nowrap transition-colors hover:text-accent"
                  >
                    {allOpen ? "Hide answers" : "Show answers"}
                  </button>
                ) : null
              }
            />
          );
        })}
        {episode.resources ? <ResourcesView groups={episode.resources} /> : null}
      </div>
    </Shell>
  );
}

function Contents({ episode }: { episode: Episode }) {
  return (
    <nav aria-label="Contents" className="mb-16">
      <h2 className="label">Contents</h2>
      <ol className="mt-3 border-t border-rule">
        {episode.sections.map((s) => (
          <ContentsRow key={s.id} href={`#${s.id}`} title={s.title} meta={`${s.cards.length}`} />
        ))}
        {episode.resources ? <ContentsRow href={`#${RESOURCES_ID}`} title="Further reading" meta="" italic /> : null}
      </ol>
    </nav>
  );
}

function ContentsRow({ href, title, meta, italic = false }: { href: string; title: string; meta: string; italic?: boolean }) {
  return (
    <li className="border-b border-rule">
      <a
        href={href}
        className={`group flex items-baseline justify-between gap-4 py-1.5 text-[1.08rem] leading-snug ${italic ? "italic" : ""}`}
      >
        <span className="transition-colors group-hover:text-accent">{title}</span>
        <span className="lining shrink-0 text-[0.9rem] text-ink-faint">{meta}</span>
      </a>
    </li>
  );
}
