import { createSlice } from "@reduxjs/toolkit";

export const openFormSlice = createSlice({
  name: "openForm",
  initialState: {
    isOpenForm: false,
  },
  reducers: {
    openForm(state) {
      state.isOpenForm = true;
    },
    closeForm(state) {
      state.isOpenForm = false;
    },
  },
});
export const { openForm, closeForm } = openFormSlice.actions;
export default openFormSlice.reducer;
