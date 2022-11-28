import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import colorReducer from './color/colorSlice';
import roleReducer from './role/roleSlice';
import productFormReducer from './product/productForm/productFormSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    color: colorReducer,
    productForm: productFormReducer,
    role: roleReducer,
  }
})
export default store