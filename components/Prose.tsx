// Renders a book's Markdown body at build time (server component, no
// client JavaScript). No math parsing, so dollar amounts stay dollar
// amounts.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Prose({ children }: { children: string }) {
  return (
    <div className="prose-book">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
