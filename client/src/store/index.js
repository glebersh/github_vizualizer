import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import themeReducer from '../store/slices/themeSlice';
import searchReducer from '../store/slices/searchSlice';


export default configureStore({
  reducer: {
    authReducer: authReducer,
    themeReducer: themeReducer,
    searchReducer: searchReducer,
  }
});

