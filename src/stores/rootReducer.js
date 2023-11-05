import { combineReducers } from 'redux';
import cartReducer from './cart/cartSlice';

const rootReducer = combineReducers({ cart: cartReducer });

export default rootReducer;
