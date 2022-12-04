import { createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../services/axios/productApi";

const { getProductDetails } = productApi;

export const getProductInfo = createAsyncThunk(
  "product/getInfo",
  async (args, { getState, rejectWithValue }) => {
    try {
      const { data } = await getProductDetails(args.id);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
