#!/usr/bin/env node

const { JSDOM } = require("jsdom");
const fs = require("fs");
const say = require("say");

function getComments(url) {
    let wordCount = 0;
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (html) {
            const dom = new JSDOM(html, {
                contentType: "text/html",
            });

            const title =
                dom.window.document.querySelector(".titleline").children[0]
                    .innerHTML;
            const nodes = dom.window.document.querySelectorAll(".commtext");

            for (element of nodes) {
                const replyElement = element.querySelector(".reply");

                if (element.contains(replyElement)) {
                    element.removeChild(replyElement);
                }

                const textContent = element.textContent;
                const count = textContent.trim().split(/\s+/).length;
                wordCount += count;
                fs.appendFile(
                    `./scraped/${title}.md`,
                    textContent,
                    function (err) {
                        if (err) throw err;
                    }
                );
            }
            return wordCount;
        })
        .then((res) => console.log(res))
        .catch(function (err) {
            console.warn("Something went wrong.", err);
        });
}

function readFileAndCrop() {
    fs.readFile("test.md", "utf8", function (err, data) {
        say.speak(data);
        // const count = data.trim().split(/\s+/).length;
        // if (count > 3000) {
        //     const arr = data.trim().split(/\s+/)
        //     const textContent = arr.slice(0,3000).join(' ')
        //     fs.appendFile("test_cropped.md", textContent, function (err) {
        //         if (err) throw err;
        //       });
        // }
    });
}

say.getInstalledVoices((err, voices) => console.log(voices));
// [ 'Microsoft David Desktop', 'Microsoft Zira Desktop' ]
say.speak("Hello world, this is beautiful", "", 0.85, (err) => {
    console.log(err);
});

// if (process.argv.length == 2) console.log("Please provide a link to hacker news article!")

// if (process.argv.length > 2 && process.argv[2]) {
//     const URL = process.argv[2]
//     getComments(URL);
// }

// readFileAndCrop()
