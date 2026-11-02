"use client";

import { useState } from "react";

// Click-to-load YouTube embed: shows the thumbnail and only loads
// YouTube's player when someone presses play, so pages stay light.
export function YouTube({ url, title }: { url: string; title: string }) {
  const id = youTubeId(url);
  const [playing, setPlaying] = useState(false);
  if (!id) return null;
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#1b1b18]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.includes("hqdefault")) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(17,17,17,0.72)] text-white transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true" className="ml-1">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export function youTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("/")[0] || null;
    if (u.hostname.endsWith("youtube.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(embed|live|shorts)\/([^/]+)/);
      return m ? m[2] : null;
    }
    return null;
  } catch {
    return null;
  }
}

// Link to a timestamp in a YouTube video.
export function youTubeAt(url: string, seconds: number): string {
  const id = youTubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}&t=${seconds}s` : url;
}
