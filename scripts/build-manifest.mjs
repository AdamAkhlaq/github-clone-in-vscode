// Emit dist/manifest.json from the source manifest, stamping its version from
// package.json. package.json is the single source of truth for the version, so
// the shipped manifest can never drift from it.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (name) => JSON.parse(readFileSync(join(root, name), "utf8"));

const manifest = readJson("manifest.json");
manifest.version = readJson("package.json").version;

writeFileSync(
	join(root, "dist", "manifest.json"),
	JSON.stringify(manifest, null, "\t") + "\n",
);
