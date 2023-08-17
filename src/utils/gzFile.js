import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { createGzip, createUnzip } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";

const pipe = promisify(pipeline);

class gzFile {
    /**
     * @usage await gzFile.compress(`./filename.json`, `./filename.json.gz`);
     * @description Creates a .gz compressed file from provided input file 
     */
    static async compress(input, output) {
        const gzip = createGzip();
        const source = createReadStream(input);
        const destination = createWriteStream(output);
        await pipe(source, gzip, destination);
    }

    /**
     * @usage await gzFile.decompress(`./filename.json.gz`, `./filename.json`);
     * @description Unzip a .gz file and extract the content
     */
    static async decompress(input, output) {
        const unzip = createUnzip();
        const source = createReadStream(input);
        const destination = createWriteStream(output);
        await pipe(source, unzip, destination);
    }
}

export default gzFile;