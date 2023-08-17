import { Command, Option } from "clipanion";
import { getArticlesOfTheDay } from "../utils/fetchData.js";

class Frontpage extends Command {
    static paths = [["fp"], ["frontpage"]];

    static usage = Command.Usage({
        category: "Retrivers",
        description: "Get frontpage posts",
    });

    backDate = Option.String("-old", {
        description: "Provide number of days to go back and fetch posts",
    });

    today = Option.Boolean("-today");

    list = Option.String("--list", "-l");

    async execute() {
        const date = parseInt(this.backDate) || 0;
        const list = parseInt(this.list) || 0;
        if (date === 0 || this.today) {
            console.log("Getting articles for today");
            getArticlesOfTheDay(date);
        } else if (date > 0) {
            console.log("Getting articles for %s days ago", date);
            getArticlesOfTheDay(date);
        } else {
            this.context.stdout.write("Invalid back date received.");
        }
    }
}

export default Frontpage;
