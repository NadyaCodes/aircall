import React, { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import Menu from "./Menu.jsx";
import { makeActivityList } from "./helpers.js";
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

  const allArchived = makeActivityList(
    allActivities,
    true,
    setAllActivities,
    Url
  );

  const allActives = makeActivityList(
    allActivities,
    false,
    setAllActivities,
    Url
  );

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
