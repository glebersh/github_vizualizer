import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: 'colorTheme',
  initialState: localStorage.getItem('colorMode'),
  reducers: {
    changeTheme: (_, action) => {
      return action.payload;
    }
  }
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;