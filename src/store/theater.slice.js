import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLogo: "",
  activeTheater: "",
};

const theaterSlice = createSlice({
  name: "theaterSlice",
  initialState,
  reducers: {
    setActiveLogo: (state, action) => {
      state.activeLogo = action.payload;
    },
    setActiveTheater: (state,action) => {
      state.activeTheater = action.payload;
    }
  },
});

export default theaterSlice.reducer;
export const { setActiveLogo, setActiveTheater } = theaterSlice.actions;
