import { configureStore } from "@reduxjs/toolkit";
import theaterSlice from "./theater.slice";

export const store = configureStore({
  reducer: {
    // combine child reducer here
    theaterSlice,
  },
});
