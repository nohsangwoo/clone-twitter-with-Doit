import { createSlice } from '@reduxjs/toolkit';
import { videoModeType } from 'enum';

type InitialState = {
  selectModeToggle: string;
  videoLayoutSelectMode:
    | videoModeType.Normal
    | videoModeType.Chess
    | videoModeType.Full;
};

const initialState: InitialState = {
  selectModeToggle: 'cam',
  videoLayoutSelectMode: videoModeType.Normal,
};

const toggleselectSlice = createSlice({
  name: 'toggleselect',
  initialState,
  reducers: {
    setToggleSelect(state, action) {
      state.selectModeToggle = action.payload;
    },
    setVideoModeSelect(state, action) {
      state.videoLayoutSelectMode = action.payload;
    },
  },
  extraReducers: {},
});

export default toggleselectSlice;
