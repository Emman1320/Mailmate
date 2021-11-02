import { configureStore } from "@reduxjs/toolkit";
import requestSlice from "./request";
import uiSlice from "./ui";
import userSlice from "./user";

const store = configureStore({
  reducer: {
    request: requestSlice.reducer,
    ui: uiSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
