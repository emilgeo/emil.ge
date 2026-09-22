// Starts the next /now update by copying the current one to a new dated file.
// The previous file stays put and becomes an archive entry automatically.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dir = "src/content/now";
const today = new Date();
const stamp = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
const target = join(dir, `${stamp}.md`);

const existing = (await readdir(dir)).filter((name) => name.endsWith(".md")).sort();

if (existing.includes(`${stamp}.md`)) {
  console.log(`${target} already exists. Edit it directly.`);
  process.exit(0);
}

const latest = existing.at(-1);
if (!latest) {
  console.error(`No entries in ${dir} to copy.`);
  process.exit(1);
}

const source = await readFile(join(dir, latest), "utf8");
const iso = today.toISOString().slice(0, 10);
await writeFile(target, source.replace(/^date: .*$/m, `date: ${iso}`));

console.log(`Created ${target} from ${latest}.`);
console.log(`${latest} is now archived at /now/${latest.replace(/\.md$/, "")}.`);
