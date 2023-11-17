// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: '',
      email: '',
      _id: '',
      isAdmin: false,
      loginStatus: ''
    },
    isLoading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    resetUser: (state) => {
      state.user = {
        name: '',
        email: '',
        _id: '',
        isAdmin: false,
        loginStatus: ''
      };
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const { setUser, setLoading, setError, resetUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
