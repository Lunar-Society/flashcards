import type { Metadata } from "next";
import { podcastEpisodes } from "@/lib/posts";
import { Shell } from "@/components/Shell";
import { EpisodeGrid, byYear } from "@/components/PostLists";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Podcast" };

export default function Page() {
  return (
    <Shell wide>
      <h1 className="text-[2.3rem] font-normal italic leading-none">Dwarkesh Podcast</h1>
      <p className="mt-3 text-[1.2rem] text-ink-muted">
        {podcastEpisodes.length} episodes. Also on{" "}
        <a href="https://www.youtube.com/@DwarkeshPatel" className="link">YouTube</a>,{" "}
        <a href="https://podcasts.apple.com/us/podcast/dwarkesh-podcast/id1516093381" className="link">Apple Podcasts</a> and{" "}
        <a href="https://open.spotify.com/show/4JH4tybY1zX6e5hjCwU6gF" className="link">Spotify</a>.
      </p>
      {byYear(podcastEpisodes).map(([year, eps]) => (
        <section key={year} className="mt-14">
          <SectionHeading>{year}</SectionHeading>
          <div className="mt-8">
            <EpisodeGrid posts={eps} />
          </div>
        </section>
      ))}
    </Shell>
  );
}
