import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MeetupEventCard from "../components/meetupEventCard"
import MeetupEventTable from "../components/meetupEventTable"

import "../styles/styles.scss"

export const query = graphql`
  {
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
`

export default ({ data }) => {
  let seriesId = []
  const series = data.allMeetupEvents.edges
    .filter(node => node.node.name !== null)
    .filter(node => node.node.series !== null)
    .filter(node => {
      let result = seriesId.includes(node.node.series.alternative_id)
        ? null
        : node.node.series.alternative_id
      if (result) {
        seriesId.push(result)
        return true
      } else {
        return false
      }
    })
  console.log("series: ", series)
  return (
    <Layout>
      <SEO
        title="Space Coast Tech Club"
        keywords={[`Google`, `Developers`, `Space`, `Coast`]}
      />
      <section id="mainEvents" className="cards">
        <h1>Main Events</h1>
        {data.allMeetupEvents.edges
          .filter(node => node.node.name !== null)
          .filter(node => node.node.series === null)
          .map(({ node }) => (
            <MeetupEventCard event={node} showDescription={false} />
          ))}
      </section>
      <section id="seriesEvents" className="table">
        <h1>Series Events</h1>
        {<MeetupEventTable events={series} />}
      </section>
    </Layout>
  )
}
