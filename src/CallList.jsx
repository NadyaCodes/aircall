import React, { useState, useEffect } from "react";
import Call from "./Call.jsx";

export default function CallList() {
  const [allActivities, setAllActivities] = useState([]);
  const [error, setError] = useState("");
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
          setError(err);
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
  const allActive = makeActivityList(allActivities, false);

  return (
    <div className="container-view">
      <button
        onClick={() => setView("Active")}
        className={view === "Active" ? "selected" : ""}
      >
        Active
      </button>
      <button
        onClick={() => setView("Archived")}
        className={view === "Archived" ? "selected" : ""}
      >
        Archived
      </button>
      {loading === true && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {view === "Active" ? <ul>{allActive}</ul> : <ul>{allArchived}</ul>}
    </div>
  );
}
