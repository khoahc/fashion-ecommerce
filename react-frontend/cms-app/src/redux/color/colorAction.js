import { createAsyncThunk } from "@reduxjs/toolkit";
import colorApi from "../../services/axios/colorApi";

const { getColors } = colorApi;

export const getAllColor = createAsyncThunk(
  "color/getAll",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      console.log('get data colors');
      const { data } = await getColors(config);
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
