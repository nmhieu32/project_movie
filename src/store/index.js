import { configureStore } from "@reduxjs/toolkit";
import theaterSlice from "./theater.slice";
import authSlice from "./auth.slice";

export const store = configureStore({
  reducer: {
    // combine child reducer here
    theaterSlice,
    authSlice,
  },
});
