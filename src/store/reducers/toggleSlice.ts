import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isMovieOn: boolean;
  isAlomodeon: boolean;
  isModeSelect: boolean;
  isScreenSharingActive: boolean;
};

const initialState: InitialState = {
  isMovieOn: false,
  isAlomodeon: true,
  isModeSelect: true,
  isScreenSharingActive: false
};

const toggleSlice = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    setIsMovieon(state, action) {
      state.isMovieOn = action.payload;
    },
    setIsAlomodeon(state, action) {
      state.isAlomodeon = action.payload;
    },
    setIsModeSelect(state, action) {
      state.isModeSelect = action.payload;
    },
    setIsScreenSharingActive(state, action) {
      state.isScreenSharingActive = action.payload;
    }
  },
  extraReducers: {}
});

export default toggleSlice;
