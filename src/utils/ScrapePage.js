import cheerio from 'cheerio'
import PostInfo from "./PostInfo.js";

const allPosts = [];

class ScrapePage {
    #postElements;
    #pageHtml;

    constructor(html) {
    this.#pageHtml = cheerio.load(html)
    this.#setPostElements();
    this.#setAllPosts()
    }

    #setPostElements() {
        this.#postElements =
            this.#pageHtml(".athing");
    }

    #getPostElements() {
        return this.#postElements;
    }

    #setAllPosts() {
        const elements = this.#getPostElements();
        for (let item of elements) {
            const post = new PostInfo(item, this.#pageHtml);
            allPosts.push(post.getPostInfo());
        }
    }

    getNextPage() {
        const moreLink = this.#pageHtml(".morelink");

        if (moreLink) {
            return moreLink.attr("href");
        }

        return null;
    }

    static getAllPosts() {
        return allPosts;
    }
}

export default ScrapePage;
