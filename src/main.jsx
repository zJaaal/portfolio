import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Portfolio from "./Portfolio";
import AppContextProvider from "./store/AppContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <Portfolio />
  </AppContextProvider>
);
