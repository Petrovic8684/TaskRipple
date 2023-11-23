import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import modalsReducer from "./features/modals.js";
import boardsReducer from "./features/boards.js";
import currentReducer from "./features/current.js";

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    boards: boardsReducer,
    current: currentReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
