import { ResourceGroup } from "@/lib/types";

export const RESOURCES_ID = "further-reading";

export function ResourcesView({ groups }: { groups: ResourceGroup[] }) {
  return (
    <section id={RESOURCES_ID} className="scroll-mt-6 border-t border-rule pt-10">
      <h2 className="text-[1.65rem] font-normal italic leading-tight">Further reading</h2>
      <div className="mt-6 space-y-8">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="label">{g.title}</h3>
            <ul className="mt-2 space-y-1.5">
              {g.links.map((l) => (
                <li key={l.url} className="text-[1.1rem] leading-snug">
                  <a href={l.url} target="_blank" rel="noreferrer noopener" className="link">
                    {l.label}
                  </a>
                  <span className="ml-2 whitespace-nowrap text-[0.92rem] italic text-ink-faint">{sourceLabel(l.url)}</span>
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
