import React, { useState, useEffect } from "react";
import Call from "./Call.jsx";

export default function CallList() {
  const [allActivities, setAllActivities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const Url =
    "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/";

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      fetch(Url + "activities")
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setAllActivities([...data]);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    fetchActivities();
  }, []);

  let date;
  let dateTime;
  const allActivitiesList = allActivities.map((activity) => {
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
  });

  const allActiveActivitiesList = allActivities.map((activity) => {
    if (activity.is_archived === false) {
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

  const allArchivedActiviesList = allActivities.map((activity) => {
    if (activity.is_archived === true) {
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

  return (
    <div className="container-view">
      {loading === true && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <h2>All Calls</h2>
      <ul>{allActivitiesList}</ul>
      <h2>All Active</h2>
      <ul>{allActiveActivitiesList}</ul>
      <h2>All Archived</h2>
      <ul>{allArchivedActiviesList}</ul>
    </div>
  );
}
