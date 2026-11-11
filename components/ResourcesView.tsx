import { ResourceGroup } from "@/lib/types";

export const RESOURCES_ID = "further-reading";

export function ResourcesView({ groups }: { groups: ResourceGroup[] }) {
  return (
    <section id={RESOURCES_ID} className="scroll-mt-6 border-t border-rule pt-10">
      <h2 className="font-serif text-[1.55rem] font-medium leading-tight tracking-tight text-ink">
        Further reading
      </h2>
      <div className="mt-6 space-y-8">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {g.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <li key={l.url} className="text-[0.95rem] leading-snug">
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-ink underline decoration-rule decoration-1 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {l.label}
                  </a>
                  <span className="ml-1.5 whitespace-nowrap text-[0.78rem] text-ink-faint">
                    {sourceLabel(l.url)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function sourceLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "youtu.be") return "YouTube";
    if (host.endsWith("semianalysis.com")) return "SemiAnalysis";
    return host;
  } catch {
    return "";
  }
}
