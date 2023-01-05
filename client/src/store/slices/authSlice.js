import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'authentication',
  initialState: '',
  reducers: {
    setToken: (_, action) => {
      return action.payload;
    }
  }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;