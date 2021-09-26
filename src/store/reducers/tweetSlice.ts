import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  myTweet: any;
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
