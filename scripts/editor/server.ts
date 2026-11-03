// A local editor for the reading notes in `content/books/`.
//
//   npm run edit
//
// Opens http://localhost:4321: the list of reviews, the one you're
// editing, and the real page beside it. Edits save to the Markdown files
// as you type, and the preview reloads on each save. The preview is the
// site's own dev server, with drafts shown, passed through this server so
// the editor can keep its scroll position. Nothing leaves your machine;
// commit the files as usual when you're done.

import { spawn } from "node:child_process";
import { existsSync, readFileSync, readdirSync, utimesSync, watch, writeFileSync } from "node:fs";
import { createServer, IncomingMessage, request, ServerResponse } from "node:http";
import { connect } from "node:net";
import { join } from "node:path";

const ROOT = process.cwd();
const BOOKS = join(ROOT, "content/books");
const COVERS = join(ROOT, "public/covers");
const PORT = Number(process.env.EDITOR_PORT ?? 4321);
const PREVIEW_PORT = Number(process.env.PREVIEW_PORT ?? 3018);

const BOOK_FILE = /^[a-z0-9][a-z0-9-]*\.md$/;
const COVER_FILE = /^[a-z0-9][a-z0-9-]*\.(jpe?g|png|webp)$/;

// Just enough of the frontmatter for the list; the page edits the raw file.
function summary(file: string) {
  const raw = readFileSync(join(BOOKS, file), "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const field = (k: string) =>
    fm.match(new RegExp(`^${k}:\\s*(.*)$`, "m"))?.[1].trim().replace(/^["'](.*)["']$/, "$1") ?? "";
  return {
    file,
    slug: field("slug"),
    title: field("title"),
    author: field("author"),
    date: field("date"),
    draft: field("draft") === "true",
    todo: field("todo") === "true",
  };
}

function body(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function send(res: ServerResponse, status: number, data: unknown, type = "application/json") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(type === "application/json" ? JSON.stringify(data) : (data as string | Buffer));
}

async function handle(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? "/", "http://localhost");
  const [, api, kind, name] = url.pathname.split("/");

  if (url.pathname === "/") {
    return send(res, 200, readFileSync(join(__dirname, "editor.html"), "utf8"), "text/html; charset=utf-8");
  }
  if (api !== "api") return proxy(req, res);

  if (kind === "books" && !name && req.method === "GET") {
    const list = readdirSync(BOOKS)
      .filter((f) => BOOK_FILE.test(f))
      .map(summary)
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
    return send(res, 200, list);
  }
  if (kind === "books" && name) {
    if (!BOOK_FILE.test(name)) return send(res, 400, { error: "bad file name" });
    const file = join(BOOKS, name);
    if (req.method === "GET") {
      if (!existsSync(file)) return send(res, 404, { error: "no such review" });
      return send(res, 200, { text: readFileSync(file, "utf8") });
    }
    if (req.method === "PUT") {
      const { text, create } = JSON.parse((await body(req)).toString("utf8"));
      if (typeof text !== "string") return send(res, 400, { error: "no text" });
      if (create && existsSync(file)) return send(res, 409, { error: "a review with that name already exists" });
      if (!create && !existsSync(file)) return send(res, 404, { error: "no such review" });
      writeFileSync(file, text.endsWith("\n") ? text : text + "\n");
      await refreshPreview();
      return send(res, 200, summary(name));
    }
  }
  if (kind === "covers" && !name && req.method === "GET") {
    return send(res, 200, readdirSync(COVERS).filter((f) => COVER_FILE.test(f)).sort());
  }
  if (kind === "covers" && name && req.method === "PUT") {
    if (!COVER_FILE.test(name)) return send(res, 400, { error: "covers are .jpg, .png or .webp, named like the-prize.jpg" });
    writeFileSync(join(COVERS, name), await body(req));
    return send(res, 200, { file: name });
  }
  return send(res, 404, {});
}

// The dev server reads the reviews once, when it loads lib/books.ts.
// Touching that file makes it load them again, so the preview shows the
// save; the short wait lets its file watcher notice before the editor
// reloads the page.
async function refreshPreview() {
  const now = new Date();
  utimesSync(join(ROOT, "lib/books.ts"), now, now);
  await new Promise((r) => setTimeout(r, 400));
}

// Reviews edited or added outside the editor show up in the preview too.
watch(BOOKS, () => {
  const now = new Date();
  utimesSync(join(ROOT, "lib/books.ts"), now, now);
});

// Everything that isn't the editor goes to the site's dev server.
function proxy(req: IncomingMessage, res: ServerResponse) {
  const upstream = request(
    { host: "127.0.0.1", port: PREVIEW_PORT, path: req.url, method: req.method, headers: req.headers },
    (up) => {
      res.writeHead(up.statusCode ?? 502, up.headers);
      up.pipe(res);
    },
  );
  upstream.on("error", () => send(res, 503, "The preview is still starting.", "text/plain"));
  req.pipe(upstream);
}

const server = createServer((req, res) => {
  handle(req, res).catch((e) => send(res, 500, { error: String(e) }));
});
// The dev server's live-reload socket.
server.on("upgrade", (req, socket, head) => {
  const up = connect(PREVIEW_PORT, "127.0.0.1", () => {
    up.write(`${req.method} ${req.url} HTTP/1.1\r\n${Object.entries(req.headers).map(([k, v]) => `${k}: ${v}`).join("\r\n")}\r\n\r\n`);
    up.write(head);
    socket.pipe(up).pipe(socket);
  });
  up.on("error", () => socket.destroy());
  socket.on("error", () => up.destroy());
});
server.listen(PORT, "127.0.0.1", () => {
  console.log(`\n  Review editor: http://localhost:${PORT}\n`);
});

// The preview is the site itself, with drafts shown.
const next = spawn("npx", ["next", "dev", "-p", String(PREVIEW_PORT)], {
  cwd: ROOT,
  env: { ...process.env, SHOW_DRAFTS: "1" },
  stdio: ["ignore", "ignore", "inherit"],
});
const stop = () => {
  next.kill();
  process.exit();
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
