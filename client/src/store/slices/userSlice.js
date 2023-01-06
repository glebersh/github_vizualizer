import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  'user/getUser',
  async function (userLogin, { getState, rejectWithValue }) {
    try {
      const state = getState();
      const response = await fetch(`https://api.github.com/users/${userLogin.userLogin}`, {
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

export const getUserRepos = createAsyncThunk(
  'user/getUserRepos',
  async function (userLogin, { getState, rejectWithValue }) {
    try {
      const state = getState();
      const response = await fetch(`https://api.github.com/users/${userLogin.userLogin}/repos`, {
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


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    userRepos: [],
    loading: false,
    error: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUserRepos.fulfilled, (state, action) => {
        state.userRepos = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getUserRepos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserRepos.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export default userSlice.reducer;