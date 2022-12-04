import { createSlice } from "@reduxjs/toolkit";
import { getProductInfo } from "./productAction";

const initialState = {
  loading: false,
  productInfo: null,
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductInfo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProductInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productInfo = payload;
      state.success = true;
    },
    [getProductInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default productSlice.reducer;
