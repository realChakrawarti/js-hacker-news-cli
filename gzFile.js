const { promisify } = require("node:util");
const { pipeline } = require("node:stream");
const { createGzip, createUnzip } = require("node:zlib");
const { createReadStream, createWriteStream } = require("node:fs");

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

module.exports = gzFile;
