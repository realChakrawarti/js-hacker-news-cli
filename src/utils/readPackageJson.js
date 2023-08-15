import { readFile } from "fs/promises";

const PACKAGE_JSON_PATH = "../../package.json"

export async function readPackageJson() {
    return JSON.parse(await readFile(new URL(PACKAGE_JSON_PATH, import.meta.url)));
}
