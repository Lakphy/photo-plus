import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  board: {
    offsetX: number;
    offsetY: number;
    scale: number;
  };
  sider: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  selectedId: string[];
}

const initialState: EditorState = {
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
    updateSelectedId: (state, action) => {
      state.selectedId = [action.payload];
    },
    updateMultipleSelectedId: (state, action) => {
      state.selectedId = [...state.selectedId, action.payload];
    },
    clearSelectedId: (state) => {
      state.selectedId = [];
    },
  },
});

export const { updateBoard, updateSelectedId, clearSelectedId } =
  editorSlice.actions;

export default editorSlice.reducer;
