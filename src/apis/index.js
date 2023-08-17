export const BASEURI = "https://news.ycombinator.com/";

export const Endpoint = Object.freeze({
    FRONTPAGE: "front?day=",
    NEWS: "news?p=",
    USER_THREADS: "threads?id=",
    USER_POSTS: "submitted?id=",
    NEW_COMMENTS: "newcomments",
    SHOW: "show",
    ASK: "ask",
    ASK_NEW: "asknew",
    ASK_SHOW: "shownew",
    LAUNCH: "launches",
});

export async function fetchHTML(url) {
    console.log("Scraping:\t [%s]", url);
    const response = await fetch(url);
    return response.text();
}
