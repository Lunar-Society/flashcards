// Episode object for Reiner Pope's second blackboard lecture, on
// chip design. Cards live in `content/reiner-pope-2-cards.md`; this
// file is a thin adapter that parses that markdown at build time.
import { parseEpisodeMd } from "./parse-md";

export const reinerPope2 = parseEpisodeMd("content/reiner-pope-2-cards.md");
