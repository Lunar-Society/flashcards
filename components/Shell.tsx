import Link from "next/link";
import { ReactNode } from "react";

// Page frame shared by every page: a 62rem column (text sits in the
// left 36rem, the rest is margin for sidenotes and figures), an
// optional "home" link above, and a quiet footer.
export function Shell({ children, home = true }: { children: ReactNode; home?: boolean }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-page px-4 pb-16 pt-8 sm:px-8 sm:pt-12 lg:px-12">
        {home ? (
          <nav className="mb-10 sm:mb-14">
            <Link href="/" className="label transition-colors hover:text-accent">
              ← Dwarkesh Patel
            </Link>
          </nav>
        ) : null}
        {children}
        <footer className="clear-both mt-24 flex flex-wrap gap-x-6 gap-y-1 border-t border-rule pt-5">
          <Link href="/" className="label transition-colors hover:text-accent">
            Home
          </Link>
          <a href="https://www.dwarkesh.com" className="label transition-colors hover:text-accent">
            Substack
          </a>
          <a href="https://www.youtube.com/@DwarkeshPatel" className="label transition-colors hover:text-accent">
            YouTube
          </a>
        </footer>
      </div>
    </div>
  );
}
