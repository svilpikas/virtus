import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

import configureStore from "./App.store";
import {saveState} from "./utils/localStorage";

const appContainer = document.getElementById("root");

const store = configureStore(undefined);

store.subscribe(() => {
    saveState(store.getState())
});
// If the app container is present then render the app.
if (appContainer) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        appContainer
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
