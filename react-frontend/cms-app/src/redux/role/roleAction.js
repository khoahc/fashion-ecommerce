import { createAsyncThunk } from "@reduxjs/toolkit";
import roleApi from "../../services/axios/roleApi";

const { getAllRole } = roleApi;

export const getRoles = createAsyncThunk(
  "color/getAll",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      console.log('get data roles');
      const { data } = await getAllRole(config);
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
