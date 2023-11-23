import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentTask: {},
  currentBoardName: null,
};

const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    SetCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    SetCurrentBoardName: (state, action) => {
      state.currentBoardName = action.payload;
    },
  },
});

export const { SetCurrentTask, SetCurrentBoardName } = currentSlice.actions;

export default currentSlice.reducer;
