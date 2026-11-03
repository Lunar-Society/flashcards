"use client";

import { useEffect, useState } from "react";

// The part's sections, in the left margin on wide screens, with the one
// you're reading highlighted.
export function SectionNav({ sections }: { sections: { id: string; title: string }[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((h): h is HTMLElement => !!h);
    const update = () => {
      // The last heading above the top third of the window.
      let id: string | null = null;
      for (const h of headings) if (h.getBoundingClientRect().top < window.innerHeight / 3) id = h.id;
      setCurrent(id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [sections]);

  return (
    <nav aria-label="Sections" className="sticky top-10">
      <p className="label">Contents</p>
      <ol className="mt-3 space-y-2 text-[0.95rem] leading-snug">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block border-l pl-3 transition-colors hover:text-accent ${
                current === s.id ? "border-accent text-ink" : "border-rule text-ink-faint"
              }`}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
