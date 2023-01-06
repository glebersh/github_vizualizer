import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBranch = createAsyncThunk(
  'repo/getBranch',
  async function (repoName, { getState, rejectWithValue }) {
    const state = getState();
    const username = state.userReducer.user.login;
    try {
      const state = getState();
      const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/branches`, {
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

export const repoSlice = createSlice({
  name: 'repo',
  initialState: {
    branches: {},
    loading: false,
    error: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.branches = action.payload;
      })
      .addCase(getBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBranch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export default repoSlice.reducer;