import { configureStore } from "@reduxjs/toolkit";
import avayaReducer from "./slices/avaya";

export default configureStore({
  reducer: {
    avaya: avayaReducer,
  },
});
