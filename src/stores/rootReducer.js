import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';

const rootReducer = combineReducers({ cart: cartReducer });

export default rootReducer;
