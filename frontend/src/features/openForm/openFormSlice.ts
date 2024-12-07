import { createSlice } from "@reduxjs/toolkit";

export const openFormSlice = createSlice({
  name: "openForm",
  initialState: {
    isOpenFormCategory: false,
    isOpenFormResume: false,
    isOpenFormApplyJob: false,
    isOpenApplicationDetail: false,
    isOpenFormSendEmail: false,
    isOpenCVViewer: false,
    id: "",
    type: "",
    data: undefined,
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
    openFormApplicationDetail(state) {
      state.isOpenApplicationDetail = true;
    },
    closeApplicationDetail(state) {
      state.isOpenApplicationDetail = false;
    },
    openFormSendEmail(state) {
      state.isOpenFormSendEmail = true;
    },
    closeFormSendEmail(state) {
      state.isOpenFormSendEmail = false;
      state.data = undefined;
    },
    openCVViewer(state) {
      state.isOpenCVViewer = true;
    },
    closeCVViewer(state) {
      state.isOpenCVViewer = false;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
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
  openFormApplicationDetail,
  closeApplicationDetail,
  openFormSendEmail,
  closeFormSendEmail,
  openCVViewer,
  closeCVViewer,
  setId,
  setType,
  setData,
} = openFormSlice.actions;
export default openFormSlice.reducer;
