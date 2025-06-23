import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      // console.log("setAuthUser called with payload:", action.payload); // Debug log
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      // console.log("setSuggestedUsers called with payload:", action.payload); // Debug log
      state.suggestedUsers = action.payload;
    },
  },
});

export const { setAuthUser, setSuggestedUsers } = authSlice.actions;
export default authSlice.reducer;
