import { createSlice } from "@reduxjs/toolkit";
import { actionChannel } from "redux-saga/effects";

export type roomHostInfoType = {
  socketId: string;
  roomId: string;
  counselType: string;
  userType: string;
};

type InitialState = {
  socket: any;
  otherUsersInfoList: roomHostInfoType[];
  roomHostInfo: roomHostInfoType | null;
  myPeerConnection: RTCPeerConnection | null | undefined;
  roomId: string | null;
};

const initialState: InitialState = {
  socket: null,
  otherUsersInfoList: [],
  roomHostInfo: null,
  myPeerConnection: null,
  roomId: null
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;
    },
    addOtherUsersInfo(state, action) {
      state.otherUsersInfoList = [...action.payload];
    },
    getRoomHostInfo(state, action) {
      state.roomHostInfo = action.payload;
    },
    initSetCurrentSocketinfo(state, action) {
      state.otherUsersInfoList = action.payload;
    },
    setMyPeerConnection(state, action) {
      state.myPeerConnection = action.payload;
    },
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
    resetData(state) {
      // state.otherUsersInfoList = [];
      // state.roomHostInfo = null;
      state.myPeerConnection = null;
      state.roomId = null;
    },
    removeTargetSocket(state, action) {
      state.otherUsersInfoList = state.otherUsersInfoList.filter(
        data => data.roomId !== action.payload
      );
    }
  },
  extraReducers: {}
});

export default socketSlice;
