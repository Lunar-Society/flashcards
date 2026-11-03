import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";
import { PostView } from "@/components/PostView";

// Substack's own paths, so links to dwarkesh.com/p/... keep working if
// the domain points here.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.subtitle,
    alternates: { canonical: `https://www.dwarkesh.com/p/${post.slug}` },
    openGraph: { title: post.title, description: post.subtitle, type: "article", images: post.cover ? [post.cover] : undefined },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  return <PostView post={post} />;
}
