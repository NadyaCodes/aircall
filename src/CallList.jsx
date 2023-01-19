import React, { useState, useEffect } from "react";
import Call from "./Call.jsx";

export default function CallList() {
  const [activities, setActivities] = useState([]);
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
          setActivities([...data]);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    fetchActivities();
  }, []);

  const activitiesList = activities.map((activity) => {
    return (
      <Call
        callInfo={activity}
        activities={activities}
        setActivities={setActivities}
        key={activity.id}
        Url={Url}
      />
    );
  });

  return (
    <div className="container-view">
      {loading === true && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <ul>{activitiesList}</ul>
    </div>
  );
}
