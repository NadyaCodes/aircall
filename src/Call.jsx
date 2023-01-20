import React, { useState } from "react";
import CallDetails from "./CallDetails.jsx";
import Loading from "./Loading.jsx";
import {
  formatUnknown,
  formatTime,
  phoneIcon,
  toggleDetails,
} from "./helpers.js";

import { FiArchive, FiMoreHorizontal, FiMinus } from "react-icons/fi";
import { RiInboxUnarchiveFill } from "react-icons/ri";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Call(props) {
  const [loading, setLoading] = useState("not-loading");
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
            toast.error(
              "Error re-setting archive status - please try again or contact Help@WhatShouldIDo.com"
            );
          } else {
            const newActivities = [...activities];
            const index = newActivities.indexOf(callInfo);
            newActivities[index].is_archived = true;
            setActivities(newActivities);
          }
        })
        .catch((err) => {
          toast.error(
            "Error re-setting archive status - please try again or contact Help@WhatShouldIDo.com"
          );
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
            toast.error(
              "Error re-setting archive status - please try again or contact Help@WhatShouldIDo.com"
            );
          } else {
            const newActivities = [...activities];
            const index = newActivities.indexOf(callInfo);
            newActivities[index].is_archived = false;
            setActivities(newActivities);
          }
        })
        .catch((err) => {
          toast.error(
            "Error re-setting archive status - please try again or contact Help@WhatShouldIDo.com"
          );
          setLoading(false);
        });
    }
  };

  const timeObj = formatTime(duration);

  return (
    <li key={id}>
      <ToastContainer autoClose={4000} />
      <div className={`call ${direction} ${loading}`}>
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
              <button
                onClick={() => toggleDetails(showDetails, setShowDetails)}
              >
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
