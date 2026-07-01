import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
createServer(async (request, response) => {
  const relative = request.url === "/" ? "index.html" : request.url.split("?")[0].slice(1);
  const file = normalize(join(root, relative));
  if (!file.startsWith(root)) return response.writeHead(403).end("Forbidden");
  try {
    response.writeHead(200, { "Content-Type": `${types[extname(file)] || "text/plain"}; charset=utf-8` });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
}).listen(8000, "127.0.0.1", () => console.log("Scoutline running at http://127.0.0.1:8000"));
