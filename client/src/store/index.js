import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import searchReducer from './slices/searchSlice';
import userReducer from './slices/userSlice';


export default configureStore({
  reducer: {
    authReducer: authReducer,
    themeReducer: themeReducer,
    searchReducer: searchReducer,
    userReducer: userReducer,
  }
});

