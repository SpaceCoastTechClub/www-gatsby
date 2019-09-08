import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MeetupEvent from "../components/meetupEvent"

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

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO
        title="Space Coast Tech Club"
        keywords={[`Google`, `Developers`, `Space`, `Coast`]}
      />
      {data.allInternalMeetupEvents.edges.map(({ node }, index) => (
        <MeetupEvent event={node} index={index} />
      ))}
    </Layout>
  )
}
