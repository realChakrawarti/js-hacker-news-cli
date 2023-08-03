const { promisify } = require("node:util");
const { pipeline } = require("node:stream");
const { createGzip } = require("node:zlib");
const { createReadStream, createWriteStream } = require("node:fs");

const pipe = promisify(pipeline);

async function compress(input, output) {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
}

exports.Compress = compress;

// Usage
//   do_gzip(`./daily/${date}.json`, `./daily/${date}.json.gz`)
//   .catch((err) => {
//     console.error('An error occurred:', err);
//     process.exitCode = 1;
//   });
