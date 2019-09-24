/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
var fs = require("fs")
var text2png = require("text2png")

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `meetupEvents`) {
    const event = node
    // console.log(`\nEvent: `, event)
    fs.writeFileSync(
      "src/images/meetup-events/" + node.id + ".png",
      text2png(node.name, {
        font: "80px DankMono",
        localFontPath: "src/fonts/DankMono-Italic.ttf",
        localFontName: "DankMono",
        color: "teal",
        backgroundColor: "linen",
        lineSpacing: 10,
        padding: 20,
      })
    )
  }
}
