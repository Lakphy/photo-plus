import { LayerType, PhotoData } from "@/types/editor";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PhotoData = {
  id: "12345",
  name: "test",
  width: 300,
  height: 300,
  metadata: [
    {
      type: LayerType.Rect,
      id: "rrr",
      name: "testRect",
      width: 50,
      height: 50,
      backgroundColor: "red",
      x: 10,
      y: 0,
    },
    {
      type: LayerType.Rect,
      id: "rrr1",
      name: "testRect",
      width: 50,
      height: 50,
      backgroundColor: "red",
      x: 10,
      y: 60,
    },
  ],
};

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {},
  },
});

export const { incrementByAmount } = photoSlice.actions;

export default photoSlice.reducer;
