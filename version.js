#!/usr/bin/env node

const { JSDOM } = require("jsdom");
const fs = require("fs");
const dayjs = require("dayjs");
const gzFile = require("./gzFile");

const baseUrl = "https://news.ycombinator.com/";

let arr = [];

function appendContent(items, dom) {
    for (let item of items) {
        const id = item.getAttribute("id");
        const title = item.querySelector(".titleline").children[0].textContent;
        const link = item
            .querySelector(".titleline")
            .children[0].getAttribute("href");
        const score = dom.window.document
            .querySelector(`#score_${id}`)
            .textContent.match(/\d+/)[0];
        const comment = dom.window.document
            .querySelector(`#score_${id}`)
            .parentElement.children[5].textContent.match(/\d+/)
            ?.at(0);

        const itemObj = {
            id,
            title,
            link,
            score,
            comment: comment ?? "0",
        };

        arr.push(itemObj);
    }
}

async function getArticlesOfTheDay(backDate) {
    const date = dayjs().subtract(backDate, "day").format("YYYY-MM-DD");
    let dayStories = `front?day=${date}`;
    let dom, moreLink;
    do {
        const URL = baseUrl + dayStories;
        console.log("Scraping:", URL);
        const response = await fetch(URL);
        const html = await response.text();
        dom = new JSDOM(html, {
            contentType: "text/html",
        });
        const items = dom.window.document.querySelectorAll(".athing");
        appendContent(items, dom);

        moreLink = dom.window.document.querySelector(".morelink");
        if (moreLink) {
            dayStories = moreLink.getAttribute("href");
        }
    } while (moreLink);

    fs.appendFile(
        `./daily/${date}.json`,
        JSON.stringify(arr, null, 4),
        function (err) {
            if (err) throw err;
        }
    );

    await gzFile.compress(`./daily/${date}.json`, `./daily/${date}.json.gz`);
}

if (process.argv.length == 2) console.log("Provide a back date!");

if (process.argv.length > 2 && process.argv[2]) {
    const URL = process.argv[2];
    getArticlesOfTheDay(URL);
}
