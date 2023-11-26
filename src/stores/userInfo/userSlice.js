import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: '',
      email: '',
      _id: '',
      isAdmin: false
    },
    error: null,
    isAuthenticated: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        name: '',
        email: '',
        _id: '',
        isAdmin: false
      };
      state.error = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, setError, resetUser } = userSlice.actions;

export const getUser = (state) => state.user.user;
export const getError = (state) => state.user.error;

export default userSlice.reducer;
