import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: { drafts: [] },
  reducers: {
    saveData(state, action) {
      state.drafts = action.payload;
    },
  },
});
export const requestActions = requestSlice.actions;
export default requestSlice;
