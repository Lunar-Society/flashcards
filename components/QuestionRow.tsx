"use client";

import { useEffect, useRef, useState } from "react";
import { Markdown } from "./Markdown";

export function QuestionRow({
  index,
  q,
  a,
  open,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(open ? "auto" : 0);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    if (open) {
      setHeight(el.scrollHeight);
      const t = setTimeout(() => setHeight("auto"), 220);
      return () => clearTimeout(t);
    } else {
      if (height === "auto") setHeight(el.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <li className="border-b border-rule">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-baseline gap-3.5 py-3.5 text-left"
      >
        <span className="lining w-6 shrink-0 select-none text-right text-[0.9rem] text-ink-faint">{index + 1}</span>
        <span className="question-prose flex-1 text-[1.18rem] leading-snug">
          <Markdown>{q}</Markdown>
        </span>
        <span
          aria-hidden
          className={`shrink-0 text-[1.1rem] leading-none text-ink-faint transition-transform duration-150 group-hover:text-accent ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        style={{ height: typeof height === "number" ? `${height}px` : height }}
        className="overflow-hidden transition-[height] duration-200 ease-out"
      >
        <div ref={answerRef} className="pb-6 pl-[2.375rem] pr-6">
          <div className="border-l border-accent pl-4">
            <Markdown className="answer-prose">{a}</Markdown>
          </div>
        </div>
      </div>
    </li>
  );
}
