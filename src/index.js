import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import DataContextProvider from "./store/data-context";
import { Provider } from "react-redux";
import store from "./redux-store";

ReactDOM.render(
  <Provider store={store}>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </Provider>,
  document.getElementById("root")
);
