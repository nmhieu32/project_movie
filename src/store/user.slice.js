import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  activeTab: "profile",
  isEditModalOpen: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setIsEditModalOpen: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setActiveTab, setIsEditModalOpen, setProfile } =
  userSlice.actions;
