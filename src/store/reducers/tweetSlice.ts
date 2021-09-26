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
};

const initialState: InitialState = {
  myTweet: null
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    setMyTweet(state, action) {
      state.myTweet = action.payload;
    }
  }
});

export default tweetSlice;
