// Renders a book's Markdown body. No math parsing, so dollar amounts
// stay dollar amounts. Server component: the HTML is
// produced at build time and ships with no client JavaScript.
//
// Footnotes written as `[^1]` become Tufte-style sidenotes: the note
// text is copied inline next to its reference (floated into the right
// margin by CSS on wide screens), and the usual footnote list at the
// bottom is kept for narrow screens where there's no margin.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type HNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HNode[];
  value?: string;
};

function walk(node: HNode, fn: (n: HNode, parent: HNode | null) => void, parent: HNode | null = null) {
  fn(node, parent);
  node.children?.forEach((c) => walk(c, fn, node));
}

function rehypeSidenotes() {
  return (tree: HNode) => {
    const notes = new Map<string, HNode[]>();
    walk(tree, (n) => {
      if (n.tagName !== "li") return;
      const id = String(n.properties?.id ?? "");
      if (!id.includes("fn-")) return;
      const inline: HNode[] = [];
      // Sidenotes live inside a <p>, so keep only the inline content of
      // each paragraph of the note, minus the "↩" back-link.
      n.children?.forEach((c) => {
        if (c.tagName !== "p") return;
        if (inline.length) inline.push({ type: "text", value: " " });
        inline.push(...(c.children ?? []).filter((x) => x.properties?.dataFootnoteBackref === undefined));
      });
      notes.set(id, inline);
    });
    if (!notes.size) return;
    walk(tree, (n) => {
      if (!n.children) return;
      const out: HNode[] = [];
      for (const c of n.children) {
        out.push(c);
        if (c.tagName !== "sup") continue;
        const a = c.children?.find((x) => x.tagName === "a" && x.properties?.dataFootnoteRef !== undefined);
        if (!a) continue;
        const target = String(a.properties?.href ?? "").replace(/^#/, "");
        const body = notes.get(target);
        if (!body) continue;
        const num = (a.children ?? []).map((x) => x.value ?? "").join("");
        c.properties = { ...(c.properties ?? {}), className: ["sidenote-ref"] };
        out.push({
          type: "element",
          tagName: "span",
          properties: { className: ["sidenote"] },
          children: [
            { type: "element", tagName: "span", properties: { className: ["sidenote-num"] }, children: [{ type: "text", value: num }] },
            ...body,
          ],
        });
      }
      n.children = out;
    });
  };
}

export function Prose({ children }: { children: string }) {
  return (
    <div className="prose-book">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSidenotes]}
        components={{
          a: ({ href, children, node: _node, ...rest }) => {
            const external = typeof href === "string" && /^https?:/.test(href);
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})} {...rest}>
                {children}
              </a>
            );
          },
          // A paragraph holding only an image becomes a figure, with the
          // alt text as its caption.
          p: ({ node, children }) => {
            const kids = (node?.children ?? []).filter(
              (c) => !(c.type === "text" && !String((c as { value?: string }).value ?? "").trim()),
            );
            if (kids.length === 1 && kids[0].type === "element" && kids[0].tagName === "img") {
              const alt = String(kids[0].properties?.alt ?? "");
              const src = String(kids[0].properties?.src ?? "");
              return (
                <figure>
                  <img src={src} alt={alt} loading="lazy" />
                  {alt ? <figcaption>{alt}</figcaption> : null}
                </figure>
              );
            }
            return <p>{children}</p>;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
