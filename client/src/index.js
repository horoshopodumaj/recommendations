import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

const body = document.querySelector("body");
OverlayScrollbars(body, {
    resize: "none",
    scrollbars: {
        visibility: "auto",
        autoHide: "move",
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
