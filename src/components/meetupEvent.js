import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"
import moment from "moment"

import "./meetupEvent.css"

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

const MeetupEvent = ({ event, index }) => (
  <article key={index} class="card">
    <img src={event.photo_url} />
    <h3>
      <a href={event.event_url}>{event.name}</a>
    </h3>
    <h4>{formatDate(event.time)}</h4>
    <div dangerouslySetInnerHTML={{ __html: event.description }} />
  </article>
)

export default MeetupEvent
