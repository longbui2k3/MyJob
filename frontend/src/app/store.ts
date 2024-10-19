import { configureStore } from "@reduxjs/toolkit";
import { openFormSlice } from "../features";
export default configureStore({
  reducer: {
    openForm: openFormSlice,
  },
});
