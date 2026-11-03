import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeries, series } from "@/lib/series";
import { PartView, SeriesAllView } from "@/components/PartView";

// The parts of an essay series, at /<series>/<part>/, plus the whole
// series on one page at /<series>/all/.
export function generateStaticParams() {
  return series.flatMap((s) => [
    ...s.parts.filter((p) => p.out).map((p) => ({ slug: s.slug, part: p.slug })),
    { slug: s.slug, part: "all" },
  ]);
}

function find(params: { slug: string; part: string }) {
  const s = getSeries(params.slug);
  const part = s?.parts.find((p) => p.slug === params.part && p.out);
  return { s, part };
}

export function generateMetadata({ params }: { params: { slug: string; part: string } }): Metadata {
  const { s, part } = find(params);
  if (!s) return { title: "Not found" };
  if (params.part === "all") return { title: s.title };
  if (!part) return { title: "Not found" };
  const title = `${part.title} (${s.title}, Part ${part.n})`;
  return { title, description: part.subtitle, openGraph: { title, description: part.subtitle, type: "article" } };
}

export default function Page({ params }: { params: { slug: string; part: string } }) {
  const { s, part } = find(params);
  if (!s) notFound();
  if (params.part === "all") return <SeriesAllView series={s} />;
  if (!part) notFound();
  return <PartView series={s} part={part} />;
}
