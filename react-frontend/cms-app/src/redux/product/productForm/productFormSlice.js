import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  form: {
    id: null,
    name: '', 
    description: '',
    enabled: false,
    cost: 0,
    price: 0,
    categoryId: null,
    options: [
      {
        id: null,
        size: '',
        productColor: {
          id: null,
          colorId: null,
          mainImageId: null,
          imageIds: []
        }
      }
    ],
    voucherIds: []
  },
  error: null,
  success: false,
};

const productFormSlice = createSlice({
    name: 'productForm',
    initialState,
    reducers: {},
    extraReducers: {}
});

export default productFormSlice.reducer;
