class PostInfo {
    #item;
    #pageHtml;

    #id;

    #post = {
        id: "",
        title: "",
        link: "",
        age: "",
        score: "",
        comment: "",
    };

    constructor(item, html) {
        this.#pageHtml = html
        this.#item = this.#pageHtml(item)

        this.#setId()
        this.#setPost()
    }

    #setId() {
        this.#id = this.#item.attr("id")
    }

    #getId() {
        return this.#id;
    }

    #getTitle() {
        // console.log("Title", this.#item.find(".titleline").children().first().text())
        return this.#item.find(".titleline").children().first().text()
    }

    #getLink() {
        // console.log("Link", this.#item.find(".titleline")
        // .children().first().attr("href"))
        return this.#item.find(".titleline")
            .children().first().attr("href");
    }

    #getScore() {
        // console.log("Score", this.#pageHtml(`#score_${this.#id}`).text().match(/\d+/)[0])
        return this.#pageHtml(`#score_${this.#id}`).text().match(/\d+/)[0];
    }

    #getAge() {
        // const currentTime = new Date();
        return this.#pageHtml(`#score_${this.#id}`)
        .parent().find(".age").attr("title")

        // TODO: Return minutes/ hours/ days to help in sorting by new-old
    }

    #getComment() {
        // console.log("Comments", this.#pageHtml(`#score_${this.#id}`)
        // .parent().children().last().text().match(/\d+/)
        // ?.at(0))
        const comments = this.#pageHtml(`#score_${this.#id}`)
            .parent().children().last().text().match(/\d+/)
            ?.at(0);

        return comments ?? "0";
    }

    #setPost() {
        this.#post = {
            id: this.#getId(),
            title: this.#getTitle(),
            link: this.#getLink(),
            age: this.#getAge(),
            score: this.#getScore(),
            comment: this.#getComment(),
        };
    }

    getPostInfo() {
        return this.#post;
    }
}

module.exports = PostInfo;
