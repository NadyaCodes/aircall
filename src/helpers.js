import React from "react";
import Call from "./Call.jsx";
import {
  FiPhoneMissed,
  FiPhoneIncoming,
  FiPhoneOutgoing,
  FiPhone,
  FiMic,
} from "react-icons/fi";

export function formatUnknown(info) {
  if (typeof info === "string" && info.toLowerCase().includes("unknown")) {
    return "Unknown";
  }
  return info;
}

export function formatTime(time) {
  let hours = Math.floor(time / 3600);
  time = time - hours * 3600;
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  return { hours, minutes, seconds };
}

export function phoneIcon(call) {
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
}

export function toggleDetails(details, settingFunc) {
  if (details === false) {
    return settingFunc(true);
  }
  return settingFunc(false);
}

export function makeActivityList(
  activitiesArray,
  archivedStatus,
  setAllArray,
  url
) {
  let date;
  let dateTime;
  return activitiesArray.map((activity) => {
    if (activity.is_archived === archivedStatus) {
      if (!activity.direction) {
        activity.direction = "direction-unknown";
      }

      if (!activity.to) {
        activity.to = "caller-unknown";
      }

      if (!activity.from) {
        activity.from = "caller-unknown";
      }

      if (!activity.call_type) {
        activity.call_type = "type-unknown";
      }

      if (!activity.via) {
        activity.via = "number-unknown";
      }
      dateTime = new Date(activity.created_at);
      if (dateTime.toDateString() === date) {
        return (
          <Call
            callInfo={activity}
            dateTime={dateTime}
            activities={activitiesArray}
            setActivities={setAllArray}
            key={activity.id}
            Url={url}
          />
        );
      } else {
        date = dateTime.toDateString();
        return (
          <React.Fragment key={date}>
            <div className="date">
              <hr />
              {date}
              <hr />
            </div>
            <Call
              callInfo={activity}
              dateTime={dateTime}
              activities={activitiesArray}
              setActivities={setAllArray}
              key={activity.id}
              Url={url}
            />
          </React.Fragment>
        );
      }
    }
  });
}
