import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isMovieOn: boolean;
  isAlomodeon: boolean;
  isModeSelect: boolean;
  isScreenSharingActive: boolean;
  isShowMyroom: boolean;
};

const initialState: InitialState = {
  isMovieOn: false,
  isAlomodeon: true,
  isModeSelect: true,
  isScreenSharingActive: false,
  isShowMyroom: false
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
    },
    setShowMyRoom(state) {
      state.isShowMyroom = true;
    },
    setDisableMyRoom(state) {
      state.isShowMyroom = false;
    }
  },
  extraReducers: {}
});

export default toggleSlice;
