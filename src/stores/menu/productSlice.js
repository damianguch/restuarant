import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  error: null,
  status: 'idle'
};

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.products = [...action.payload.data];
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = 'pending';
    });
  }
});

// Return all what is stored in our redux product state
export const { getProducts } = productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'https://food-ordering-b921316c67e7.herokuapp.com/api/products-by-categories'
    );
    const data = await response.json();
    return data;
  }
);

export const selectAllProducts = (state) => state.products;
