import Page from "./Page.js";
import { fetchHTML } from "./helpers.js";
import { Endpoint, BASEURI } from "./constants.js";

export async function scrapeHackerNews(type, date) {
    let nextPage;

    switch (type) {
        case Endpoint.FRONTPAGE:
            nextPage = Endpoint.FRONTPAGE + date;
            break;
        case Endpoint.ASK_NEW:
            nextPage = Endpoint.ASK_NEW
            break;
        case Endpoint.ASK:
            nextPage = Endpoint.ASK
            break;
        default:
            throw new Error("Wrong type provided!");
    }

    do {
        const URL = BASEURI + nextPage;
        const html = await fetchHTML(URL);
        const page = new Page(html);
        nextPage = page.getNextPage();
    } while (nextPage);

    return Page.getAllPosts();
}
