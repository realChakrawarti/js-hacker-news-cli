import path from "path"
import fs from "fs";
/**
 * 
 * @param {string} dir Directory to save the file
 * @param {string} fileName Filename with extension
 * @param {object[]} data The data to save on disk
 */
function saveOnDisk(dir, fileName, data) {
    const fullPath = path.join(dir, fileName)
    fs.appendFile(
        fullPath,
        JSON.stringify(data, null, 4),
        function (err) {
            if (err) throw err;
        }
    );
}

export default saveOnDisk;