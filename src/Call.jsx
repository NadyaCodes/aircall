import React, { useState } from "react";
import {
  FiPhoneMissed,
  FiPhoneIncoming,
  FiPhoneOutgoing,
  FiPhone,
  FiMic,
  FiArchive,
  FiRotateCcw,
  FiMoreHorizontal,
  FiMinus,
  FiRotateCw,
} from "react-icons/fi";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import CallDetails from "./CallDetails.jsx";
import Loading from "./Loading.jsx";

export default function Call(props) {
  const [loading, setLoading] = useState("not-loading");
  const [error, setError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const { callInfo, activities, setActivities, Url, dateTime } = props;
  const { id, direction, from, to, via, duration, is_archived, call_type } =
    callInfo;

  const archived = is_archived === true ? "archived" : "active";

  const archive = async (id) => {
    setLoading("loading-block");
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

  const toggleDetails = () => {
    if (showDetails === false) {
      return setShowDetails(true);
    }
    return setShowDetails(false);
  };

  const formatUnknown = (info) => {
    if (typeof info === "string" && info.toLowerCase().includes("unknown")) {
      return "Unknown";
    }
    return info;
  };

  const callClass = `call ${direction} ${loading}`;
  return (
    <li key={id}>
      {error && <div>{error}</div>}

      <div className={callClass}>
        {loading === "loading-block" ? (
          <Loading size="small" />
        ) : (
          <div className="call-container">
            <div className="call-type">{phoneIcon(callInfo)}</div>
            <div className="call-to-from">
              <div className="primary-direction">
                {direction === "inbound"
                  ? "From: " + formatUnknown(from)
                  : "To: " + formatUnknown(to)}
              </div>
              <div className="secondary-direction">
                {direction === "inbound"
                  ? "To: " + formatUnknown(to)
                  : "From: " + formatUnknown(from)}
              </div>
            </div>
            <div className="call-time">
              <div className="time">{dateTime.toLocaleTimeString()}</div>
              <div>
                {timeObj.hours > 0 && timeObj.hours + "h "}
                {timeObj.minutes > 0 && timeObj.minutes + "m "}
                {timeObj.seconds > 0 ? timeObj.seconds : 0}s
              </div>
            </div>
            <div>
              <button onClick={() => archive(id)}>
                {is_archived === true ? (
                  <RiInboxUnarchiveFill />
                ) : (
                  <FiArchive />
                )}
              </button>
              <button onClick={() => toggleDetails()}>
                {showDetails === true ? <FiMinus /> : <FiMoreHorizontal />}
              </button>
            </div>
          </div>
        )}
      </div>
      {showDetails === true && (
        <CallDetails
          id={id}
          direction={direction}
          from={from}
          to={to}
          via={via}
          archived={archived}
          call_type={call_type}
          length={timeObj}
          dateTime={dateTime}
          formatUnknown={formatUnknown}
        />
      )}
    </li>
  );
}
