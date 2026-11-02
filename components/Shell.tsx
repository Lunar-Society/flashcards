import Link from "next/link";
import { ReactNode } from "react";

// Page frame shared by every page: one centered column (wider on the
// homepage for the shelf of covers), an optional "home" link above,
// and a quiet footer.
export function Shell({
  children,
  home = true,
  wide = false,
}: {
  children: ReactNode;
  home?: boolean;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <div className={`mx-auto px-4 pb-16 pt-8 sm:px-8 sm:pt-12 ${wide ? "max-w-[56rem]" : "max-w-[42rem]"}`}>
        {home ? (
          <nav className="mb-10 sm:mb-14">
            <Link href="/" className="label transition-colors hover:text-accent">
              ← Dwarkesh Patel
            </Link>
          </nav>
        ) : null}
        {children}
        <footer className="mt-24 flex flex-wrap gap-x-6 gap-y-1 border-t border-rule pt-5">
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
