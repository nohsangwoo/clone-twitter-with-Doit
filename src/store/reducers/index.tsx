import { combineReducers } from "redux";
import streamSlice from "./streamSlice";
import devicesSlice from "./devicesSlice";
import toggleSlice from "./toggleSlice";
import toggleselectSlice from "./toggleselectSlice";
import socketSlice from "./socketSlice";
import counterSlice from "./counterSlice";
import someOtherSlice from "./someOtherSlice";
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
  somesome: someOtherSlice.reducer
  // posts: postSlice.reducer
  // sagaCounter
});

// export function* rootSaga() {
//   yield all([counterSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
// }

export default rootReducer;
