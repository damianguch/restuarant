import { combineReducers } from 'redux';
import cartReducer from './cart/cartSlice';
import productReducer from './menu/productSlice';
import addressReducer from './userInfo/addressSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  adresss: addressReducer
});

export default rootReducer;
