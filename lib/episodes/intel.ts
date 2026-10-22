// Episode object for the Intel fab tour episode.
// Cards live in `content/intel-cards.md`; this file is a thin
// adapter that parses that markdown at build time.
import { parseEpisodeMd } from "./parse-md";

export const intel = parseEpisodeMd("content/intel-cards.md");
