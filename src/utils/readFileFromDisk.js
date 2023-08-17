import fs from "fs";
import Table from "cli-table3";
// const colors = require('@colors/colors')

function alignHeader(align, arr) {
  return arr.map(item => {
    return {
      hAlign: align,
      content: item
    }
  })
}

// function colorize(color, arr) {
//   return arr.map(item => {
//     return {
//       ...item, content: color(item.content)
//     }
//   })
// }

function readFileFromDisk(filePath) {
    let data;
    fs.readFile(filePath, "utf8", (err, fileContent) => {
        if (err) {
            console.error(err);
            return;
        }

        let table = new Table({
          // head: colorize(colors.cyan, alignHeader("center",['ID', 'Title', 'Link', 'Score', 'Comments'])),
          head: alignHeader("center", ['ID', 'Title', 'Link', 'Score', 'Comments']),
          style: {
            head: ["yellow", "bold"], //disable colors in header cells
            border: ["gray"], //disable colors for the border
          },
          wordWrap: true,
          colWidths: [10, 50, 50, 10, 10], //set the widths of each column (optional)
        });

        const slicedFileContent = JSON.parse(fileContent).slice(0, 30)

        slicedFileContent.forEach(element => {
          const itemData = Object.values(element)
          const [postId, title, link, age, score, comments] = itemData
          const href = `https://news.ycombinator.com/item?id=${postId}`
          itemData[0] = {content: postId, href }
          itemData[3] = {hAlign: "center", content: score }
          itemData[4] = {hAlign: "center", content: comments }
          table.push([postId, title, link, score, comments])
        });
        console.log(table.toString())
    });
}

export default readFileFromDisk;
