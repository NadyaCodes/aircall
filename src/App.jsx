import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import regeneratorRuntime from "regenerator-runtime";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState("");

  const Url =
    "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/";

  useEffect(() => {
    const fetchActivities = async () => {
      fetch(Url + "activities")
        .then((response) => response.json())
        .then((data) => {
          setActivities([...data]);
        });
    };

    fetchActivities();
  }, []);

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
        <br />
      </li>
    );
  });

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <ul>{activitiesList}</ul>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
