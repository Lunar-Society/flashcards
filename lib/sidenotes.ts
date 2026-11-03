// Footnotes in the margin. Each footnote is copied into a sidenote placed
// right after its reference; CSS floats the sidenotes into the right
// margin when the window is wide enough (and hides the list of notes at
// the end), and hides them otherwise. Works on Markdown footnotes (GFM,
// as react-markdown renders them) and on Substack's footnote markup.
// Runs at build time, so pages ship as plain HTML.

import type { Element, ElementContent, Root } from "hast";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { visit, SKIP } from "unist-util-visit";

const classes = (el: Element): string[] => {
  const c = el.properties?.className;
  return Array.isArray(c) ? c.map(String) : typeof c === "string" ? c.split(" ") : [];
};
const isEl = (n: ElementContent | undefined): n is Element => n?.type === "element";
const text = (el: Element): string =>
  el.children.map((c) => (c.type === "text" ? c.value : isEl(c) ? text(c) : "")).join("");

// Block elements can't sit inside a paragraph, so a note's paragraphs,
// lists and quotes become spans styled to look like them.
const BLOCKS: Record<string, string> = {
  p: "sn-p",
  div: "sn-p",
  blockquote: "sn-quote",
  ul: "sn-list",
  ol: "sn-list",
  li: "sn-li",
  figure: "sn-p",
  figcaption: "sn-p",
};

function inline(nodes: ElementContent[]): ElementContent[] {
  return nodes.flatMap((n): ElementContent[] => {
    if (!isEl(n)) return [n];
    // Drop the "back to text" arrows and anything that would duplicate an id.
    if (n.properties?.dataFootnoteBackref !== undefined) return [];
    const { id: _id, ...properties } = n.properties ?? {};
    const tagName = BLOCKS[n.tagName] ? "span" : n.tagName;
    const className = BLOCKS[n.tagName] ? [BLOCKS[n.tagName]] : properties.className;
    return [{ ...n, tagName, properties: { ...properties, className }, children: inline(n.children) }];
  });
}

export function addSidenotes(tree: Root) {
  // Note bodies, keyed by the href their reference points at.
  const notes = new Map<string, ElementContent[]>();
  visit(tree, "element", (el) => {
    // GFM: <section data-footnotes><ol><li id="…fn-1">…</li></ol></section>
    if (el.tagName === "section" && el.properties?.dataFootnotes !== undefined) {
      visit(el, "element", (li) => {
        if (li.tagName === "li" && li.properties?.id) notes.set(`#${li.properties.id}`, li.children);
      });
      return SKIP;
    }
    // Substack: <div class="footnote"><a id="footnote-1" class="footnote-number">1</a>
    //           <div class="footnote-content">…</div></div>
    if (el.tagName === "div" && classes(el).includes("footnote")) {
      const num = el.children.find((c) => isEl(c) && classes(c).includes("footnote-number"));
      const body = el.children.find((c) => isEl(c) && classes(c).includes("footnote-content"));
      if (isEl(num) && isEl(body) && num.properties?.id) notes.set(`#${num.properties.id}`, body.children);
      return SKIP;
    }
  });
  if (!notes.size) return;

  visit(tree, "element", (el, index, parent) => {
    if (index === undefined || !parent) return;
    // GFM: <sup><a href="#…fn-1" data-footnote-ref>1</a></sup>
    const gfm = el.tagName === "sup" ? el.children.find((c) => isEl(c) && c.properties?.dataFootnoteRef !== undefined) : undefined;
    // Substack: <a class="footnote-anchor" href="#footnote-1">1</a>
    const ref = isEl(gfm) ? gfm : el.tagName === "a" && classes(el).includes("footnote-anchor") ? el : undefined;
    if (!ref) return;
    const body = notes.get(String(ref.properties?.href));
    if (!body) return;
    const sidenote: Element = {
      type: "element",
      tagName: "span",
      properties: { className: ["sidenote"] },
      children: [
        { type: "element", tagName: "span", properties: { className: ["sidenote-number"] }, children: [{ type: "text", value: text(ref) }] },
        ...inline(structuredClone(body)),
      ],
    };
    parent.children.splice(index + 1, 0, sidenote);
    return [SKIP, index + 2];
  });
}

// Gives h2 and h3 headings ids, so a contents list can link to them.
export function addHeadingIds(tree: Root) {
  const seen = new Map<string, number>();
  visit(tree, "element", (el) => {
    if ((el.tagName !== "h2" && el.tagName !== "h3") || el.properties?.id) return;
    const base = slugify(text(el)) || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    el.properties = { ...el.properties, id: n ? `${base}-${n}` : base };
  });
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// rehype plugins, for react-markdown.
export const rehypeSidenotes = () => addSidenotes;
export const rehypeHeadingIds = () => addHeadingIds;

// For HTML that arrives as a string (Substack posts).
export function sidenotesInHtml(html: string): string {
  const tree = fromHtml(html, { fragment: true });
  addSidenotes(tree);
  return toHtml(tree);
}
