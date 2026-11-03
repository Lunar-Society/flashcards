import type { Metadata } from "next";
import { essays } from "@/lib/posts";
import { Shell } from "@/components/Shell";
import { PostList, byYear } from "@/components/PostLists";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Essays" };

export default function Page() {
  return (
    <Shell wide>
      <h1 className="text-[2.3rem] font-normal italic leading-none">Essays</h1>
      {byYear(essays).map(([year, ps]) => (
        <section key={year} className="mt-12">
          <SectionHeading>{year}</SectionHeading>
          <PostList posts={ps} day />
        </section>
      ))}
    </Shell>
  );
}
