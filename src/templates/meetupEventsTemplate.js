import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"

export default function MeetupEventsTemplate({ data }) {
  const { meetupEvents } = data
  // console.log("meetupEventTemplateData:", meetupEvents)
  return (
    <Layout>
      {/* <SEO title={event.name} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: event.name }} /> */}
      {meetupEvents.name ? meetupEvents.name : "No Data"}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String) {
    meetupEvents(id: { eq: $path.split}) {
      id
      name
    }
  }
`
