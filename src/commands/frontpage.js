import { Command, Option } from "clipanion";
import { getArticlesOfTheDay } from "../utils/fetchData.js";
import chalk from "chalk";
import { joinFlags, readPackageJson } from "../utils/helpers.js";

const packageJson = await readPackageJson()

const todayFlag = ["-t", "--today"]
const oldFlag = ["-o", "--old"]
const listFlag = ["-l", "--list"]

class Frontpage extends Command {
    static paths = [["fp"], ["frontpage"]];

    static usage = Command.Usage({
        category: "Retrivers",
        description: "Get frontpage posts",
        details: `
        This command fetch posts from \`https://news.ycombinator.com/frontpage\`.

        ${chalk.bold("--today, -t")}: Gets all the post of the current day.\n
        ${chalk.bold("--old, -o")}: Gets posts \`value\` days back.
        `,
        examples: [
            ["Show all post today", `${packageJson.name} frontpage --today`],
            ["Show posts from 3 days back", `${packageJson.name} frontpage --old 3`],
        ],
    });

    old = Option.String(joinFlags(oldFlag));
    today = Option.Boolean(joinFlags(todayFlag));
    list = Option.String(joinFlags(listFlag));

    async execute() {
        const date = parseInt(this.old) || 0;
        // const list = parseInt(this.list) || 0;

        if (date === 0 || this.today) {
            console.log("Getting articles for today");
            getArticlesOfTheDay(date);
        } else if (date > 0) {
            console.log("Getting articles from %s days ago", date);
            getArticlesOfTheDay(date);
        } else {
            this.context.stdout.write("Invalid back date received.");
        }
    }
}

export default Frontpage;
