import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchResult = createAsyncThunk(
  'searchData/getSearchResult',
  async function (searchbarValue, { getState, rejectWithValue }) {
    try {
      const state = getState();
      const response = await fetch(`https://api.github.com/search/${state.searchReducer.category}?q=${searchbarValue}`, {
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

export const searchSlice = createSlice({
  name: 'searchData',
  initialState: {
    category: 'users',
    searchData: {},
    loading: false,
    error: false,
  },
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResult.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.searchData = action.payload;
      })
      .addCase(getSearchResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchResult.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export const { changeCategory } = searchSlice.actions;
export default searchSlice.reducer;