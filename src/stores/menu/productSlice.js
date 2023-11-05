import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  error: null,
  status: 'idle'
};

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {}
});
