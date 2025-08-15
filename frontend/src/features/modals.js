import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showBoardAdd: false,
  showBoardEdit: false,
  showBoardRemove: false,
  showTaskAdd: false,
  showTaskDetails: false,
  showTaskEdit: false,
  showTaskRemove: false,
  showError: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState: { value: initialState },
  reducers: {
    handleShowBoardAdd: (state, action) => {
      state.value.showBoardAdd = action.payload;
    },
    handleShowBoardEdit: (state, action) => {
      state.value.showBoardEdit = action.payload;
    },
    handleShowBoardRemove: (state, action) => {
      state.value.showBoardRemove = action.payload;
    },
    handleShowTaskAdd: (state, action) => {
      state.value.showTaskAdd = action.payload;
    },
    handleShowTaskDetails: (state, action) => {
      state.value.showTaskDetails = action.payload;
    },
    handleShowTaskEdit: (state, action) => {
      state.value.showTaskEdit = action.payload;
    },
    handleShowTaskRemove: (state, action) => {
      state.value.showTaskRemove = action.payload;
    },
    handleShowError: (state, action) => {
      state.value.showError = action.payload;
    },
  },
});

export const {
  handleShowBoardAdd,
  handleShowBoardEdit,
  handleShowBoardRemove,
  handleShowTaskAdd,
  handleShowTaskDetails,
  handleShowTaskEdit,
  handleShowTaskRemove,
  handleShowError,
} = modalsSlice.actions;

export default modalsSlice.reducer;
