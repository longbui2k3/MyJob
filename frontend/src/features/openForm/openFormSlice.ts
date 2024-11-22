import { createSlice } from "@reduxjs/toolkit";

export const openFormSlice = createSlice({
  name: "openForm",
  initialState: {
    isOpenFormCategory: false,
    isOpenFormResume: false,
    id: "",
    type: "",
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
    setId(state, action) {
      state.id = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
  },
});
export const {
  openFormCategory,
  closeFormCategory,
  openFormResume,
  closeFormResume,
  setId,
  setType,
} = openFormSlice.actions;
export default openFormSlice.reducer;
