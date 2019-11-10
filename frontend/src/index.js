import ReactDOM from "react-dom";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import HomePage from "./homepage/HomePage";
import React from "react";

ReactDOM.render(
  <ErrorBoundary>
    <HomePage />
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
