import CLITable from "cli-table3";

export default class Table {
    #label;
    #width;
    #align;
    #table;

    /**
     *
     * @param {string[][]} headers
     * @param {string} [align="center"] - Defaults to `center`. Accepts, `left`, `center` and `right`
     */
    constructor(headers, align = "center") {
        this.#label = headers[0];
        this.#width = headers[1];
        this.#align = align;

        if (this.#label.length !== this.#width.length) {
            throw new Error(
                `Numbers of items in label and width doesn't match. Please provide same numbers of items in width as label, i.e ${
                    this.#label.length
                }`
            );
        }
    }

    static alignHeader(align, arr) {
        return arr.map((item) => {
            return {
                hAlign: align,
                content: item,
            };
        });
    }

    createTable() {
        this.#table = new CLITable({
            head: alignHeader(this.#align, this.#label),
            style: {
                head: ["yellow", "bold"], //disable colors in header cells
                // border: ["gray"], //disable colors for the border
            },
            wordWrap: true,
            colWidths: this.#width, //set the widths of each column (optional)
        });
    }

    load(data) {
        data.forEach((element) => {
            const itemData = Object.values(element);
            const [postId, title, link, age, score, comments] = itemData;
            const href = `https://news.ycombinator.com/item?id=${postId}`;
            itemData[0] = { content: postId, href };
            itemData[3] = { hAlign: "center", content: score };
            itemData[4] = { hAlign: "center", content: comments };
            this.#table.push([postId, title, link, score, comments]);
        });
    }

    show() {
        console.log(this.#table.toString());
    }
}
