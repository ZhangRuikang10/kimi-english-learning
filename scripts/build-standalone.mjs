import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modules = new Map(); const ordered = [];
const resolveImport = (from, spec) => path.posix.normalize(path.posix.join(path.posix.dirname(from), spec));
async function visit(file) {
  if (modules.has(file)) return;
  modules.set(file, null);
  let source = await readFile(path.join(root, file), "utf8");
  const imports = [...source.matchAll(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];?/g)];
  for (const match of imports) await visit(resolveImport(file, match[2]));
  source = source.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];?/g, (_all, names, spec) => `const { ${names.trim()} } = window.__eaModules[${JSON.stringify(resolveImport(file, spec))}];`);
  const exports = [];
  source = source.replace(/export\s+(const|function|class)\s+([A-Za-z_$][\w$]*)/g, (_all, type, name) => { exports.push(name); return `${type} ${name}`; });
  modules.set(file, `${source}\nObject.assign(exports, { ${exports.join(", ")} });`); ordered.push(file);
}
await visit("js/app.js");
const styles = await Promise.all(["css/tokens.css", "css/base.css", "css/layout.css", "css/components.css"].map((file) => readFile(path.join(root, file), "utf8")));
const bundled = ordered.map((file) => `window.__eaModules[${JSON.stringify(file)}] = {};\n(function(exports) {\n${modules.get(file)}\n})(window.__eaModules[${JSON.stringify(file)}]);`).join("\n\n");
const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="theme-color" content="#fff9f1"><title>English Adventure</title><style>${styles.join("\n")}</style></head><body><main id="app" class="app" aria-live="polite"></main><script>window.__eaModules = {};\n${bundled}</script></body></html>`;
await writeFile(path.join(root, "play-now.html"), html);
console.log(`Built play-now.html with ${modules.size} modules.`);
