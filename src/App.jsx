import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import Header from "./Header.jsx";
import CallList from "./CallList.jsx";
import regeneratorRuntime from "regenerator-runtime";

const App = () => {
  return (
    <div className="container">
      <Header />
      <CallList />
    </div>
  );
};

// ReactDOM.render(<App />, document.getElementById("app"));

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
export default App;
