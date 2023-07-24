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
      zIndex: 0,
      scaleX: 1,
      scaleY: 1,
    },
    {
      type: LayerType.Image,
      id: "rrr1",
      name: "testRect",
      width: 94.21709183182465,
      height: 111.80432713122535,
      x: 145.0003917869839,
      y: 131.00022169833403,
      rotation: 0,
      src: "https://picsum.photos/200/300",
      zIndex: 1,
      scaleX: 1,
      scaleY: 1,
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
    sortMetaDataZIndex: (state) => {
      state.metadata.sort((a, b) => a.zIndex - b.zIndex);
      state.metadata = state.metadata.map((item, index) => {
        return { ...item, zIndex: index };
      });
    },
  },
});

export const { updateMetaData, sortMetaDataZIndex } = photoSlice.actions;

export default photoSlice.reducer;
