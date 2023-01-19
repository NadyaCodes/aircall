import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import Header from "./Header.jsx";
import regeneratorRuntime from "regenerator-runtime";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState("");
  const [error, setError] = useState("");

  const Url =
    "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/";

  useEffect(() => {
    const fetchActivities = async () => {
      fetch(Url + "activities")
        .then((response) => response.json())
        .then((data) => {
          setActivities([...data]);
        })
        .catch((err) => setError(err));
    };

    fetchActivities();
  }, [activities]);

  const archive = async (id) => {
    const activity = activities.find((activity) => activity.id === id);
    if (activity.is_archived === false) {
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
          if (!response.ok) {
            setError(
              "Error: " +
                response.status +
                " There was an error - please try again"
            );
          } else {
            const newActivities = [...activities];
            const index = newActivities.indexOf(activity);
            newActivities[index].is_archived = true;
            setActivities(newActivities);
          }
        })
        .catch((err) => {
          setError(err);
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
          if (!response.ok) {
            setError(
              "Error: " +
                response.status +
                " There was an error - please try again"
            );
          } else {
            const newActivities = [...activities];
            const index = newActivities.indexOf(activity);
            newActivities[index].is_archived = false;
            setActivities(newActivities);
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const activitiesList = activities.map((activity) => {
    const {
      id,
      created_at,
      direction,
      from,
      to,
      via,
      duration,
      is_archived,
      call_type,
    } = activity;

    const dateTime = new Date(created_at);

    const archived = is_archived === true ? "archived" : "active";

    return (
      <li key={id}>
        <div>Id: {id}</div>
        <div>Date: {dateTime.toLocaleDateString()}</div>
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
  });

  return (
    <div className="container">
      <Header />
      {error && <div>{error}</div>}
      <div className="container-view">
        <ul>{activitiesList}</ul>
      </div>
    </div>
  );
};

// ReactDOM.render(<App />, document.getElementById("app"));

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
export default App;
