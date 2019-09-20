import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"
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
    {event.photo_url ? <img src={event.photo_url} /> : event.group.group_photo ? <img src={event.group.group_photo.highres_link} /> : ""}
    <h3>
      <a href={event.event_url}>{event.name}</a>
    </h3>
    <h4>{formatDate(event.time)}</h4>
    {showDescription ? <div dangerouslySetInnerHTML={{ __html: event.description }} /> : null}
  </article>
)

export default MeetupEventCard
