import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: { offsetX: 0, offsetY: 0, scale: 1 },
  sider: { left: 0, top: 0, right: 0, bottom: 0 },
  selectedId: [],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateBoard: (state, action) =>
      (state.board = { ...state.board, ...action.payload }),
  },
});

export const { updateBoard } = editorSlice.actions;

export default editorSlice.reducer;
