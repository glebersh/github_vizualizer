import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: 'colorTheme',
  initialState: 'light',
  reducers: {
    changeTheme: (_, action) => {
      return action.payload;
    }
  }
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;