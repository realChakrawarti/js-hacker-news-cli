import { access, constants } from "fs";
import dayjs from "dayjs";
import { readFileFromDisk, saveOnDisk } from "./helpers.js";
import { Endpoint } from "./constants.js";

import Notifier from "./Notifier.js";
import { scrapeHackerNews } from "./recursive.js";
import Table from "./table.js";

export function getArticlesOfTheDay(backDate) {
    const date = dayjs().subtract(backDate, "day").format("YYYY-MM-DD");
    const path = `_data_/fp/${date}.json`;

    // Check if the file exists in the current directory.
    access(path, constants.F_OK, async (err) => {
        if (err) {
            console.log(`${path} does not exist`);
            const arr = await scrapeHackerNews(Endpoint.FRONTPAGE, date);
            saveOnDisk(`./_data_/fp/`, `${date}.json`, arr);
            const notify = new Notifier(
                "Frontpage:",
                `${arr.length} posts retrived for ${date}`
            );
            notify.show();
        } else {
            readFileFromDisk(`_data_/fp/${date}.json`);
            // const data = readFileFromDisk(`_data_/fp/${date}.json`);
            const fpTable = new Table(
                [
                    ["ID", "Title", "Link", "Score", "Comments"],
                    [10, 50, 50, 10, 10],
                ],
                "left"
            );
            fpTable.load(data);
            fpTable.show();
        }
    });
}
