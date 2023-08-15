import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { createGzip, createUnzip } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";

const pipe = promisify(pipeline);

class gzFile {
    /**
     * Usage: await gzFile.compress(`./filename.json`, `./filename.json.gz`);
     */
    static async compress(input, output) {
        const gzip = createGzip();
        const source = createReadStream(input);
        const destination = createWriteStream(output);
        await pipe(source, gzip, destination);
    }

    /**
     * Usage: await gzFile.decompress(`./filename.json.gz`, `./filename.json`);
     */
    static async decompress(input, output) {
        const unzip = createUnzip();
        const source = createReadStream(input);
        const destination = createWriteStream(output);
        await pipe(source, unzip, destination);
    }
}

export default gzFile;