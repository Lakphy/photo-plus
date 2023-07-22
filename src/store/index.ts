import { configureStore } from "@reduxjs/toolkit";
import { photoSlice } from "./photo";
import { editorSlice } from "./editor";

export default configureStore({
  reducer: {
    photo: photoSlice.reducer,
    editor: editorSlice.reducer,
  },
});
