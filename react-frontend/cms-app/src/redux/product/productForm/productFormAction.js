import { createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../../services/axios/productApi";
import { groupProductOptions } from "../../../utils/productUtils";

const { getProductDetails } = productApi;

export const getProductInfo = createAsyncThunk(
  "product/getDetails",
  async (args, { getState, rejectWithValue }) => {
    try {
      const resp = await getProductDetails(args.id);
      console.log(resp);
      if (resp.status === 'OK') {
        console.log("Group");
        const productDetailsData = resp.data;
        productDetailsData.options = groupProductOptions(resp.data.options);
        console.log(productDetailsData);
        return productDetailsData;
      }
      return rejectWithValue(resp.message);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);