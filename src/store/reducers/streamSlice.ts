import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  myStream: MediaStream;
  localStream: MediaStream;
  otherStream: Array<MediaStream>;
  selectedStream: MediaStream;
  screenSharingStream: MediaStream;
};

type TypeAdd<T> = {
  [key in keyof T]: T[key] extends MediaStream
    ? T[key] | null | undefined
    : T[key];
};

// type TypeAdd<T> = {
//   [key in keyof T]: T[key] extends string ? T[key] | null | undefined : T[key];
// };

type streamSliceInitialState = TypeAdd<InitialStateType>;

const initialState: streamSliceInitialState = {
  myStream: null,
  localStream: null,
  otherStream: [],
  selectedStream: null,
  screenSharingStream: null
};

const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    getMyStreamSagaTrigger() {
      console.log("sagaTrigger activate!!");
    },
    setMyStream(state, action) {
      state.myStream = action.payload;
    },
    setLocalStream(state, action) {
      state.localStream = action.payload;
    },
    setScreenSharingStreamStream(state, action) {
      state.screenSharingStream = action.payload;
    },
    setOtherStream(state, action) {
      let preOtherStream = state.otherStream.filter((data, index) => {
        return data.id && data.id !== action.payload.id;
      });
      state.otherStream = [...preOtherStream, action.payload];
    },
    setSelectedStream(state, action) {
      state.selectedStream = action.payload;
    },
    resetOtherStream(state) {
      state.otherStream = [];
    }
  }
});

export default streamSlice;
