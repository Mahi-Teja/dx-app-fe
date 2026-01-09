import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUser: (state) => {
      state.isAuthenticated = true;
    },
    logoutUser: () => initialState,
  },
});

export const { signUser, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
