import { createSlice } from "@reduxjs/toolkit";

export const changeDataSlice = createSlice({
  name: "changeData",
  initialState: {
    isDataChange: false,
  },
  reducers: {
    setDataChange(state) {
      state.isDataChange = !state.isDataChange;
    },
  },
});
export const { setDataChange } = changeDataSlice.actions;
export default changeDataSlice.reducer;
