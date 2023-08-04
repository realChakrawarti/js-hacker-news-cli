const PostInfo = require("./PostInfo");

const allPosts = [];

class ScrapePage {
    #postElements;
    #dom;

    constructor(dom) {
        this.#dom = dom;
    }

    #setPostElements() {
        this.#postElements =
            this.#dom.window.document.querySelectorAll(".athing");
    }

    #getPostElements() {
        return this.#postElements;
    }

    getPosts() {
        this.#setPostElements();
        const elements = this.#getPostElements();
        for (let item of elements) {
            const post = new PostInfo(item, this.#dom);
            allPosts.push(post.getPostInfo());
        }
    }

    getNextPage() {
        const moreLink = this.#dom.window.document.querySelector(".morelink");

        if (moreLink) {
            return moreLink.getAttribute("href");
        }

        return null;
    }

    static getAllPosts() {
        return allPosts;
    }
}

module.exports = ScrapePage;
