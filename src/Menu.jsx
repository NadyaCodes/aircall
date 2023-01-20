import React, { useEffect } from "react";

export default function Menu(props) {
  const { setView, view } = props;

  return (
    <div className="menu">
      <div className="menu-items">
        <div
          onClick={() => setView("Active")}
          className={
            view === "Active" ? "selected menu-item" : "unselected menu-item"
          }
        >
          Active
        </div>
        <div
          onClick={() => setView("Archived")}
          className={
            view === "Archived" ? "selected menu-item" : "unselected menu-item"
          }
        >
          Archived
        </div>
      </div>
      <hr />
    </div>
  );
}
