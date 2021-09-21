import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPeerConnection } from 'components/utils/webRTC/webRTCHandler';
// import { createPeerConnection } from "components/utils/webRTC/webRTCHandler";
import devicesSlice from 'store/reducers/devicesSlice';
import streamSlice from 'store/reducers/streamSlice';
import { Constrains, saveDevicesInfo } from '../api/webRTC_API';

export const getMyStream = createAsyncThunk(
  'stream/get',
  async (data, thunkAPI) => {
    const myOriginStream: MediaStream =
      await navigator.mediaDevices.getUserMedia(Constrains);

    // 처음 스트림 불러오고 특정이슈때문에 비디오태그에 소스로 붙여지기 전 audio는 꺼진상태로 둔다
    await myOriginStream.getAudioTracks().forEach((track: any) => {
      track.enabled = false;
    });

    // 현재 사용되고있는 camera관련 current information을 저장하는 작업
    myOriginStream.getVideoTracks().forEach(async (track: any) => {
      saveDevicesInfo({
        track,
        getSelectedDeviceLabelActionFuncWithRedux:
          devicesSlice.actions.getSelectedVideoDeviceLabel,
        deviceKind: 'videoinput',
        getSelectedDeviceIdActionFuncWithRedux:
          devicesSlice.actions.getSelectedVideoDeviceId,
        thunkAPI,
      });
    });
    // -------- end of 접속한 사용자의 영상을 받아와서 stream에 넣어두고 제어함 --------

    // -------- 현재 사용되고있는 audio input관련 current information을 저장하는 작업 --------
    myOriginStream.getAudioTracks().forEach(async (track: any) => {
      saveDevicesInfo({
        track,
        getSelectedDeviceLabelActionFuncWithRedux:
          devicesSlice.actions.getSelectedAudioDeviceLabel,
        deviceKind: 'audioinput',
        getSelectedDeviceIdActionFuncWithRedux:
          devicesSlice.actions.getSelectedAudioDeviceId,
        thunkAPI,
      });
    });

    // redux를 통해 캐싱하고 그걸 기반으로 내 stream이 제어되기 때문에
    // 해당 stream저장소에 저장
    // await thunkAPI.dispatch(streamSlice.actions.setMyStream(myOriginStream));
    createPeerConnection(myOriginStream);

    return myOriginStream;
  }
);
