import { all, call } from "redux-saga/effects";
import { counterSaga } from "./sagaCounter";
import { initSaga } from "./sagaInit";

// saga를 모아주는 combineReducers같은 기능
export default function* rootSaga() {
  yield all([call(counterSaga), call(initSaga)]);
}
