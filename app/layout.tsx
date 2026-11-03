import type { Metadata } from "next";
import "./globals.css";

const description = "The Dwarkesh Podcast, essays, notes on books, and flashcards.";

export const metadata: Metadata = {
  title: { default: "Dwarkesh Patel", template: "%s — Dwarkesh Patel" },
  description,
  openGraph: { title: "Dwarkesh Patel", description, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/et-book/roman.woff" as="font" type="font/woff" crossOrigin="" />
        <link rel="preload" href="/fonts/et-book/italic.woff" as="font" type="font/woff" crossOrigin="" />
      </head>
      <body className="font-serif text-ink">{children}</body>
    </html>
  );
}
