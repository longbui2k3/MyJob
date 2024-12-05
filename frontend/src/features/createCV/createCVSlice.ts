import { createSlice } from "@reduxjs/toolkit";
import { defaultFields, defaultState } from "../../helpers/constants";

interface SliceState {
  selectedElement: any;
  state: { [key: string]: any };
  keyChanged: string;
  fields: Array<{ id: number; type: string; title: string }>;
  deletedFields: Array<{ id: number; type: string; title: string }>;
  deleteType?: string;
}

const initialState: SliceState = {
  selectedElement: null,
  state: defaultState,
  keyChanged: "",
  fields: defaultFields,
  deletedFields: [],
  deleteType: undefined,
};

export const createCVSlice = createSlice({
  name: "createCV",
  initialState: initialState,
  reducers: {
    setSelectedElement(state, action) {
      state.selectedElement = action.payload;
    },
    setState(state, action) {
      if (!action.payload.key) {
        state.state = action.payload.value;
        return;
      }
      let current = state.state;
      const keys = action.payload.key.split(".");

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== "object") {
          current[key] = {};
        }
        current = current[key];
      }
      current[keys[keys.length - 1]] = action.payload.value;
    },
    setFields(state, action) {
      state.fields = action.payload;
    },
    setDeletedFields(state, action) {
      state.deletedFields = action.payload;
    },
    setDeleteType(state, action) {
      state.deleteType = action.payload;
    },
  },
});
export const {
  setSelectedElement,
  setState,
  setFields,
  setDeletedFields,
  setDeleteType,
} = createCVSlice.actions;
export default createCVSlice.reducer;
