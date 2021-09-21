import socketSlice from "store/reducers/socketSlice";
import reduxStore from "store/store";
import devicesSlice from "store/reducers/devicesSlice";
import streamSlice from "store/reducers/streamSlice";
import * as wss from "../wssConnection/wssConnection";
import toggleSlice from "store/reducers/toggleSlice";

// peer간 연결을 위한 전용 통로를 생성하는 과정
// 해당 통로는 myPeerConnection라는 변수에 담아서 설정등을 제어함
export const createPeerConnection = (myOriginStream: MediaStream) => {
  const myStream = myOriginStream;

  // 구글에서 제공하는 무료 stun 서버를 사용해서 접속 정보를 서로에게 전달할수있게 해줌

  let getMyPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302"
        ]
      }
    ]
  });

  reduxStore.dispatch(
    socketSlice.actions.setMyPeerConnection(getMyPeerConnection)
  );

  const myPeerConnection = reduxStore.getState().socket.myPeerConnection;

  if (myStream instanceof MediaStream) {
    myStream
      .getTracks()
      .forEach((track: MediaStreamTrack) =>
        myPeerConnection?.addTrack(track, myStream)
      );
  }

  // iceCandidate 전송
  // iceCandidate 보내기 / peer A가 먼저 peer B에게 보내야함
  if (myPeerConnection) {
    myPeerConnection.onicecandidate = (event: any) => {
      console.log("sendIceCandidate activate");
      wss.handleIce(event);
    };
    // iceCandidate 교환이 끝나면 그다음 addStream으로 상대방의 스트림을 내화면에 렌더링하는 과정을 거쳐 마무리한다.
    myPeerConnection.addEventListener("track", wss.handleAddStream);
  }
};

// -------- videoInput Device 변경하고 myStream 교체 --------
export const videoInputDeviceSwitching = async (
  switchingDeviceLabel: string
) => {
  const videoDevices = reduxStore.getState().devices.videoDevices;
  const selectedAudioDeviceId =
    reduxStore.getState().devices.selectedAudioDeviceId;
  const myPeerConnection = reduxStore.getState().socket.myPeerConnection;

  const myStream = reduxStore.getState().streams.myStream;
  let getVideoDeviceId;
  // 안전장치: 변경전 기존 스트림 정지
  if (myStream instanceof MediaStream) {
    myStream.getVideoTracks()[0].stop();
    myStream.getAudioTracks()[0].stop();
  }

  let findSpecificVideoDeviceId: MediaDeviceInfo[];
  if (Array.isArray(videoDevices)) {
    // 카메라 목록중에 변경하려는 카메라 장치label과 같은 값이 존재하면 해당 정보를 저장
    findSpecificVideoDeviceId = videoDevices.filter((videoDevice: any) => {
      return videoDevice.label === switchingDeviceLabel;
    });
    // 변경하려는 비디오 장치 객체에서 아이디(diveceId라는 키값) 뽑아오기
    if (findSpecificVideoDeviceId[0]?.deviceId) {
      getVideoDeviceId = findSpecificVideoDeviceId[0].deviceId;
    }
  }

  // 뽑아온 비디오 출력장치 아이디 업데이트
  reduxStore.dispatch(
    devicesSlice.actions.getSelectedVideoDeviceId(getVideoDeviceId)
  );
  // 교체할 newMyStream에 적용될 constraints

  const getCameraConstraints = (
    selectedAudioDeviceId: any,
    getVideoDeviceId: any
  ) => {
    let result;
    if (
      typeof selectedAudioDeviceId === "string" &&
      typeof getVideoDeviceId === "string"
    ) {
      result = {
        // 기존 오디오 입력장치를 기억함
        audio: { deviceId: { exact: selectedAudioDeviceId } },
        video: { deviceId: { exact: getVideoDeviceId } }
      };
    }
    return result;
  };

  let cameraConstraints = getCameraConstraints(
    selectedAudioDeviceId,
    getVideoDeviceId
  );

  // 교체된 카메라 장치 아이디를 기준으로 대체할 스트림을 생성
  const newMyStream: MediaStream = await navigator.mediaDevices.getUserMedia(
    cameraConstraints
  );

  if (myPeerConnection) {
    const videoTrack = newMyStream.getVideoTracks()[0];
    const audioTrack = newMyStream.getAudioTracks()[0];

    const videoSender = myPeerConnection
      .getSenders()
      .find((sender: any) => sender.track.kind === "video");
    const audioSender = myPeerConnection
      .getSenders()
      .find((sender: any) => sender.track.kind === "audio");
    if (videoTrack) {
      videoSender?.replaceTrack(videoTrack);
    }
    if (audioTrack) {
      audioSender?.replaceTrack(audioTrack);
    }
  }
  // 기존 스트림을 새 스트림으로 교체
  reduxStore.dispatch(streamSlice.actions.setMyStream(newMyStream));
};
// -------- end of videoInput Device 변경하고 myStream 교체 --------

