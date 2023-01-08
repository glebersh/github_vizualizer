import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeRepos = createAsyncThunk(
  'repo/initializeRepos',
  async function (repoInfo, { dispatch, getState, rejectWithValue }) {
    try {
      const state = getState();
      console.log(`https://api.github.com/repos/${repoInfo.userLogin}/${repoInfo.repoName}/branches`);
      await fetch(`https://api.github.com/repos/${repoInfo.userLogin}/${repoInfo.repoName}/branches`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + state.authReducer.authToken,
        }
      })
        .then(response => response.json())
        .then((branches) => dispatch(setBranches(branches)))
        .then(() =>
          fetch(`https://api.github.com/repos/${repoInfo.userLogin}/${repoInfo.repoName}/commits`, {
            method: 'GET',
            headers: {
              "Authorization": "Bearer " + state.authReducer.authToken,
            }
          }))
        .then(response => response.json())
        .then(commits => dispatch(setCurrentBranch(commits)));
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  });

export const getBranchCommits = createAsyncThunk(
  'repo/getBranchCommits',
  async function ({ repoInfo, index }, { getState, rejectWithValue }) {
    try {
      const state = getState();
      console.log(state.repoReducer?.branches[index]?.name);
      let requestURL = `https://api.github.com/repos/${repoInfo.userLogin}/${repoInfo.repoName}/commits?sha=${state.repoReducer?.branches[index]?.name}`;
      console.log(requestURL);

      const response = await fetch(requestURL, {
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
    branches: [],
    currentBranch: [],
    loading: false,
    error: false,
  },
  reducers: {
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
    setCurrentBranch: (state, action) => {
      state.currentBranch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(initializeRepos.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeRepos.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getBranchCommits.fulfilled, (state, action) => {
        state.currentBranch = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getBranchCommits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBranchCommits.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});
export const { setBranches, setCurrentBranch } = repoSlice.actions;
export default repoSlice.reducer;