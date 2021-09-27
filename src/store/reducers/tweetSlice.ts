import { createSlice } from "@reduxjs/toolkit";

type myTweetType = {
  docId: string;
  text: string;
  createdAt: string;
  creatorId: string;
  roomId: string;
  attachmentURL: string;
  uploadPath: string;
};
type InitialState = {
  myTweet: myTweetType | null;
  selectedOtherTweet: myTweetType | null;
  selectedRoomId: string;
};

const initialState: InitialState = {
  myTweet: null,
  selectedOtherTweet: null,
  selectedRoomId: ""
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    setMyTweet(state, action) {
      state.myTweet = action.payload;
    },
    setSelectedOtherTweet(state, action) {
      state.selectedOtherTweet = action.payload;
    },
    setSelectedRoomId(state, action) {
      state.selectedRoomId = action.payload;
    }
  }
});

export default tweetSlice;
