import io from "socket.io-client";
import reduxStore from "../../../store/store";
import streamSlice from "store/reducers/streamSlice";
import * as webRTCHandler from "../webRTC/webRTCHandler";
import socketSlice from "store/reducers/socketSlice";
import counterSlice from "store/reducers/counterSlice";

const BACKEND_SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : process.env.REACT_APP_SERVICE_BACKEND;

// let socket: any;
export const connectWithWebSocket = () => {
  console.log("io?: ", BACKEND_SERVER_URL);
  // @ts-ignore
  if (typeof BACKEND_SERVER_URL === "string") {
    const newSocket = io(BACKEND_SERVER_URL);
    reduxStore.dispatch(socketSlice.actions.setSocket(newSocket));
  }

  const socket = reduxStore.getState().socket.socket;
  // webRTCHandler.createPeerConnection();

  socket.on("connection", () => {
    console.log("succesfully connected with wss server");
    console.log(socket.id);
  });

  socket.on("comeInNewUser", async (socketToRoom: any) => {
    // peer B에서 접속하면 peerA에서(접속한 사람이외의 나머지 사람)
    // welome트리거 가 건드려지고 이하 내용이 실행됨
    console.log("someone has join about : ", socketToRoom);

    // Peer B가 접속했다는 사실을 알게된 Peer A는
    // offer를 생성하고 peer B 로 전송한다
    // 방을 만든사람(고객)은 자신의 offer를 일단 admin에게 보내는데
    // 이전에 offer를 받을건지에 대한 peer B의 전처리 과정이 필요할듯
    // peer B가 peer A의 offer를 받겠다는 승낙 트리거가 동작한 이후 createOffer작업이 진행되는 걸로...

    webRTCHandler.createOffer();
  });

  // get Offer
  socket.on("offer", async (offer: any) => {
    console.log("received the offer", offer);
    webRTCHandler.createAnswer(offer);
  });

  // getAnswer
  // 방에 새로 접속한 유저를 제외한 모든 유저가 전달 받음
  socket.on("answer", (answer: any) => {
    console.log("received the answer", answer);
    webRTCHandler.setRemoteDescriptionAnswerAfterGetAbswer(answer);
  });

  // getIceCandidate
  socket.on("ice", (ice: any) => {
    console.log("received candidate", ice);
    webRTCHandler.setAddIceCandidate(ice);
  });

  // client가 방을 만들거나 나가면 admin쪽 알람현황 최신화 한다.
  socket.on("all users", (socketToRooms: any) => {
    let clientUsersRoomLength: number = 0;
    let clientSocketToRooms: any[] = [];
    console.log("received all users", socketToRooms);

    // admin은 현황 목록에서 제외시킨다.
    socketToRooms.forEach((element: any) => {
      if (element.userType === "Client") {
        clientUsersRoomLength = clientUsersRoomLength + 1;
        clientSocketToRooms = [...clientSocketToRooms, element];
      }
    });

    // const roomLength = socketToRooms.length;
    reduxStore.dispatch(
      counterSlice.actions.setNotiListCount(clientUsersRoomLength)
    );

    console.log(
      "clientSocketToRooms- clientSocketToRooms:",
      clientSocketToRooms
    );
    reduxStore.dispatch(
      socketSlice.actions.addOtherUsersInfo(clientSocketToRooms)
    );
  });

  socket.on("group-call-user-left", () => {
    console.log("호스트 연결도 끊김!");
    webRTCHandler.leaveUserGroupCallAlert();
  });
};
// ------------------------------------------------------------------

export const sendWebRTCAnswer = (answer: any) => {
  const socket = reduxStore.getState().socket.socket;
  const roomId = reduxStore.getState().socket.roomId;
  if (socket && roomId) {
    socket.emit("answer", answer, roomId);
  }
  console.log("sent the answer");
};

// join room - 방을 만들거나 방에 접속함
export const joinRoom = ({ roomId }: { roomId: string }) => {
  const socket = reduxStore.getState().socket.socket;

  reduxStore.dispatch(socketSlice.actions.setRoomId(roomId));
  const data = { roomID: roomId, counselType: "Video", userType: "Client" };
  if (socket) {
    socket.emit("join room", data);
  }
};

// IceCandidate를 모든 특정 방 안의 다른 모든 사람에게 전달하기 위한 작업
export function handleIce(event: RTCPeerConnectionIceEvent) {
  const socket = reduxStore.getState().socket.socket;
  const roomId = reduxStore.getState().socket.roomId;
  console.log("sent candidate", event.candidate);
  if (socket) {
    socket.emit("ice", event.candidate, roomId);
  }
}

// 다른 사람의 스트림을 리덕스 저장소에 업데이트
export function handleAddStream(data: any) {
  const otherStream = reduxStore.getState().streams.otherStream;
  console.log("got an stream from my peer");
  console.log(data.streams);
  // 현재 접속한 상태가 없는 경우에만 상대방 영상을 자동으로 타겟해서 메인뷰에 띄워주는 기능
  if (otherStream.length === 0) {
    reduxStore.dispatch(streamSlice.actions.setSelectedStream(data.streams[0]));
  }
  reduxStore.dispatch(streamSlice.actions.setOtherStream(data.streams[0]));
}

export const sendOffer = async (offer: any) => {
  const roomId = reduxStore.getState().socket.roomId;
  const socket = reduxStore.getState().socket.socket;

  // peerA는 offer를 생성한다.
  // PeerA는 Peer B로 offer정보를 백엔드로 전달하기위한 준비를 한다.

  // Peer B로 offer를 보내기위해 socketIo를 이용한다.
  if (socket && offer) {
    socket.emit("offer", offer, roomId);
  }
};

export const adminCheck = () => {
  const socket = reduxStore.getState().socket.socket;
  const adminCheck = true;
  if (socket) {
    socket.emit("admin check", adminCheck);
  }
};

export const sendUserHangedUp = (data: { roomId: string }) => {
  const socket = reduxStore.getState().socket.socket;
  socket.emit("user-hanged-up", data);
};

export const userLeftGroupCall = (data: any) => {
  console.log("userLeftGroupCall : ", data);
  const socket = reduxStore.getState().socket.socket;
  socket.emit("group-call-user-left", data);
};
