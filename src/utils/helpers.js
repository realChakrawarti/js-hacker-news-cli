import path from "path";
import fs from "fs";
import { readFile } from "fs/promises";

const PACKAGE_JSON_PATH = "../../package.json";

/**
 *
 * @param {string} dir Directory to save the file
 * @param {string} fileName Filename with extension
 * @param {object[]} data The data to save on disk
 */
export function saveOnDisk(dir, fileName, data) {
    const fullPath = path.join(dir, fileName);
    fs.appendFile(fullPath, JSON.stringify(data, null, 4), function (err) {
        if (err) throw err;
    });
}

export async function readPackageJson() {
    return JSON.parse(
        await readFile(new URL(PACKAGE_JSON_PATH, import.meta.url))
    );
}

/**
 *
 * @param {string} url Website to scrape HTML from
 */
export async function fetchHTML(url) {
    console.log("Scraping:\t %s\n", url);
    const response = await fetch(url);
    return response.text();
}

export async function readFileFromDisk(filePath) {
    const data = await readFile(filePath, "utf8", (err, fileContent) => {
        if (err) {
            throw new Error(`${err.name}: ${err.message}`);
        }

        return JSON.parse(fileContent);
    });

    console.log("Data", data)

    return data
}

/**
 * @param {string[]} flagArr
 * @returns {string}
 */
export function joinFlags(flagArr) {
    return flagArr.join(", ");
}
