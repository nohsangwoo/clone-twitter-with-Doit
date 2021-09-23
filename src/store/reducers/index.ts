import { combineReducers } from "redux";
import streamSlice from "./streamSlice";
import devicesSlice from "./devicesSlice";
import toggleSlice from "./toggleSlice";
import toggleselectSlice from "./toggleselectSlice";
import socketSlice from "./socketSlice";
import counterSlice from "./counterSlice";
import someOtherSlice from "./someOtherSlice";
import userSlice from "./userSlice";
import firebaseSlice from "./firebaseSlice";
// import postSlice from "./postSlice";
// import { all } from "redux-saga/effects";
// import sagaCounter, { counterSaga } from "./sagacounter";

const rootReducer = combineReducers({
  streams: streamSlice.reducer,
  devices: devicesSlice.reducer,
  toggles: toggleSlice.reducer,
  toggleselect: toggleselectSlice.reducer,
  socket: socketSlice.reducer,
  counter: counterSlice.reducer,
  somesome: someOtherSlice.reducer,
  users: userSlice.reducer,
  firebase: firebaseSlice.reducer
});

export default rootReducer;
