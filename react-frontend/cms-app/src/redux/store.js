import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import colorReducer from './color/colorSlice';
import productFormReducer from './product/productForm/productFormSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    color: colorReducer,
    productForm: productFormReducer
  }
})
export default store