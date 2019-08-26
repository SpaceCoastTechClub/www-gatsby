import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const query = graphql`
  {
    allJson {
      edges {
        node {
          id
          name
          description
          url
          startDate(formatString: "dddd, MMMM Do YYYY h:mm a")
          location {
            name
            address {
              streetAddress
              addressLocality
              addressRegion
              postalCode
            }
            geo {
              latitude
              longitude
            }
          }
          endDate(formatString: "h:mm a")
          organizer {
            name
            url
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
      <ul>
        {data.allJson.edges.map(({ node }, index) => (
          <li key={index}>
            <a href={node.url}>{node.name}</a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
