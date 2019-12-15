/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/templates/basicTemplate.js")
  const meetupEventsTemplate = path.resolve(
    "src/templates/meetupEventsTemplate.js"
  )

  const result = await graphql(`
    allMeetupEvents(sort: { fields: time, order: ASC }) {
      edges {
        node {
          id
          name
          eventPhoto {
            id
            childImageSharp {
              fluid(maxWidth: 1280, toFormat: PNG) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          groupPhoto {
            id
            childImageSharp {
              fluid(maxWidth: 1280, toFormat: PNG) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          description
          time
          photo_url
          event_url
          duration
          series {
            start_date
            alternative_id
            description
          }
          venue {
            name
            lat
            lon
            address_1
            city
          }
          how_to_find_us
          group {
            group_photo {
              highres_link
            }
            urlname
            name
          }
        }
      }
    }
  }
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.")

    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })

  result.data.allMeetupEvents.edges.forEach(({ node }) => {
    console.log("meetup node: ", node)

    createPage({
      path: "/meetup/" + node.id,
      component: meetupEventsTemplate,
      context: {}, // additional data can be passed via context
    })
  })
}
