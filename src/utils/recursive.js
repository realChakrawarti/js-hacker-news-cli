import Page from "./Page.js";
import { BASEURI, fetchHTML, Endpoint } from "../apis/index.js";

export async function scrapeHackerNews(type, date) {
    let nextPage;

    switch (type) {
        case Endpoint.FRONTPAGE:
            nextPage = Endpoint.FRONTPAGE + date;
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