export const audioInputDeviceSwitching = async (
  switchingDeviceLabel: string
) => {
  const audioDevices = reduxStore.getState().devices.audioDevices;
  const selectedVideoDeviceId =
    reduxStore.getState().devices.selectedVideoDeviceId;

  const myStream = reduxStore.getState().streams.myStream;

  const myPeerConnection = reduxStore.getState().socket.myPeerConnection;
  let getAudioDeviceId;
  // 안전장치: 변경전 기존 스트림 정지
  if (myStream instanceof MediaStream) {
    myStream.getVideoTracks()[0].stop();
    myStream.getAudioTracks()[0].stop();
  }

  if (Array.isArray(audioDevices)) {
    const findSpecificAudioDeviceId = audioDevices.filter(
      (audioDevice: any) => {
        return audioDevice.label === switchingDeviceLabel;
      }
    );
    // 변경하려는 audio input device 장치객체에서 deviceId키의 밸류 가져오기
    if (findSpecificAudioDeviceId[0]?.deviceId) {
      getAudioDeviceId = findSpecificAudioDeviceId[0].deviceId;
    }
  }

  // 변경하려는 audioinput DeviceId 업데이트
  reduxStore.dispatch(
    devicesSlice.actions.getSelectedAudioDeviceId(getAudioDeviceId)
  );

  const getAudioConstraints = (
    selectedAudioDeviceId: any,
    getVideoDeviceId: any
  ) => {
    let result;
    if (
      typeof selectedAudioDeviceId === "string" &&
      typeof getVideoDeviceId === "string"
    ) {
      result = {
        // 기존 오디오 입력장치를 기억함
        audio: { deviceId: { exact: selectedAudioDeviceId } },
        video: { deviceId: { exact: getVideoDeviceId } }
      };
    }
    return result;
  };

  const audioConstraints = getAudioConstraints(
    getAudioDeviceId,
    selectedVideoDeviceId
  );
  // 대체할 스트림을 뽑아옴
  const newMyStream: MediaStream = await navigator.mediaDevices.getUserMedia(
    audioConstraints
  );

  if (myPeerConnection) {
    const videoTrack = newMyStream.getVideoTracks()[0];
    const audioTrack = newMyStream.getAudioTracks()[0];

    const videoSender = myPeerConnection
      .getSenders()
      .find((sender: any) => sender.track.kind === "video");
    const audioSender = myPeerConnection
      .getSenders()
      .find((sender: any) => sender.track.kind === "audio");

    videoSender?.replaceTrack(videoTrack);
    audioSender?.replaceTrack(audioTrack);
  }

  reduxStore.dispatch(streamSlice.actions.setMyStream(newMyStream));
};

export const createOffer = async () => {
  const myPeerConnection = reduxStore.getState().socket.myPeerConnection;

  let offer;
  // peerA는 offer를 생성한다.
  if (myPeerConnection) {
    offer = await myPeerConnection?.createOffer();
  }

  // PeerA는 Peer B로 offer정보를 백엔드로 전달하기위한 준비를 한다.
  if (offer) {
    await myPeerConnection?.setLocalDescription(offer);
    console.log("sent the offer", offer);
    wss.sendOffer(offer);
    // Peer B로 offer를 보내기위해 socketIo를 이용한다.
  }
};

export const createAnswer = async (offer: any) => {
  const myPeerConnection = reduxStore.getState().socket.myPeerConnection;

  if (myPeerConnection) {
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    wss.sendWebRTCAnswer(answer);
  }
};

export const setRemoteDescriptionAnswerAfterGetAbswer = (answer: any) => {
  const myPeerConnection = reduxStore.getState().socket.myPeerConnection;
  console.log("setRemoteDescriptionAnswerAfterGetAbswer");
  if (myPeerConnection) {
    myPeerConnection.setRemoteDescription(answer);
  }
};

// iceCandidate 받고 세팅하기 처음엔 peer B가 먼저 candidate를 받고
// 그다음 다시 peer A에게 candidate를 보내준다.(sendIceCandidate실행)
export const setAddIceCandidate = (ice: any) => {
  const myPeerConnection = reduxStore.getState().socket.myPeerConnection;
  console.log("setAddIceCandidate");
  if (myPeerConnection) {
    myPeerConnection.addIceCandidate(ice);
  }
};

