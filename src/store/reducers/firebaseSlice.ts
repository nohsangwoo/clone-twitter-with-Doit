import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  limitIndex: number;
};

const initialState: InitialState = {
  limitIndex: 5
};

const firebaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    increaseLimitIndex(state, action) {
      state.limitIndex = state.limitIndex + action.payload;
    },
    resetLimitIndex(state) {
      state.limitIndex = 5;
    }
  }
});

export default firebaseSlice;
