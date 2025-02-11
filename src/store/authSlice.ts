import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("action.payload:",action.payload)
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logoutSuccess: (state) => {
      state.username = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;