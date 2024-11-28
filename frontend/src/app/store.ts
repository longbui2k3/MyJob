import { configureStore } from "@reduxjs/toolkit";
import { changeDataSlice, createCVSlice, openFormSlice } from "../features";
export default configureStore({
  reducer: {
    openForm: openFormSlice,
    changeData: changeDataSlice,
    createCV: createCVSlice,
  },
});
