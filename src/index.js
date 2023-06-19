import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import App from "./app/App";
import "./app/config/i18n";
import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_URL;
// axios.defaults.withCredentials = true;
ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
