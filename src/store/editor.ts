import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  board: {
    offsetX: number;
    offsetY: number;
    scale: number;
    minScale: number;
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
  board: { offsetX: 0, offsetY: 0, scale: 1, minScale: 0.1 },
  sider: { left: 230, top: 70, right: 230, bottom: 100 },
  selectedId: [],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateBoard: (state, action) => {
      state.board = { ...state.board, ...action.payload };
    },
    zoomBoard: (state, action) => {
      const newScale = Math.max(
        state.board.scale + action.payload.delta,
        state.board.minScale
      );
      state.board.offsetX =
        action.payload.x -
        ((action.payload.x - state.board.offsetX) * newScale) /
          state.board.scale;
      state.board.offsetY =
        action.payload.y -
        ((action.payload.y - state.board.offsetY) * newScale) /
          state.board.scale;
      state.board.scale = newScale;
    },
    updateMinScale: (state, action) => {
      state.board.minScale = action.payload;
    },
    updateSelectedId: (state, action) => {
      state.selectedId = [action.payload];
    },
    updateMultipleSelectedId: (state, action) => {
      state.selectedId = [...state.selectedId, action.payload];
    },
    clearSelectedId: (state) => {
      state.selectedId = [];
    },
    updateBoardConfig: (state, action) => {
      state.board = { ...state.board, ...action.payload };
    },
  },
});

export const {
  updateBoard,
  updateMinScale,
  updateSelectedId,
  clearSelectedId,
  zoomBoard,
} = editorSlice.actions;

export default editorSlice.reducer;
