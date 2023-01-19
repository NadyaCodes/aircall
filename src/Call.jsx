import React, { useState } from "react";
import {
  FiPhoneMissed,
  FiPhoneIncoming,
  FiPhoneOutgoing,
  FiPhone,
  FiMic,
  FiArchive,
  FiRotateCcw,
} from "react-icons/fi";

export default function Call(props) {
  const [loading, setLoading] = useState("not-loading");
  const [error, setError] = useState(false);

  const { callInfo, activities, setActivities, Url, dateTime } = props;
  const { id, direction, from, to, via, duration, is_archived, call_type } =
    callInfo;

  // const archived = is_archived === true ? "archived" : "active";

  const archive = async (id) => {
    setLoading("loading");
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
          setLoading("not-loading");
          if (!response.ok) {
            setError(
              "Error: " +
                response.status +
                " There was an error - please try again. Issue is with call id " +
                id
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
          setLoading("not-loading");
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
                " There was an error - please try again. Issue is with call id " +
                id
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

  const formatTime = (time) => {
    let hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    return { hours, minutes, seconds };
  };

  const timeObj = formatTime(duration);
  const callClass = `call ${direction} ${loading}`;

  const phoneIcon = (call) => {
    switch (call.call_type) {
      case "missed":
        return <FiPhoneMissed />;
      case "answered":
        if (call.direction === "inbound") {
          return <FiPhoneIncoming />;
        }
        if (call.direction === "outbound") {
          return <FiPhoneOutgoing />;
        } else return <FiPhone />;
      case "voicemail":
        return <FiMic />;
      default:
        return <FiPhone />;
    }
  };

  return (
    <li key={id}>
      {loading === true && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className={callClass}>
        <div className="call-type">{phoneIcon(callInfo)}</div>
        <div className="call-to-from">
          <div className="primary-direction">
            {direction === "inbound" ? "From: " + from : "To: " + to}
          </div>
          <div className="secondary-direction">
            {direction === "inbound" ? "To: " + to : "From: " + from}
          </div>
        </div>
        <div className="call-times">
          <div>{dateTime.toLocaleTimeString()}</div>
          <div>
            {timeObj.hours > 0 && timeObj.hours + "h "}
            {timeObj.minutes > 0 && timeObj.minutes + "m "}
            {timeObj.seconds > 0 ? timeObj.seconds : 0}s
          </div>
        </div>
        <button onClick={() => archive(id)}>
          {is_archived === true ? <FiRotateCcw /> : <FiArchive />}
        </button>
      </div>
      {/* <div>Id: {id}</div> */}
      {/* <div>Date: {dateTime.toLocaleDateString()}</div> */}
      {/* <div>Time: {dateTime.toLocaleTimeString()}</div> */}
      {/* <div>
        Direction:{" "}
        {direction === "direction-unknown" ? "Direction Unknown" : direction}
      </div>
      <div> From: {from === "caller-unknown" ? "Caller Unknown" : from}</div>
      <div>To: {to === "caller-unknown" ? "Caller Unknown" : to}</div>
      <div>Aircall Number: {via}</div> */}
      {/* <div>
        Duration: {timeObj.hours} hours; {timeObj.minutes} minutes;{" "}
        {timeObj.seconds} seconds
      </div> */}
      {/* <div>Status: {archived}</div> */}
      {/* <div>Type: {call_type}</div> */}

      <br />
      <br />
    </li>
  );
}
