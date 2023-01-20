import React from "react";

export default function CallDetails(props) {
  const {
    id,
    direction,
    from,
    to,
    via,
    archived,
    call_type,
    dateTime,
    length,
    formatUnknown,
  } = props;

  return (
    <div className="call-details">
      <h2>Call Details</h2>
      <hr />
      <ul>
        <li>
          <span className="list-header">Date</span>
          {dateTime.toLocaleDateString()}
        </li>
        <li className="alternate-li">
          <span className="list-header">Time</span>
          {dateTime.toLocaleTimeString()}
        </li>
        <li>
          <span className="list-header">Direction</span>
          {formatUnknown(direction)}
        </li>
        <li className="alternate-li">
          <span className="list-header">From</span>
          {formatUnknown(from)}
        </li>
        <li>
          <span className="list-header">To</span>
          {formatUnknown(to)}
        </li>
        <li className="alternate-li">
          <span className="list-header">Aircall Number</span>
          {via}
        </li>
        <li>
          <span className="list-header">Duration</span>
          {length.hours}h {length.minutes}m {length.seconds}s
        </li>
        <li className="alternate-li">
          <span className="list-header">Archived Status </span>
          {archived}
        </li>
        <li>
          <span className="list-header">Call Type</span>
          {formatUnknown(call_type)}
        </li>
        <li className="alternate-li">
          <span className="list-header">Id</span>
          {id}
        </li>
      </ul>
    </div>
  );
}
