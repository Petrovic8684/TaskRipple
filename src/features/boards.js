import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { swap, move } from 'react-grid-dnd';

import baseUrl from '../lib/api/apiUrl';

const initialState = {
  boards: {},
  isClash: false,
  status: 'idle',
  error: null,
};

export const FetchBoards = createAsyncThunk(
  'boards/FetchBoards',
  async (arg, thunkAPI) => {
    try {
      const cookies = arg.cookies;
      const response = await axios.get(`${baseUrl}/home`, {
        params: {
          userID: window.localStorage.getItem('userID'),
        },
        headers: { authorization: cookies },
      });

      if (response.data.message === 'Could not find user by that id!') {
        throw new Error('Could not find user by that id!');
      }

      return JSON.parse(response?.data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ value: 'rejected', error: message });
    }
  }
);

export const UpdateBoards = createAsyncThunk(
  'boards/UpdateBoards',
  async (arg, thunkAPI) => {
    try {
      const response = await axios.put(`${baseUrl}/home`, {
        userID: window.localStorage.getItem('userID'),
        boards: JSON.stringify(arg.boards),
      });

      if (response.data.message === 'User does not exist!') {
        throw new Error('User does not exist!');
      }

      if (response.data.message === 'Records up to date!') {
        console.log('Records up to date!');
        return;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ value: 'rejected', error: message });
    }
  }
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    AddBoardFunction: (state, action) => {
      Object.keys(state.boards).forEach((board) => {
        if (board === action.payload) {
          state.isClash = true;
          return;
        }
      });

      if (state.isClash === true) return;

      state.boards = { ...state.boards, [action.payload]: [] };
    },

    EditBoardFunction: (state, action) => {
      if (action.payload.boardName === action.payload.newName) return;

      const keys = Object.keys(state.boards);

      keys.forEach((board) => {
        if (board === action.payload.newName) {
          state.isClash = true;
          return;
        }
      });

      if (state.isClash === true) return;

      const newObj = keys.reduce((acc, val) => {
        if (val === action.payload.boardName) {
          acc[action.payload.newName] = state.boards[action.payload.boardName];
        } else {
          acc[val] = state.boards[val];
        }
        return acc;
      }, {});

      state.boards = newObj;
    },

    RemoveBoardFunction: (state, action) => {
      const copy = { ...state.boards };
      delete copy[action.payload];

      state.boards = copy;
    },

    AddTaskFunction: (state, action) => {
      const newTask = {
        id: uuidv4(),
        name: action.payload.taskName,
        description: action.payload.taskDescription,
        startdate: action.payload.taskStartDate,
        enddate: action.payload.taskEndDate,
      };

      Object.keys(state.boards).forEach((board) => {
        if (board === action.payload.boardName) {
          state.boards = {
            ...state.boards,
            [board]: [...state.boards[board], newTask],
          };
        }
      });
    },

    EditTaskFunction: (state, action) => {
      Object.keys(state.boards).forEach((board) => {
        if (board === action.payload.boardName) {
          state.boards = {
            ...state.boards,
            [board]: state.boards[board].map((task) => {
              if (task.id === action.payload.taskId) {
                const newTask = task;
                newTask.name = action.payload.taskName;
                newTask.description = action.payload.taskDescription;
                newTask.startdate = action.payload.taskStartDate;
                newTask.enddate = action.payload.taskEndDate;
                return newTask;
              }
              return task;
            }),
          };
        }
      });
    },

    RemoveTaskFunction: (state, action) => {
      Object.keys(state.boards).forEach((board) => {
        if (board === action.payload.boardName) {
          state.boards = {
            ...state.boards,
            [board]: state.boards[board].filter((task) => {
              return task.id !== action.payload.taskId;
            }),
          };
        }
      });
    },

    ResetIsClash: (state) => {
      state.isClash = false;
    },

    onChange: (state, action) => {
      if (action.payload.targetId) {
        const result = move(
          state.boards[action.payload.sourceId],
          state.boards[action.payload.targetId],
          action.payload.sourceIndex,
          action.payload.targetIndex
        );
        state.boards = {
          ...state.boards,
          [action.payload.sourceId]: result[0],
          [action.payload.targetId]: result[1],
        };
        return;
      }

      const result = swap(
        state.boards[action.payload.sourceId],
        action.payload.sourceIndex,
        action.payload.targetIndex
      );
      state.boards = {
        ...state.boards,
        [action.payload.sourceId]: result,
      };
    },

    SetStatus: (state, action) => {
      state.status = action.payload;
      if (action.payload === 'idle') {
        state.boards = {};
        state.isClash = false;
        state.error = null;
      }
    },
  },

  extraReducers(builder) {
    builder.addCase(FetchBoards.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(FetchBoards.fulfilled, (state, action) => {
      state.status = 'successful';
      state.boards = action.payload;
    });
    builder.addCase(FetchBoards.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error;
    });
    builder.addCase(UpdateBoards.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error;
    });
  },
});

export const {
  AddBoardFunction,
  EditBoardFunction,
  RemoveBoardFunction,
  AddTaskFunction,
  EditTaskFunction,
  RemoveTaskFunction,
  ResetIsClash,
  SetStatus,
  onChange,
} = boardsSlice.actions;

export default boardsSlice.reducer;
