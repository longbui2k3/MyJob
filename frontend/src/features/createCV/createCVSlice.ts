import { createSlice } from "@reduxjs/toolkit";

interface SliceState {
  selectedElement: any;
  state: { [key: string]: string };
}

const initialState: SliceState = {
  selectedElement: null,
  state: {},
};

export const createCVSlice = createSlice({
  name: "createCV",
  initialState: initialState,
  reducers: {
    setSelectedElement(state, action) {
      state.selectedElement = action.payload;
    },
    setState(state, action) {
      if (action.payload.key) {
        const keys = action.payload.key.split(".");
        state.state[action.payload.key] = action.payload.value;
      } else state.state = action.payload;
    },
  },
});
export const { setSelectedElement, setState } = createCVSlice.actions;
export default createCVSlice.reducer;
