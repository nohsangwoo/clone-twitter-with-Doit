import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import firebase from './components/App';

import { Provider } from "react-redux";
import store from "./store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AOSINIT from "./components/utils/AOSINIT";
// console.log(firebase());
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AOSINIT>
          <App />
        </AOSINIT>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
