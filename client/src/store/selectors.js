export const themeSelector = (state => state.themeReducer);
export const userSelector = (state => state.userReducer.user);
export const userLoading = (state => state.userReducer.loading);
export const userError = (state => state.userReducer.error);