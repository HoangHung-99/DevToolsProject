import React from "react";
import ReactDOM from "react-dom";

import RouteComponent from "./routing/RouteComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/js/bootstrap.js";


// import $ from 'jquery';


ReactDOM.render(
  <React.StrictMode>
      <RouteComponent />
  </React.StrictMode>,
  document.getElementById("root")
);
