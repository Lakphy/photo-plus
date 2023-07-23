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
      rotation: 0,
    },
    {
      type: "rect" as LayerType,
      id: "rrr1",
      name: "testRect",
      width: 94.21709183182465,
      height: 111.80432713122535,
      backgroundColor: "red",
      x: 145.0003917869839,
      y: 131.00022169833403,
      rotation: 0,
    },
  ],
};

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    updateMetaData: (state, action) => {
      state.metadata = state.metadata.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    },
  },
});

export const { updateMetaData } = photoSlice.actions;

export default photoSlice.reducer;
