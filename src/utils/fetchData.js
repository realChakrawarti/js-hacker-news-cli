import { access, constants } from "fs";
import dayjs from "dayjs";
import readFileFromDisk from "./readFileFromDisk.js";
import saveOnDisk from "./saveOnDisk.js";

import { Endpoint } from "../apis/index.js";
import Notifier from "./Notifier.js";
import { scrapeHackerNews } from "./recursive.js";

export function getArticlesOfTheDay(backDate) {
    const date = dayjs().subtract(backDate, "day").format("YYYY-MM-DD");
    const path = `_data_/${date}.json`;

    // Check if the file exists in the current directory.
    access(path, constants.F_OK, async (err) => {
        if (err) {
            console.log(`${path} does not exist`);
            const arr = await scrapeHackerNews(Endpoint.FRONTPAGE, date);
            saveOnDisk(`./_data_/`, `${date}.json`, arr);
            const notify = new Notifier(
                "Frontpage:",
                `${arr.length} posts retrived for ${date}`
            );
            notify.show();
        } else {
            readFileFromDisk(`_data_/${date}.json`);
        }
    });
}
