import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { IconContext } from "react-icons";

import Header from "./Header.jsx";
import CallList from "./CallList.jsx";
import regeneratorRuntime from "regenerator-runtime";

const App = () => {
  return (
    <div className="container">
      <IconContext.Provider value={{ className: "react-icons" }}>
        <Header />
        <CallList />
      </IconContext.Provider>
    </div>
  );
};

// ReactDOM.render(<App />, document.getElementById("app"));

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
export default App;
