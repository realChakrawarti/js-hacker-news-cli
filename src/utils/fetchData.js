import { access, constants } from "fs";
import dayjs from "dayjs";
import notifier from "node-notifier";
import gzFile from "./gzFile.js";
import Page from "./Page.js";
import saveOnDisk from "./saveOnDisk.js";
import readFileFromDisk from "./readFileFromDisk.js";

import { BASEURI } from "../apis/index.js";


let arr = [];

export function getArticlesOfTheDay(backDate) {
    const date = dayjs().subtract(backDate, "day").format("YYYY-MM-DD");
    const path = `_data_/${date}.json`;

    // Check if the file exists in the current directory.
    access(path, constants.F_OK, async (err) => {
        if (err) {
            console.log(`${path} does not exist`);
            let nextPage = `front?day=${date}`;

            do {
                const URL = BASEURI + nextPage;
                console.log("Scraping:", nextPage);
                const response = await fetch(URL);
                const html = await response.text();
            
                const page = new Page(html);
                nextPage = page.getNextPage();
            } while (nextPage);

            arr = Page.getAllPosts();

            saveOnDisk(`./_data_/`, `${date}.json`, arr);

            await gzFile.compress(
                `./_data_/${date}.json`,
                `./_data_/${date}.json.gz`
            );

            notifier.notify({
                title: `Fetched Frontpage posts`,
                message: `${arr.length} posts retrived for ${date}`,
                icon: "Terminal Icon",
                id: Date.now().toString,
                appID: "Hackr",
            });
        }

        else {
            readFileFromDisk(`_data_/${date}.json`)
        }
    });
}


