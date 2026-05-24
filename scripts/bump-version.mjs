import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import packageJson from "../package.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const version = packageJson.version;
console.log("version:", version);

const root = resolve(join(__dirname, ".."));
const appJsonPath = join(root, "app.json");
const appJson = JSON.parse(readFileSync(appJsonPath));
appJson.expo.version = version;
appJson.expo.android.versionCode += 1;
writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2), {
  encoding: "utf-8",
  flag: "w",
});
