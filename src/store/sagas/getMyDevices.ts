import { all, fork, takeLatest } from "redux-saga/effects";

import { Constrains } from "../api/webRTC_API";

import streamSlice from "store/reducers/streamSlice";

function* watchGetMyDevices() {
  yield takeLatest(streamSlice.actions.getMyStreamSagaTrigger, function* () {
    const myOriginStream: MediaStream =
      yield navigator.mediaDevices.getUserMedia(Constrains);

    console.log("get myStream!");

    // 처음 스트림 불러오고 특정이슈때문에 비디오태그에 소스로 붙여지기 전 audio는 꺼진상태로 둔다
    yield myOriginStream.getAudioTracks().forEach((track: any) => {
      track.enabled = false;
    });

    console.log("audio off!");
  });
}

export function* getMyDevicesSaga() {
  yield all([fork(watchGetMyDevices)]);
}
