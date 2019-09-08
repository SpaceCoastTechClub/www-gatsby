import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import moment from "moment"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const query = graphql`
  {
    allInternalMeetupEvents(sort: { fields: time, order: ASC }) {
      edges {
        node {
          name
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
          }
        }
      }
    }
  }
`
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

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO
        title="Space Coast Tech Club"
        keywords={[`Google`, `Developers`, `Space`, `Coast`]}
      />
      {data.allInternalMeetupEvents.edges.map(({ node }, index) => (
        <article key={index}>
          <h2>
            <a href={node.event_url}>{node.name}</a>
          </h2>
          <h3>{formatDate(node.time)}</h3>
          <div dangerouslySetInnerHTML={{ __html: node.description }} />
        </article>
      ))}
    </Layout>
  )
}
