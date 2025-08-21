import { configureStore } from "@reduxjs/toolkit";
import theaterSlice from "./theater.slice";
import authSlice from "./auth.slice";
import { bookingTiketReducer } from "./booking.slice";
import userSlice from "./user.slice";

export const store = configureStore({
  reducer: {
    // combine child reducer here
    theaterSlice,
    authSlice,
    bookingTiketReducer,
    userSlice,
  },
});
