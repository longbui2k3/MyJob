import { createSlice } from "@reduxjs/toolkit";

export const openFormSlice = createSlice({
  name: "openForm",
  initialState: {
    isOpenFormCategory: false,
    isOpenFormResume: false,
    isOpenFormApplyJob: false,
    id: "",
    type: "",
    isDataChange: false,
  },
  reducers: {
    openFormCategory(state) {
      state.isOpenFormCategory = true;
    },
    closeFormCategory(state) {
      state.isOpenFormCategory = false;
    },
    openFormResume(state) {
      state.isOpenFormResume = true;
    },
    closeFormResume(state) {
      state.isOpenFormResume = false;
    },
    openFormApplyJob(state) {
      state.isOpenFormApplyJob = true;
    },
    closeFormApplyJob(state) {
      state.isOpenFormApplyJob = false;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setDataChange(state) {
      state.isDataChange = !state.isDataChange;
    },
  },
});
export const {
  openFormCategory,
  closeFormCategory,
  openFormResume,
  closeFormResume,
  openFormApplyJob,
  closeFormApplyJob,
  setId,
  setType,
  setDataChange,
} = openFormSlice.actions;
export default openFormSlice.reducer;
