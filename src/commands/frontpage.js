import { Command, Option } from "clipanion";
import { getArticlesOfTheDay } from "../utils/fetchData.js";

class Frontpage extends Command {
    static paths = [["-fp"], ["-frontpage"]];

    static usage = Command.Usage({
        category: "Scrape HN",
        description: `Get frontpage posts`,
    });

    backDate = Option.String({ required: true });

    async execute() {
        if (parseInt(this.backDate) > 0) {
            this.context.stdout.write(
                `Getting data posted ${this.backDate} ago!`
            );
            getArticlesOfTheDay(this.backDate)
        } else {
            this.context.stdout.write("Invalid back date received.");
        }
    }
}

export default Frontpage;
