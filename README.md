### Hacker News

Base URL: https://news.ycombinator.com/

-   front?day=`YYYY-MM-DD`&p=`PAGE_NUMBER`
-   news?p=25: 25 pages max
-   threads?id=`mdwalters`
-   launches
-   newest
-   asknew
-   ask
-   shownew
-   show
-   submitted?id=`abetaha`
-   newcomments: To get posts which are actively interacted, active posts

## To Implement

- [x] Frontpage
- [ ] Show
- [ ] Ask
- [ ] News
- [ ] News

### References:

-   https://zetcode.com/javascript/cheerio/
-   https://blog.logrocket.com/parsing-html-nodejs-cheerio/
-   https://scrapeninja.net/cheerio-sandbox/basic
-   https://npmtrends.com/
-   https://www.npmjs.com/package/cosmiconfig
-   say.js GitHub: https://github.com/Marak/say.js
-   TTS using say.js: https://www.youtube.com/watch?v=SfeUTOlaWmk
-   GTTS, looks promising: https://www.youtube.com/watch?v=Q3wfPhUaR9Y
-   https://github.com/nilic/hntop-cli
-   https://cheerio.js.org/docs/category/tutorials---advanced
-   https://github.com/lirantal/nodejs-cli-apps-best-practices
-   Spinner: https://github.com/sindresorhus/ora
-   Cheerio: https://github.com/karakanb/hn-parser/blob/master/index.js, https://www.npmjs.com/package/cheerio
-   Terminal Width: https://github.com/karsai5/bitbucket-pullrequests/blob/ccffcdbb1552dc56bc2d6e98bf148e2d0957ac66/src/printTable.js#L4
-   Table re-usable: https://github.com/MeanBean87/employee-tracker/blob/8030a77c00933791f9ba091130d2db82b757a354/app/crudHandlers/readQueries.js#L4
-   https://github.com/ehmicky/cross-platform-terminal-characters
-   https://github.com/sindresorhus/open
-   TinaCMS https://github.com/tinacms/tinacms/blob/fb58bb707cc30552516b8a64e9adda74b3937cef/packages/%40tinacms/cli/src/index.ts#L31, uses Clipanion CLI



## Commands lists:

### Flags: 

- -l, --list <number: no of articles to show>
- -s,--sort <string: score, comment, age> : Defaults to descending (for score, comments), high to low, reverse for age
- -m. --match <string: regex on link and title>: Finds links and title having match text

#### Frontpage

- hackr <fp | frontpage> today : Fetches article of today
- hackr <fp | frontpage> back, bd, old : Fetches article of today