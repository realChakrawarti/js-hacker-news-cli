#!/usr/bin/env node

const { JSDOM } = require("jsdom");
const dayjs = require("dayjs");
const notifier = require("node-notifier")
const gzFile = require("./utils/gzFile");
const ScrapePage = require("./utils/ScrapePage");

const saveOnDisk = require("./utils/saveOnDisk");

const baseUrl = "https://news.ycombinator.com/";

let arr = [];

async function getArticlesOfTheDay(backDate) {
    const date = dayjs().subtract(backDate, "day").format("YYYY-MM-DD");
    let nextPage = `front?day=${date}`;
    let dom;
    do {
        const URL = baseUrl + nextPage;
        console.log("Scraping:", URL);
        const response = await fetch(URL);
        const html = await response.text();
        dom = new JSDOM(html, {
            contentType: "text/html",
        });

        const page = new ScrapePage(dom);
        page.getPosts();
        nextPage = page.getNextPage();
    } while (nextPage);

    arr = ScrapePage.getAllPosts();

    saveOnDisk(`./_data_/`, `${date}.json`, arr);

    await gzFile.compress(`./_data_/${date}.json`, `./_data_/${date}.json.gz`);

    notifier.notify({
        title: `Fetched Frontpage posts `,
        message: `${arr.length} posts retrived for ${date}`,
        icon: 'Terminal Icon',
        id: Date.now().toString,
        appID: 'Hackr'
    });
}

if (process.argv.length == 2) console.log("Provide a back date!");

if (process.argv.length > 2 && process.argv[2]) {
    const URL = process.argv[2];
    getArticlesOfTheDay(URL);
}
