import React from "react";
import ReactDOM from "react-dom";
import "./styles/global/fonts.css";
import "./styles/global/bootstrap.css";
import "./styles/global/iconsmind.css";
import "./styles/global/stack-interface.css";
import "./styles/global/theme-aqua.css";
import "./styles/global/custom.css";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App.jsx";
import rootReducer from "./redux/rootReducer";
import runSagas from "./redux/sagas";
import ElphUtils from "./utils/ElphUtils";

if (!ElphUtils.isDev()) {
  const noop = () => {};
  console.log = noop;
  console.info = noop;
  console.error = noop;
  console.warn = noop;
}

// Setup Redux store and sagas.
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    /**
     * Conditionally add the Redux DevTools extension enhancer
     * if it is installed.
     */
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

runSagas(sagaMiddleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
