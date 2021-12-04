import "./index.css";
import {
  CounterType,
  counterReducer,
} from "./redux-counter/reducer/counterReducer";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { combineReducers, createStore } from "redux";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

export type RootState = {
  counter: CounterType;
};

const allReducers = combineReducers<RootState>({
  counter: counterReducer,
});

const store = createStore(allReducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
