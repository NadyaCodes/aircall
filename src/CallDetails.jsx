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
      <h2>Details</h2>
      <div>Id: {id}</div>
      <div>Date: {dateTime.toLocaleDateString()}</div>
      <div>Time: {dateTime.toLocaleTimeString()}</div>
      <div>Direction: {formatUnknown(direction)}</div>
      <div> From: {formatUnknown(from)}</div>
      <div>To: {formatUnknown(to)}</div>
      <div>Aircall Number: {via}</div>
      <div>
        Duration: {length.hours}h {length.minutes}m {length.seconds}s
      </div>
      <div>Archived Status: {archived}</div>
      <div>Call Type: {call_type}</div>
    </div>
  );
}
