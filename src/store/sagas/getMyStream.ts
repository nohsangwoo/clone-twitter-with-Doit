import { all, fork, put, takeLatest } from "redux-saga/effects";
import devicesSlice from "store/reducers/devicesSlice";
import { Constrains } from "../api/webRTC_API";
import { createPeerConnection } from "components/utils/webRTC/webRTCHandler";
import streamSlice from "store/reducers/streamSlice";

// -------- 현재 사용되고있는 camera또는 audio input관련 current information을 저장하는 작업 --------
type saveDevicesInfoProps = {
  track: any;
  getSelectedDeviceLabelActionFuncWithRedux: any;
  deviceKind: string;
  getSelectedDeviceIdActionFuncWithRedux: any;
};

export const saveDevicesInfo = async ({
  track,
  getSelectedDeviceLabelActionFuncWithRedux,
  deviceKind,
  getSelectedDeviceIdActionFuncWithRedux
}: saveDevicesInfoProps): Promise<void> => {
  const getCurrentDeviceId = async (
    deviceKind: string,
    currentDeviceLabel: string
  ) => {
    let result;
    const devices = await navigator.mediaDevices.enumerateDevices();

    const getAllDevices = devices.filter(device => device.kind === deviceKind);

    const getSpecificDeviceInfo = getAllDevices.filter((device: any) => {
      return device.label === currentDeviceLabel;
    });

    getSpecificDeviceInfo.forEach((info: any) => {
      result = info.deviceId;
    });
    return result;
  };

  if (track?.label) {
    // video/audio input 관련 인덱싱을위한 장치 label을 리덕스 스토어에 저장
    put(getSelectedDeviceLabelActionFuncWithRedux(track.label));

    // 현재 연결된 모든 비디오출력/오디오입력 장치를 찾고 위에서 찾은 label을 기준으로
    // currend video/audio deviceId를 찾아서 저장하기위한 용도
    const currentDeviceId: string | undefined = await getCurrentDeviceId(
      deviceKind,
      track.label
    );

    // 리덕스 저장소에 current DeviceId를 저장하는 구간
    if (currentDeviceId) {
      put(getSelectedDeviceIdActionFuncWithRedux(currentDeviceId));
    }
  }
};
// -------- end of 현재 사용되고있는 camera또는 audio input관련 current information을 저장하는 작업 --------

function* watchGetMyStream() {
  yield takeLatest(streamSlice.actions.getMyStreamSagaTrigger, function* () {
    const myOriginStream: MediaStream =
      yield navigator.mediaDevices.getUserMedia(Constrains);

    console.log("get myStream!");

    // 처음 스트림 불러오고 특정이슈때문에 비디오태그에 소스로 붙여지기 전 audio는 꺼진상태로 둔다
    yield myOriginStream.getAudioTracks().forEach((track: any) => {
      track.enabled = false;
    });

    console.log("audio off!");

    // 현재 사용되고있는 camera관련 current information을 저장하는 작업
    yield myOriginStream.getVideoTracks().forEach(async (track: any) => {
      saveDevicesInfo({
        track,
        getSelectedDeviceLabelActionFuncWithRedux:
          devicesSlice.actions.getSelectedVideoDeviceLabel,
        deviceKind: "videoinput",
        getSelectedDeviceIdActionFuncWithRedux:
          devicesSlice.actions.getSelectedVideoDeviceId
      });
    });
    console.log("get current camera infomation!");
    // -------- end of 접속한 사용자의 영상을 받아와서 stream에 넣어두고 제어함 --------

    // -------- 현재 사용되고있는 audio input관련 current information을 저장하는 작업 --------
    yield myOriginStream.getAudioTracks().forEach(async (track: any) => {
      saveDevicesInfo({
        track,
        getSelectedDeviceLabelActionFuncWithRedux:
          devicesSlice.actions.getSelectedAudioDeviceLabel,
        deviceKind: "audioinput",
        getSelectedDeviceIdActionFuncWithRedux:
          devicesSlice.actions.getSelectedAudioDeviceId
      });
    });
    console.log("get current input audio infomation!");

    // redux를 통해 캐싱하고 그걸 기반으로 내 stream이 제어되기 때문에
    // 해당 stream저장소에 저장
    // await thunkAPI.dispatch(streamSlice.actions.setMyStream(myOriginStream));
    yield createPeerConnection(myOriginStream);
    console.log("createPeerConnection!!");

    yield put(streamSlice.actions.setMyStream(myOriginStream));
    console.log("save myOriginStream in redux");
  });
}

export function* getMyStreamSaga() {
  yield all([fork(watchGetMyStream)]);
}
