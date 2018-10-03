import React from "react";
import ReactDOM from "react-dom";
import "./styles/global/fonts.css";
import "./styles/global/bootstrap.css";
import "./styles/global/iconsmind.css";
import "./styles/global/stack-interface.css";
import "./styles/global/theme-aqua.css";
import "./styles/global/custom.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
