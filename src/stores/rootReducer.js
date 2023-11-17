import { combineReducers } from 'redux';
import cartReducer from './cart/cartSlice';
import productReducer from './menu/productSlice';
import addressReducer from './userInfo/addressSlice';
import userReducer from './userInfo/userSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  address: addressReducer,
  user: userReducer
});

export default rootReducer;
