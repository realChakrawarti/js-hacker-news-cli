import { load } from "cheerio";
import Post from "./Post.js";

const allPosts = []

class Page {
    #postItems;
    #htmlPage;

    constructor(html) {
        console.time("EachPage")
        this.#htmlPage = load(html);
        this.#setpostItems();
        this.#setAllPosts();
        console.timeEnd("EachPage")
    }

    #setpostItems() {
        this.#postItems = this.#htmlPage(".athing");
    }

    #getpostItems() {
        return this.#postItems;
    }

    #setAllPosts() {
        const elements = this.#getpostItems();
        for (let item of elements) {
            const post = new Post(item, this.#htmlPage);
            allPosts.push(post.getPost());
        }
    }

    getNextPage() {
        const moreLink = this.#htmlPage(".morelink");

        if (moreLink) {
            return moreLink.attr("href");
        }

        return null;
    }

    static getAllPosts() {
        return allPosts;
    }
}

export default Page;
