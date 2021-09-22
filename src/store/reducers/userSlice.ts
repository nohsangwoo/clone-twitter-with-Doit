import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  userInfo: {
    uid: string;
    displayName: string;
  };
};

const initialState: InitialState = {
  userInfo: {
    uid: "",
    displayName: ""
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    }
  }
});

export default userSlice;
