import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
  'authentification/getCurrentUser',
  async function (_, { getState, rejectWithValue }) {
    try {
      const state = getState();
      const response = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + state.authReducer.authToken,
        }
      })
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });


export const authSlice = createSlice({
  name: 'authentification',
  initialState: {
    user: {},
    authToken: ''
  },
  reducers: {
    setToken: (state, action) => {
      state.authToken = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;