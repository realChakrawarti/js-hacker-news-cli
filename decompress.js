const { promisify } = require("node:util");
const {createReadStream, createWriteStream } = require("fs");
const { createUnzip } = require("node:zlib");
const { pipeline } = require("node:stream");

const pipe = promisify(pipeline);

async function decompress(input, output) {
    const unzip = createUnzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);

    await pipe(source, unzip, destination);
}

exports.Extract = decompress
