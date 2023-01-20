import React, { useState, useEffect } from "react";
import Call from "./Call.jsx";
import Loading from "./Loading.jsx";
import Menu from "./Menu.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CallList() {
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("Active");

  const Url =
    "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/";

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      fetch(Url + "activities")
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setAllActivities([...data.reverse()]);
        })
        .catch((err) => {
          toast.error(
            "Error - please try again or contact Help@WhatShouldIDo.com"
          );
          setLoading(false);
        });
    };

    fetchActivities();
  }, []);

  const makeActivityList = (activitiesArray, archivedStatus) => {
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
              activities={allActivities}
              setActivities={setAllActivities}
              key={activity.id}
              Url={Url}
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
                activities={allActivities}
                setActivities={setAllActivities}
                key={activity.id}
                Url={Url}
              />
            </React.Fragment>
          );
        }
      }
    });
  };

  const allArchived = makeActivityList(allActivities, true);
  const allActives = makeActivityList(allActivities, false);

  return (
    <div className="container-view">
      <ToastContainer autoClose={4000} />

      {loading === true ? (
        <Loading size="large" />
      ) : (
        <div>
          <Menu setView={setView} view={view} />
          {view === "Active" ? <ul>{allActives}</ul> : <ul>{allArchived}</ul>}
        </div>
      )}
    </div>
  );
}
