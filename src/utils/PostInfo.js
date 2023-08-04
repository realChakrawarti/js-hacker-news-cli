class PostInfo {
    #dom;
    #item;

    #id;

    #post = {
        id: "",
        title: "",
        link: "",
        score: "",
        comment: "",
    };

    constructor(item, dom) {
        this.#dom = dom;
        this.#item = item;
    }

    #getId() {
        this.#id = this.#item.getAttribute("id");
        return this.#id;
    }

    #getTitle() {
        return this.#item.querySelector(".titleline").children[0].textContent;
    }

    #getLink() {
        return this.#item
            .querySelector(".titleline")
            .children[0].getAttribute("href");
    }

    #getScore() {
        return this.#dom.window.document
            .querySelector(`#score_${this.#id}`)
            .textContent.match(/\d+/)[0];
    }

    #getComment() {
        const comments = this.#dom.window.document
            .querySelector(`#score_${this.#id}`)
            .parentElement.children[5].textContent.match(/\d+/)
            ?.at(0);

        return comments ?? "0";
    }

    #setPost() {
        this.#post = {
            id: this.#getId(),
            title: this.#getTitle(),
            link: this.#getLink(),
            score: this.#getScore(),
            comment: this.#getComment(),
        };
    }

    getPostInfo() {
        this.#setPost();
        return this.#post;
    }
}

module.exports = PostInfo;
