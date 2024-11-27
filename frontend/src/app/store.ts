import { configureStore } from "@reduxjs/toolkit";
import { changeDataSlice, openFormSlice } from "../features";
export default configureStore({
  reducer: {
    openForm: openFormSlice,
    changeData: changeDataSlice,
  },
});
