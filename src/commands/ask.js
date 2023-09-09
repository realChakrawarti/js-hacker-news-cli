import {Command, Option} from "clipanion";
import dayjs from "dayjs";
import { scrapeHackerNews } from "../utils/recursive.js";
import { Endpoint } from "../utils/constants.js";
import { saveOnDisk } from "../utils/helpers.js";
import Notifier from "../utils/Notifier.js";

class Ask extends Command {
    static paths = [["ask"]];

    static usage = Command.Usage({
        category: "Retrivers",
        description: "Get ask posts"
    })

    new = Option.Boolean("-n, --new");

    async execute() {

        if (this.new) {
            const date = dayjs().format("YYYY-MM-DD");
            const data = await scrapeHackerNews(Endpoint.ASK_NEW, date)
            saveOnDisk(`./_data_/ask_new/`, `${date}.json`, data);
            const notify = new Notifier("Ask:", `${data.length} posts retrived`);
            notify.show();
        } else {
            const date = dayjs().format("YYYY-MM-DD");
            const data = await scrapeHackerNews(Endpoint.ASK, date)
            saveOnDisk(`./_data_/ask/`, `${date}.json`, data);
            const notify = new Notifier("Ask:", `${data.length} posts retrived`);
            notify.show();
        }
    }
}

export default Ask;