// 연결끊기 실제 동작
export const leaveGroupCall = () => {
  const roomHostInfo = reduxStore.getState().socket.roomHostInfo;
  const socketId = reduxStore.getState().socket.socket.id;

  console.log("roomHostInfo in leaveGuestGroupCall", roomHostInfo);

  const data = {
    leftUserSocketId: socketId,
    roomHostInfo: roomHostInfo
  };

  wss.userLeftGroupCall(data);
  // if (groupCallHost) {
  //   wss.groupCallclosedByHost({
  //     peerId: myPeerId,
  //   });
  // } else {
  //   wss.userLeftGroupCall({
  //     streamId: store.getState().call.localStream.id,
  //     roomId: groupCallRoomId,
  //   });
  // }
  // wss.userLeftGroupCall({
  //   streamId: store.getState().call.localStream.id,
  //   roomId: groupCallRoomId,
  // });
  const otherStream = reduxStore.getState().streams.otherStream;
  console.log("otherStream in webRTCHandler", otherStream);
  reduxStore.dispatch(streamSlice.actions.resetOtherStream());
  clearGroupData();
};

export const leaveUserGroupCallAlert = () => {
  clearGroupData();
};

// 통화 연결과 관련된 데이터 초기화 해야함
export const clearGroupData = () => {
  const myPeerConnection = reduxStore.getState().socket.myPeerConnection;
  // groupCallRoomId = null;
  // groupCallHost = null;
  // store.dispatch(clearGroupCallData());
  if (myPeerConnection) {
    myPeerConnection.close();
  }
  // connectWithMyPeer();
  reduxStore.dispatch(socketSlice.actions.resetData());

  const myStream = reduxStore.getState().streams.myStream;
  if (myStream) {
    createPeerConnection(myStream);
  }

  if (myStream instanceof MediaStream) {
    myStream.getVideoTracks()[0].enabled = true;
    myStream.getAudioTracks()[0].enabled = true;
  }

  // resetCallData();
};

export const resetCallData = () => {
  // connectedUserSocketId = null;
  // store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};

// 화면 공유 기능 시작
export const switchForScreenSharingStream = async () => {
  const isScreenSharingActive =
    reduxStore.getState().toggles.isScreenSharingActive;

  const myPeerConnection = reduxStore.getState().socket.myPeerConnection;
  if (!isScreenSharingActive) {
    try {
      const localStream = reduxStore.getState().streams.myStream;
      // 나중에 화면 공유를 껐을때 다시 불러오기 위한 용도로 기존 스트림을 리덕스에 저장해둠
      reduxStore.dispatch(streamSlice.actions.setLocalStream(localStream));

      let screenSharingStream: any;
      // @ts-ignore
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });

      reduxStore.dispatch(
        streamSlice.actions.setScreenSharingStreamStream(screenSharingStream)
      );

      const senders = myPeerConnection?.getSenders();

      // 교체할 sender 타겟 찾기
      const sender = senders?.find(
        (sender: any) =>
          sender.track.kind === screenSharingStream.getVideoTracks()[0].kind
      );

      // sender track 교체
      sender?.replaceTrack(screenSharingStream.getVideoTracks()[0]);

      // 내화면 변경
      reduxStore.dispatch(streamSlice.actions.setMyStream(screenSharingStream));

      console.log("screenSharingStream: ", screenSharingStream);
      reduxStore.dispatch(toggleSlice.actions.setIsScreenSharingActive(true));
    } catch (err) {
      console.error(
        "error occured when trying to get screen sharing stream",
        err
      );
    }
    // 화면 공유 중인경우 화면 공유를 끄는 기능
  } else {
    // 임시로 저장해둔 localStream을 불러온다.
    const localStream = reduxStore.getState().streams.localStream;

    // 화면 공유 기능 끄기
    const screenSharingStream =
      reduxStore.getState().streams.screenSharingStream;
    const senders = myPeerConnection?.getSenders();
    const sender = senders?.find(
      (sender: any) =>
        sender.track.kind === localStream?.getVideoTracks()[0].kind
    );
    if (localStream) {
      sender?.replaceTrack(localStream?.getVideoTracks()[0]);
    }
    // store.dispatch(setScreenSharingActive(false));
    // screenSharingStream 중지
    screenSharingStream?.getTracks().forEach(track => track.stop());

    // 내 화면 변경
    console.log("localStream in disconnect : ", localStream);

    reduxStore.dispatch(streamSlice.actions.setMyStream(localStream));
    reduxStore.dispatch(streamSlice.actions.setScreenSharingStreamStream(null));
    reduxStore.dispatch(toggleSlice.actions.setIsScreenSharingActive(false));
  }
};
