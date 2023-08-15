class Post {
    #htmlPage;
    #item;
    
    #postId;

    #post = {
        id: "",
        title: "",
        link: "",
        age: "",
        score: "",
        comment: "",
    };

    constructor(item, html) {
        this.#htmlPage = html
        this.#item = this.#htmlPage(item)

        this.#setPostId()
        this.#setPost()
    }

    #setPostId() {
        this.#postId = this.#item.attr("id")
    }

    #getPostId() {
        return this.#postId;
    }

    #getPostTitle() {
        return this.#item.find(".titleline").children().first().text()
    }

    #getPostLink() {
        return this.#item.find(".titleline")
            .children().first().attr("href");
    }

    #getPostScore() {
        return this.#htmlPage(`#score_${this.#postId}`).text().match(/\d+/)[0];
    }

    #getPostAge() {
        // const currentTime = new Date();
        return this.#htmlPage(`#score_${this.#postId}`)
        .parent().find(".age").attr("title")

        // TODO: Return minutes/ hours/ days to help in sorting by new-old
    }

    #getPostComments() {
        const comments = this.#htmlPage(`#score_${this.#postId}`)
            .parent().children().last().text().match(/\d+/)
            ?.at(0);

        return comments ?? "0";
    }

    #setPost() {
        this.#post = {
            id: this.#getPostId(),
            title: this.#getPostTitle(),
            link: this.#getPostLink(),
            age: this.#getPostAge(),
            score: this.#getPostScore(),
            comment: this.#getPostComments(),
        };
    }

    getPost() {
        return this.#post;
    }
}

export default Post;
