import Link from "next/link";
import { ReactNode } from "react";

// Page frame shared by every page: one centered column (wider on the
// homepage for the shelf of covers) and an optional "home" link
// above.
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
              ← Home
            </Link>
          </nav>
        ) : null}
        {children}
      </div>
    </div>
  );
}
