/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
var fs = require("fs")
var text2png = require("text2png")
var moment = require("moment")

function formatDate(date) {
  return (
    moment(date)
      .local(true)
      .format("dddd, MMMM Do YYYY") +
    " at " +
    moment(date)
      .local()
      .format("h:mm a")
  )
}

exports.onCreateNode = async ({
  actions,
  createNodeId,
  node,
  store,
  cache,
}) => {
  const { createNode, createNodeField } = actions
  if (node.internal.type === `meetupEvents`) {
    const cardText =
      node.group.name + "\n" + node.name + "\n" + formatDate(node.time)
    imagePath = "src/images/meetup-events/" + node.id + ".png"
    fs.writeFileSync(
      imagePath,
      text2png(cardText, {
        font: "96px Futura",
        color: "rebeccapurple",
        backgroundColor: "white",
        lineSpacing: 10,
        padding: 20,
      })
    )
    await createNodeField({
      node,
      name: `featureImage`,
      value: { imagePath },
    })
  }
}
