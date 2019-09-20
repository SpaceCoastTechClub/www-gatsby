import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"
import moment from "moment"

import "./meetupEventTable.css"

function formatDate(date) {
  return (
    moment(date)
      .local(true)
      .format("ddd, MMM D h:mm a")
  )
}


const MeetupEventTable = ({ events }) => (
  <table>
    {
      events.map((event) => (
        <tr key={event.id}>
          <td>{event.node.group.name}</td>
          <td>
            <a href={event.node.event_url}>{event.node.name}</a>
          </td>
          <td>
            {formatDate(event.node.time)}<br />
            <small>{event.node.series.description}</small>
          </td>
        </tr>
      ))}
  </table>
)

export default MeetupEventTable
