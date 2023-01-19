import React, { useState } from "react";

export default function Call(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { callInfo, activities, setActivities, Url, dateTime } = props;
  const { id, direction, from, to, via, duration, is_archived, call_type } =
    callInfo;

  const archived = is_archived === true ? "archived" : "active";

  const archive = async (id) => {
    setLoading(true);
    if (is_archived === false) {
      fetch(Url + `activities/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          is_archived: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          setLoading(false);
          if (!response.ok) {
            setError(
              "Error: " +
                response.status +
                " There was an error - please try again"
            );
          } else {
            const newActivities = [...activities];
            const index = newActivities.indexOf(callInfo);
            newActivities[index].is_archived = true;
            setActivities(newActivities);
          }
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      fetch(Url + `activities/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          is_archived: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          setLoading(false);
          if (!response.ok) {
            setError(
              "Error: " +
                response.status +
                " There was an error - please try again"
            );
          } else {
            const newActivities = [...activities];
            const index = newActivities.indexOf(callInfo);
            newActivities[index].is_archived = false;
            setActivities(newActivities);
          }
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  };
  return (
    <li key={id}>
      {loading === true && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {/* <div>Id: {id}</div> */}
      {/* <div>Date: {dateTime.toLocaleDateString()}</div> */}
      <div>Time: {dateTime.toLocaleTimeString()}</div>
      <div>Direction: {direction}</div>
      <div> From: {from}</div>
      <div>To: {to}</div>
      <div>Aircall Number: {via}</div>
      <div>Duration: {duration} seconds</div>
      <div>Status: {archived}</div>
      <div>Type: {call_type}</div>
      <button onClick={() => archive(id)}>Archive</button>
      <br />
      <br />
    </li>
  );
}
