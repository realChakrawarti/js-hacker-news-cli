#!/usr/bin/env node

import { access, constants } from "fs";
import dayjs from "dayjs";
import notifier from "node-notifier";
import gzFile from "./utils/gzFile.js";
import Page from "./utils/Page.js";

import saveOnDisk from "./utils/saveOnDisk.js";
// const readFileFromDisk = require("./utils/readFileFromDisk");

const baseUrl = "https://news.ycombinator.com/";

let arr = [];

function getArticlesOfTheDay(backDate) {
    const date = dayjs().subtract(backDate, "day").format("YYYY-MM-DD");
    const path = `./_data_/${date}.json`;

    // Check if the file exists in the current directory.
    access(path, constants.F_OK, async (err) => {
        if (err) {
            console.log(`${path} does not exist`);
            let nextPage = `front?day=${date}&p=1`;

            do {
                const URL = baseUrl + nextPage;
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

        // const data = readFileFromDisk(path);
        // console.log("Data", data);
    });
}

if (process.argv.length == 2) console.log("Provide a back date!");

if (process.argv.length > 2 && process.argv[2]) {
    const URL = process.argv[2];
    getArticlesOfTheDay(URL);
}
