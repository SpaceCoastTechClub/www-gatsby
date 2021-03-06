import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Img from "gatsby-image"
import moment from "moment"

import "./meetupEventCard.css"

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

const MeetupEventCard = ({ event, showDescription }) => (
  <article key={event.id} className="card">
    <h2>{event.group.name}</h2>
    <h3>
      <a href={event.event_url}>{event.name}</a>
    </h3>
    <h4>{formatDate(event.time)}</h4>
    {showDescription ? (
      <div dangerouslySetInnerHTML={{ __html: event.description }} />
    ) : null}
    {event.eventPhoto ? (
      <Img fluid={event.eventPhoto.childImageSharp.fluid} alt="{event.name}" />
    ) : event.groupPhoto ? (
      <Img fluid={event.groupPhoto.childImageSharp.fluid} alt="{event.name}" />
    ) : (
      ""
    )}
  </article>
)

export default MeetupEventCard
